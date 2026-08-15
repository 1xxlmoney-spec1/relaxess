/**
 * Relaxess – Apple In-App Purchase Service
 *
 * Wraps react-native-purchases (RevenueCat) to provide:
 *  - Product loading with localized App Store prices
 *  - Monthly subscription purchase
 *  - Annual subscription purchase
 *  - Restore Purchases
 *  - Entitlement verification
 *  - Purchase state management
 *
 * Security model:
 *  - Premium is ONLY enabled after a verified RevenueCat entitlement
 *  - AsyncStorage is used ONLY as a UI cache, never as proof of payment
 *  - No local boolean is trusted as source of truth
 *  - RevenueCat performs receipt validation against Apple servers
 *
 * NOTE: This service requires a development build (not Expo Go) because
 *       react-native-purchases contains native StoreKit code.
 */

import { Platform } from "react-native";
import Purchases, {
  type CustomerInfo,
  type PurchasesPackage,
  type PurchasesOffering,
  LOG_LEVEL,
} from "react-native-purchases";

import {
  IAP_PRODUCT_IDS,
  REVENUECAT_API_KEY_IOS,
  REVENUECAT_ENTITLEMENT_ID,
  type PremiumEntitlement,
  type PremiumStatus,
  DEFAULT_ENTITLEMENT,
} from "./iap-config";

// ─── Internal State ───────────────────────────────────────────────────────────

let _initialized = false;
let _configured = false;
let _currentOffering: PurchasesOffering | null = null;

// ─── Initialization ───────────────────────────────────────────────────────────

/**
 * Initialize RevenueCat SDK.
 * Must be called once at app startup (in _layout.tsx or AppProvider).
 * Safe to call multiple times — subsequent calls are no-ops.
 */
export async function initializeIAP(): Promise<void> {
  if (_initialized) return;

  // IAP is iOS-only for now; skip on Android/web
  if (Platform.OS !== "ios") {
    _initialized = true;
    return;
  }

  // Validate API key is configured
  if (
    !REVENUECAT_API_KEY_IOS ||
    !REVENUECAT_API_KEY_IOS.startsWith("appl_")
  )   {
    console.warn(
      "[IAP] RevenueCat API key not configured. " +
      "Set REVENUECAT_API_KEY_IOS in lib/iap-config.ts. " +
      "Purchases will not work until configured."
    );
    _initialized = true;
    return;
  }

  try {
    Purchases.setLogLevel(LOG_LEVEL.ERROR); // Suppress verbose logs in production
    await Purchases.configure({ apiKey: REVENUECAT_API_KEY_IOS });
    _configured = true;
    _initialized = true;
  } catch (error) {
    console.error("[IAP] Failed to initialize RevenueCat:", error);
    // Do not throw — app should continue without IAP if initialization fails
    _initialized = true;
  }
}

// ─── Product Loading ──────────────────────────────────────────────────────────

export interface IAPProducts {
  monthly: PurchasesPackage | null;
  annual: PurchasesPackage | null;
  monthlyLocalizedPrice: string;
  annualLocalizedPrice: string;
}

/**
 * Load available subscription products from the App Store via RevenueCat.
 * Returns localized prices from Apple when available.
 * Falls back to hardcoded prices from i18n if products cannot be loaded.
 */
export async function loadProducts(): Promise<IAPProducts> {
  const fallback: IAPProducts = {
    monthly: null,
    annual: null,
    monthlyLocalizedPrice: "$2.99/month",
    annualLocalizedPrice: "$24.99/year",
  };

  if (Platform.OS !== "ios") return fallback;
  if (!_initialized) await initializeIAP();
  if (!_configured) return fallback;

  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;

    if (!current) {
      console.warn("[IAP] No current offering found in RevenueCat. Check your RevenueCat dashboard.");
      return fallback;
    }

    _currentOffering = current;

    // Find monthly and annual packages by matching product identifiers
    let monthly: PurchasesPackage | null = null;
    let annual: PurchasesPackage | null = null;

    for (const pkg of current.availablePackages) {
      const productId = pkg.product.identifier;
      if (productId === IAP_PRODUCT_IDS.MONTHLY) {
        monthly = pkg;
      } else if (productId === IAP_PRODUCT_IDS.ANNUAL) {
        annual = pkg;
      }
    }

    return {
      monthly,
      annual,
      monthlyLocalizedPrice: monthly
        ? monthly.product.priceString
        : fallback.monthlyLocalizedPrice,
      annualLocalizedPrice: annual
        ? annual.product.priceString
        : fallback.annualLocalizedPrice,
    };
  } catch (error) {
    console.error("[IAP] Failed to load products:", error);
    return fallback;
  }
}

// ─── Entitlement Check ────────────────────────────────────────────────────────

/**
 * Derive PremiumEntitlement from RevenueCat CustomerInfo.
 * This is the ONLY source of truth for premium status.
 */
function entitlementFromCustomerInfo(customerInfo: CustomerInfo): PremiumEntitlement {
  const entitlement = customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID];

  if (!entitlement) {
    return DEFAULT_ENTITLEMENT;
  }

  const productId = entitlement.productIdentifier as typeof IAP_PRODUCT_IDS[keyof typeof IAP_PRODUCT_IDS] | null;
  let status: PremiumStatus = "free";

  if (productId === IAP_PRODUCT_IDS.MONTHLY) {
    status = "monthly";
  } else if (productId === IAP_PRODUCT_IDS.ANNUAL) {
    status = "annual";
  }

  return {
    status,
    expiresAt: entitlement.expirationDate ?? null,
    productId: productId ?? null,
    isActive: true,
  };
}

/**
 * Check current premium entitlement from RevenueCat.
 * Returns DEFAULT_ENTITLEMENT (free) if not initialized or on non-iOS platforms.
 */
export async function checkEntitlement(): Promise<PremiumEntitlement> {
  if (Platform.OS !== "ios") return DEFAULT_ENTITLEMENT;
  if (!_initialized) await initializeIAP();
  if (!_configured) return DEFAULT_ENTITLEMENT;

  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return entitlementFromCustomerInfo(customerInfo);
  } catch (error) {
    console.error("[IAP] Failed to check entitlement:", error);
    return { ...DEFAULT_ENTITLEMENT, status: "error" };
  }
}

// ─── Purchase ─────────────────────────────────────────────────────────────────

export type PurchaseResult =
  | { success: true; entitlement: PremiumEntitlement }
  | { success: false; cancelled: boolean; pending: boolean; error: string };

/**
 * Purchase a subscription package.
 * Returns a typed result — never throws.
 */
export async function purchasePackage(pkg: PurchasesPackage): Promise<PurchaseResult> {
  if (Platform.OS !== "ios") {
    return { success: false, cancelled: false, pending: false, error: "IAP is only available on iOS." };
  }

  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const entitlement = entitlementFromCustomerInfo(customerInfo);

    if (!entitlement.isActive) {
      // Purchase completed but entitlement not active — should not happen
      return {
        success: false,
        cancelled: false,
        pending: false,
        error: "Purchase completed but entitlement is not active. Please restore purchases.",
      };
    }

    return { success: true, entitlement };
  } catch (error: unknown) {
    // RevenueCat error codes
    const rcError = error as { userCancelled?: boolean; code?: number; message?: string };

    if (rcError.userCancelled === true) {
      return { success: false, cancelled: true, pending: false, error: "Purchase cancelled." };
    }

    // Error code 23 = payment pending (e.g., Ask to Buy)
    if (rcError.code === 23) {
      return {
        success: false,
        cancelled: false,
        pending: true,
        error: "Purchase is pending approval. You will be notified when it is complete.",
      };
    }

    const message = rcError.message ?? "An error occurred during purchase. Please try again.";
    console.error("[IAP] Purchase failed:", error);
    return { success: false, cancelled: false, pending: false, error: message };
  }
}

// ─── Restore Purchases ────────────────────────────────────────────────────────

export type RestoreResult =
  | { success: true; entitlement: PremiumEntitlement; restored: boolean }
  | { success: false; error: string };

/**
 * Restore previous purchases.
 * Required by Apple App Store guidelines — must be accessible to users.
 * Returns whether an active entitlement was found after restoration.
 */
export async function restorePurchases(): Promise<RestoreResult> {
  if (Platform.OS !== "ios") {
    return { success: false, error: "Restore Purchases is only available on iOS." };
  }

  if (!_initialized) await initializeIAP();

  try {
    const customerInfo = await Purchases.restorePurchases();
    const entitlement = entitlementFromCustomerInfo(customerInfo);

    return {
      success: true,
      entitlement,
      restored: entitlement.isActive,
    };
  } catch (error: unknown) {
    const rcError = error as { message?: string };
    const message = rcError.message ?? "Failed to restore purchases. Please try again.";
    console.error("[IAP] Restore failed:", error);
    return { success: false, error: message };
  }
}

// ─── Customer Info Listener ───────────────────────────────────────────────────

/**
 * Subscribe to RevenueCat customer info updates.
 * Called when subscription status changes (e.g., renewal, expiry).
 * Returns an unsubscribe function — call it on component unmount.
 */
export function subscribeToEntitlementUpdates(
  onUpdate: (entitlement: PremiumEntitlement) => void
): () => void {
  if (Platform.OS !== "ios") {
    return () => {};
  }
  if (!_configured) {
  return () => {};
}

  Purchases.addCustomerInfoUpdateListener((customerInfo) => {
    const entitlement = entitlementFromCustomerInfo(customerInfo);
    onUpdate(entitlement);
  });

  // react-native-purchases v8 does not return a removable listener handle;
  // the listener is automatically cleaned up when the app unmounts.
  return () => {};
  // TODO: When upgrading to react-native-purchases v9+, use the returned
  // subscription object to call .remove() here for proper cleanup.
}
