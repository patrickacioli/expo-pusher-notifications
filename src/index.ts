import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoPusherNotifications.web.ts
// and on native platforms to ExpoPusherNotifications.ts
import ExpoPusherNotificationsModule from './ExpoPusherNotificationsModule';
import ExpoPusherNotificationsView from './ExpoPusherNotificationsView';
import { ChangeEventPayload, ExpoPusherNotificationsViewProps } from './ExpoPusherNotifications.types';

// Get the native constant value.
export const PI = ExpoPusherNotificationsModule.PI;

export function hello(): string {
  return ExpoPusherNotificationsModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoPusherNotificationsModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoPusherNotificationsModule ?? NativeModulesProxy.ExpoPusherNotifications);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoPusherNotificationsView, ExpoPusherNotificationsViewProps, ChangeEventPayload };
