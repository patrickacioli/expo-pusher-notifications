import * as React from 'react';

import { ExpoPusherNotificationsViewProps } from './ExpoPusherNotifications.types';

export default function ExpoPusherNotificationsView(props: ExpoPusherNotificationsViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
