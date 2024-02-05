package expo.modules.pushernotifications

import android.app.Activity
import android.content.Context
import android.util.Log
import com.google.firebase.messaging.RemoteMessage
import com.pusher.pushnotifications.PushNotificationReceivedListener
import com.pusher.pushnotifications.PushNotifications
import com.pusher.pushnotifications.SubscriptionsChangedListener

class ExpoPusherNotificationsWrapper {

  fun start(
      apiKey: String,
      context: Context,
      handleInterestChange: (interests: Set<String>) -> Unit,
  ) {
    PushNotifications.start(context, apiKey)
    PushNotifications.setOnDeviceInterestsChangedListener(
        object : SubscriptionsChangedListener {
          override fun onSubscriptionsChanged(interests: Set<String>) {
            handleInterestChange(interests)
          }
        }
    )
  }

  fun addDeviceInterest(interest: String) {
    PushNotifications.addDeviceInterest(interest)
  }

  fun getDeviceInterests(): Set<String> {
    return PushNotifications.getDeviceInterests()
  }
  fun removeDeviceInterest(interest: String) {
    PushNotifications.removeDeviceInterest(interest)
  }
  
  fun setDeviceInterests(interests: List<String>) {
    PushNotifications.setDeviceInterests(interests.toMutableSet())
  }

  fun onReceiveActivity(activity: Activity?, callBack: (remoteMessage: RemoteMessage) -> Unit) {
    if (activity == null) {
      Log.i("MainActivity", "Veio nulo")
      return
    }
    PushNotifications.setOnMessageReceivedListenerForVisibleActivity(
        activity,
        object : PushNotificationReceivedListener {
          override fun onMessageReceived(remoteMessage: RemoteMessage) {
            Log.i("MainActivity", "Remote message received while this activity is visible!")
            callBack(remoteMessage)
          }
        }
    )
  }
}
