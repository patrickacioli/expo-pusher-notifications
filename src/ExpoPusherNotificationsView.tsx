import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoPusherNotificationsViewProps } from './ExpoPusherNotifications.types';

const NativeView: React.ComponentType<ExpoPusherNotificationsViewProps> =
  requireNativeViewManager('ExpoPusherNotifications');

export default function ExpoPusherNotificationsView(props: ExpoPusherNotificationsViewProps) {
  return <NativeView {...props} />;
}
