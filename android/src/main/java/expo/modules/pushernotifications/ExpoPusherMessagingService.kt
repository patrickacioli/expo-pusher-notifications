package expo.modules.pushernotifications

import android.util.Log
import com.google.firebase.messaging.RemoteMessage
import com.pusher.pushnotifications.fcm.MessagingService

class ExpoPusherMessagingService : MessagingService() {
  override fun onNewToken(token: String) {
    Log.i("NotificationsService", "Token was updated 🔒")
  }

  override fun onMessageReceived(remoteMessage: RemoteMessage) {
    Log.i("NotificationsService", "Got a remote message 🎉")
  }
}