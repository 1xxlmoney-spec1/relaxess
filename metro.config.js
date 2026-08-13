const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);


// Redirect react-native-purchases to a no-op web stub on web.
// The native library contains StoreKit code that crashes the web bundle.
// All IAP logic in iap-service.ts is already guarded by Platform.OS === 'ios'.
const defaultResolveRequest = config.resolver?.resolveRequest;
config.resolver = config.resolver || {};
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "react-native-purchases") {
    return {
      filePath: path.resolve(__dirname, "lib/react-native-purchases-web-stub.ts"),
      type: "sourceFile",
    };
  }
  // Chain to the previous resolver or default Metro behavior
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, {
  input: "./global.css",
  // Force write CSS to file system instead of virtual modules
  // This fixes iOS styling issues in development mode
  forceWriteFileSystem: true,
});
