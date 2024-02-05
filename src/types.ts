import { EventEmitter, Subscription } from "expo-modules-core";
import { ProxyNativeModule } from "expo-modules-core";

export type InterestsChangedEvent = {
  interests: string[];
};

export type NotificationEvent = {
  notification: Record<string, any>;
};
export interface RNExpoPusherModule extends ProxyNativeModule {
  addDeviceInterest(interest: string): Promise<void>;
  start(): Promise<void>;
  setInstanceId(apiKey: string): void;
  getDeviceInterests(): Promise<string[]>;
  removeDeviceInterest(interest: string): Promise<void>;
  setDeviceInterests(interests: string[]): Promise<void>;
  clearDeviceInterests(): Promise<void>;
}
