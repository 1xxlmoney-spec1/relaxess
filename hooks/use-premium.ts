/**
 * Relaxess – usePremium Hook
 *
 * Provides the complete premium subscription flow to UI components:
 *  - Product loading with localized App Store prices
 *  - Monthly and annual purchase
 *  - Restore Purchases
 *  - Real-time entitlement status
 *
 * Usage:
 *   const { products, entitlement, purchaseMonthly, purchaseAnnual, restore, isLoading } = usePremium();
 */

import { useState, useEffect, useCallback } from "react";
import { Alert, Platform } from "react-native";

import {
  initializeIAP,
  loadProducts,
  purchasePackage,
  restorePurchases,
  checkEntitlement,
  subscribeToEntitlementUpdates,
  type IAPProducts,
  type PurchaseResult,
  type RestoreResult,
} from "@/lib/iap-service";
import { DEFAULT_ENTITLEMENT, type PremiumEntitlement } from "@/lib/iap-config";
import { useAppContext } from "@/lib/app-context";

// ─── Hook State ───────────────────────────────────────────────────────────────

export interface UsePremiumState {
  /** Localized product info from App Store */
  products: IAPProducts | null;
  /** Current verified entitlement status */
  entitlement: PremiumEntitlement;
  /** True while loading products or processing a purchase */
  isLoading: boolean;
  /** True specifically while a purchase or restore is in progress */
  isPurchasing: boolean;
  /** Purchase monthly subscription */
  purchaseMonthly: () => Promise<void>;
  /** Purchase annual subscription */
  purchaseAnnual: () => Promise<void>;
  /** Restore previous purchases (required by App Store guidelines) */
  restore: () => Promise<void>;
  /** Reload products from App Store */
  reloadProducts: () => Promise<void>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePremium(): UsePremiumState {
  const { setPremium } = useAppContext();

  const [products, setProducts] = useState<IAPProducts | null>(null);
  const [entitlement, setEntitlement] = useState<PremiumEntitlement>(DEFAULT_ENTITLEMENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // ── Sync entitlement to app-context premium state ──────────────────────────
  // app-context.setPremium is the bridge to the rest of the app (gating features).
  // We call it whenever the verified entitlement changes.

  const syncEntitlementToContext = useCallback(
    async (newEntitlement: PremiumEntitlement) => {
      setEntitlement(newEntitlement);
      if (newEntitlement.isActive) {
        await setPremium(true, newEntitlement.expiresAt ?? undefined);
      } else {
        await setPremium(false);
      }
    },
    [setPremium]
  );

  // ── Initialize IAP and load products ──────────────────────────────────────

  const initialize = useCallback(async () => {
    setIsLoading(true);
    try {
      await initializeIAP();

      // Check current entitlement first (fast path for existing subscribers)
      const currentEntitlement = await checkEntitlement();
      await syncEntitlementToContext(currentEntitlement);

      // Load products for display in UI
      const loadedProducts = await loadProducts();
      setProducts(loadedProducts);
    } catch (error) {
      console.error("[usePremium] Initialization error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [syncEntitlementToContext]);

  useEffect(() => {
    initialize();

    // Subscribe to entitlement updates (handles renewals, expirations)
    const unsubscribe = subscribeToEntitlementUpdates(syncEntitlementToContext);
    return unsubscribe;
  }, [initialize, syncEntitlementToContext]);

  // ── Reload products ────────────────────────────────────────────────────────

  const reloadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedProducts = await loadProducts();
      setProducts(loadedProducts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Purchase helpers ───────────────────────────────────────────────────────

  const handlePurchaseResult = useCallback(
    async (result: PurchaseResult) => {
      if (result.success) {
        await syncEntitlementToContext(result.entitlement);
        Alert.alert(
          "Welcome to Premium! 👑",
          "You now have full access to all Relaxess features. Enjoy your journey to calm.",
          [{ text: "Thank you", style: "default" }]
        );
      } else if (!result.cancelled) {
        if (result.pending) {
          Alert.alert(
            "Purchase Pending",
            result.error,
            [{ text: "OK", style: "default" }]
          );
        } else {
          Alert.alert(
            "Purchase Failed",
            result.error,
            [{ text: "OK", style: "cancel" }]
          );
        }
      }
      // If cancelled, do nothing — user intentionally dismissed
    },
    [syncEntitlementToContext]
  );

  const purchaseMonthly = useCallback(async () => {
    if (!products?.monthly) {
      Alert.alert(
        "Products Unavailable",
        "Unable to load subscription options. Please check your internet connection and try again.",
        [{ text: "OK", style: "cancel" }]
      );
      return;
    }

    if (Platform.OS !== "ios") {
      Alert.alert("iOS Only", "Subscriptions are currently available on iOS only.");
      return;
    }

    setIsPurchasing(true);
    try {
      const result = await purchasePackage(products.monthly);
      await handlePurchaseResult(result);
    } finally {
      setIsPurchasing(false);
    }
  }, [products, handlePurchaseResult]);

  const purchaseAnnual = useCallback(async () => {
    if (!products?.annual) {
      Alert.alert(
        "Products Unavailable",
        "Unable to load subscription options. Please check your internet connection and try again.",
        [{ text: "OK", style: "cancel" }]
      );
      return;
    }

    if (Platform.OS !== "ios") {
      Alert.alert("iOS Only", "Subscriptions are currently available on iOS only.");
      return;
    }

    setIsPurchasing(true);
    try {
      const result = await purchasePackage(products.annual);
      await handlePurchaseResult(result);
    } finally {
      setIsPurchasing(false);
    }
  }, [products, handlePurchaseResult]);

  // ── Restore Purchases ──────────────────────────────────────────────────────

  const restore = useCallback(async () => {
    if (Platform.OS !== "ios") {
      Alert.alert("iOS Only", "Restore Purchases is only available on iOS.");
      return;
    }

    setIsPurchasing(true);
    try {
      const result: RestoreResult = await restorePurchases();

      if (!result.success) {
        Alert.alert(
          "Restore Failed",
          result.error,
          [{ text: "OK", style: "cancel" }]
        );
        return;
      }

      await syncEntitlementToContext(result.entitlement);

      if (result.restored) {
        Alert.alert(
          "Purchases Restored! 👑",
          "Your premium subscription has been restored successfully.",
          [{ text: "Great!", style: "default" }]
        );
      } else {
        Alert.alert(
          "No Purchases Found",
          "No previous purchases were found for this Apple ID.",
          [{ text: "OK", style: "default" }]
        );
      }
    } finally {
      setIsPurchasing(false);
    }
  }, [syncEntitlementToContext]);

  return {
    products,
    entitlement,
    isLoading,
    isPurchasing,
    purchaseMonthly,
    purchaseAnnual,
    restore,
    reloadProducts,
  };
}
