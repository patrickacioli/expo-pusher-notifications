import { requireNativeModule } from "expo-modules-core";
import { RNExpoPusherModule } from "./types";
import Constants, { ExecutionEnvironment } from "expo-constants";

const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let exportedModule: RNExpoPusherModule | null = null;
let warningHasBeenShown = false;

let defaultImplementation = {
  addListener: () => {
    if (!warningHasBeenShown) {
      console.info(
        `[react-native-expo-pusher-notifications] Adding listeners will not working on Expo GO environment. `
      );
      warningHasBeenShown = true;
    }
  },
  removeListeners: async () => {},
  addDeviceInterest: async () => {},
  start: async () => {
    if (!warningHasBeenShown) {
      console.info(
        `[react-native-expo-pusher-notifications] Starting the module will not working on Expo GO environment. `
      );
      warningHasBeenShown = true;
    }
  },
  setInstanceId: (apiKey) => {
    if (!warningHasBeenShown) {
      console.info(
        `[react-native-expo-pusher-notifications] Setting the instance ID will not working on Expo GO environment. `
      );
      warningHasBeenShown = true;
    }
  },
  getDeviceInterests: async () => [],
  removeDeviceInterest: async () => {},
  setDeviceInterests: async () => {},
  clearDeviceInterests: async () => {},
  setUserId(userId, token) {},
  clearAllState: () => {},
} as RNExpoPusherModule;

if (isExpoGo) {
  // Expo Go doesn't support native modules, so we need to use the bridge module
  // from expo-notifications.
  // @ts-ignore
  exportedModule = defaultImplementation;
} else {
  // It loads the native module object from the JSI or falls back to
  // the bridge module (from NativeModulesProxy) if the remote debugger is on.
  exportedModule = requireNativeModule<RNExpoPusherModule>(
    "ExpoPusherNotifications"
  );
}

if (!exportedModule) {
  throw new Error("RNExpoPusherModule is undefined");
}

export default exportedModule as RNExpoPusherModule;
