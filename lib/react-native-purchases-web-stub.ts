/**
 * Web stub for react-native-purchases (RevenueCat).
 * react-native-purchases contains native StoreKit code that cannot run on web.
 * This stub provides no-op exports so the web bundle does not crash.
 * All actual IAP logic is guarded by Platform.OS === 'ios' in iap-service.ts.
 */

export const LOG_LEVEL = {
  VERBOSE: "VERBOSE",
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  SILENT: "SILENT",
};

const Purchases = {
  setLogLevel: () => {},
  configure: () => {},
  getOfferings: async () => ({ current: null, all: {} }),
  purchasePackage: async () => ({ customerInfo: null }),
  restorePurchases: async () => null,
  getCustomerInfo: async () => null,
  isConfigured: false,
};

export default Purchases;
export type CustomerInfo = Record<string, unknown>;
export type PurchasesPackage = Record<string, unknown>;
export type PurchasesOffering = Record<string, unknown>;
