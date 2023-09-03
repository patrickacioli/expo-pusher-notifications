package expo.modules.pushernotifications

import android.content.Context
import android.util.Log
import com.pusher.pushnotifications.PushNotifications
import com.pusher.pushnotifications.SubscriptionsChangedListener

class ExpoPusherNotificationsWrapper {

  fun start(apiKey: String, context: Context) {
    PushNotifications.start(context, apiKey)
    PushNotifications.setOnDeviceInterestsChangedListener(
        object : SubscriptionsChangedListener {
          override fun onSubscriptionsChanged(interests: Set<String>) {
            Log.i("MainActivity", "Interests: $interests")
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

}
