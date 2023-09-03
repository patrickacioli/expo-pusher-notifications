import { EventEmitter, Subscription } from "expo-modules-core";
import ExpoPusherNotificationsModule from "./ExpoPusherNotificationsModule";

const emitter = new EventEmitter(ExpoPusherNotificationsModule);

async function _wrapper(
  method: any,
  successCallback: (...args: any[]) => void = () => {},
  errorCallback: (error: any) => void = () => {}
) {
  try {
    const result = await method();
    successCallback(result);
    return result;
  } catch (error) {
    errorCallback(error);
  }
}

export type ThemeChangeEvent = {
  interest: string;
};

export function setOnDeviceInterestsChangedListener(
  listener: (event: ThemeChangeEvent) => void
): Subscription {
  return emitter.addListener<ThemeChangeEvent>("onInterestsChanged", listener);
}

export async function start(
  apiKey: string,
  successCallback: () => void = () => {},
  errorCallback: (error: any) => void = () => {}
): Promise<void> {
  return _wrapper(
    () => ExpoPusherNotificationsModule.start(apiKey),
    successCallback,
    errorCallback
  );
}

export async function addDeviceInterest(
  interest: string,
  successCallback: (interest: string) => void = () => {},
  errorCallback: (error: any) => void = () => {}
): Promise<void> {
  return _wrapper(
    () => ExpoPusherNotificationsModule.addDeviceInterest(interest),
    successCallback,
    errorCallback
  );
}

export async function getDeviceInterests(): Promise<string[]> {
  return _wrapper(() => ExpoPusherNotificationsModule.getDeviceInterests());
}

export async function removeDeviceInterest(interest: string): Promise<void> {
  return _wrapper(() =>
    ExpoPusherNotificationsModule.removeDeviceInterest(interest)
  );
}

export async function setDeviceInterests(interests: string[]): Promise<void> {
  return _wrapper(() =>
    ExpoPusherNotificationsModule.setDeviceInterests(interests)
  );
}

export async function clearDeviceInterests(): Promise<void> {
  return _wrapper(() => ExpoPusherNotificationsModule.clearDeviceInterests());
}
