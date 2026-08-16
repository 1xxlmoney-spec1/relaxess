/**
 * Relaxess – Centralized In-App Purchase Configuration
 *
 * IMPORTANT: These product identifiers MUST be created in App Store Connect
 * under your app's "Subscriptions" section before live purchases will work.
 *
 * Steps in App Store Connect:
 *  1. Go to App Store Connect → Your App → Subscriptions
 *  2. Create a Subscription Group (e.g., "Relaxess Premium")
 *  3. Create two Auto-Renewable Subscriptions with these exact Product IDs:
 *       - relaxess.premium.monthly.v2   (duration: 1 month, price: $2.99)
 *       - relaxess.premium.annual.v2    (duration: 1 year,  price: $24.99)
 *  4. Submit for review alongside the app
 *
 * RevenueCat Setup:
 *  1. Create a free account at https://app.revenuecat.com
 *  2. Create a new project and connect your iOS app
 *  3. Add the product identifiers above to your RevenueCat Entitlements
 *  4. Create an Entitlement named "premium" and attach both products to it
 *  5. Replace REVENUECAT_API_KEY_IOS below with your RevenueCat iOS API key
 *     (found in RevenueCat Dashboard → Project Settings → API Keys → Public app-specific keys)
 */

// ─── Product Identifiers ─────────────────────────────────────────────────────
// These must exactly match the Product IDs created in App Store Connect.

export const IAP_PRODUCT_IDS = {
  MONTHLY: "relaxess.premium.monthly.v2",
  ANNUAL: "relaxess.premium.annual.v2",
} as const;

export type IAPProductId = (typeof IAP_PRODUCT_IDS)[keyof typeof IAP_PRODUCT_IDS];

// ─── RevenueCat Entitlement ───────────────────────────────────────────────────
// The entitlement identifier configured in RevenueCat Dashboard.
// Must match exactly what you create in RevenueCat → Entitlements.

export const REVENUECAT_ENTITLEMENT_ID = "Relaxess Premium";

// ─── RevenueCat API Key ───────────────────────────────────────────────────────
// Replace this placeholder with your actual RevenueCat iOS Public API Key.
// NEVER use a secret key here. Use only the Public app-specific key.
// Format: appl_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
//
// TODO: Replace with your actual RevenueCat iOS Public API Key from
//       https://app.revenuecat.com → Project Settings → API Keys

export const REVENUECAT_API_KEY_IOS = "appl_vFVnfeKAKfBPEIRsluJBiROGXHr";

// ─── Premium State Types ──────────────────────────────────────────────────────

export type PremiumStatus =
  | "loading"         // Initial state while checking entitlements
  | "free"            // No active subscription
  | "monthly"         // Active monthly subscription
  | "annual"          // Active annual subscription
  | "expired"         // Previously had subscription, now expired
  | "pending"         // Purchase initiated, awaiting Apple confirmation
  | "error";          // Verification error or unknown state

export interface PremiumEntitlement {
  status: PremiumStatus;
  expiresAt: string | null;       // ISO date string of subscription expiry
  productId: IAPProductId | null; // Which product is active
  isActive: boolean;              // Convenience: true if monthly or annual
}

export const DEFAULT_ENTITLEMENT: PremiumEntitlement = {
  status: "free",
  expiresAt: null,
  productId: null,
  isActive: false,
};


