import { EventEmitter, Subscription } from "expo-modules-core";
import { InterestsChangedEvent, NotificationEvent } from "./types";
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

export function setOnDeviceInterestsChangedListener(
  listener: (event: InterestsChangedEvent) => void
): Subscription {
  return emitter.addListener<InterestsChangedEvent>(
    "onInterestsChanged",
    listener
  );
}

export function onNotification(
  listener: (event: NotificationEvent) => void
): Subscription {
  return emitter.addListener<NotificationEvent>("notification", listener);
}

export async function start(
  successCallback: () => void = () => {},
  errorCallback: (error: any) => void = () => {}
): Promise<void> {
  return _wrapper(
    () => ExpoPusherNotificationsModule.start(),
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

export function setInstanceId(apiKey: string): void {
  ExpoPusherNotificationsModule.setInstanceId(apiKey);
}
