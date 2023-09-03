package expo.modules.pushernotifications

import android.util.Log
import com.google.firebase.messaging.RemoteMessage
import com.pusher.pushnotifications.fcm.MessagingService

class ExpoPusherMessagingService : MessagingService() {
  override fun onNewToken(token: String) {
    Log.i("NotificationsService", "Token was updated 🔒")
    // Overriding this method is optional.
    // You can use this token to integrate with other push notification services
  }

  override fun onMessageReceived(remoteMessage: RemoteMessage) {
    Log.i("NotificationsService", "Got a remote message 🎉")
    // TODO: Do something useful here
  }
}