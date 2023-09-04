package expo.modules.pushernotifications

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.core.os.bundleOf
import com.google.firebase.messaging.RemoteMessage
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoPusherNotificationsModule : Module() {

  private var pusher: ExpoPusherNotificationsWrapper = ExpoPusherNotificationsWrapper()

  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() = ModuleDefinition {
    Name("ExpoPusherNotifications")

    Events("onInterestsChanged", "notification")

    AsyncFunction("start") { apiKey: String, promise: Promise ->
      try {
        pusher = ExpoPusherNotificationsWrapper()
        pusher.start(apiKey, context, this@ExpoPusherNotificationsModule::handleInterestsChange)
        promise.resolve(null)
      } catch (e: Exception) {
        promise.reject("ERR_PUSH_NOTIFICATIONS_START", "Cannot start pusher ", e)
      }
    }

    AsyncFunction("addDeviceInterest") { interest: String, promise: Promise ->
      try {
        pusher.addDeviceInterest(interest)
        promise.resolve(interest)
      } catch (e: Exception) {
        promise.reject("ERR_PUSH_NOTIFICATIONS_ADD_INTEREST", "Cannot add interests ", e)
      }
    }

    AsyncFunction("removeDeviceInterest") { interest: String ->
      pusher.removeDeviceInterest(interest)
    }

    AsyncFunction("getDeviceInterests") { pusher.getDeviceInterests() }

    AsyncFunction("setDeviceInterests") { interests: List<String> ->
      pusher.setDeviceInterests(interests)
    }

    OnActivityEntersForeground {
      pusher.onReceiveActivity(
          appContext.currentActivity,
          this@ExpoPusherNotificationsModule::handleOnActivity
      )
    }
  }

  private fun handleOnActivity(remoteMessage: RemoteMessage) {
    Log.i("MainActivity", "${remoteMessage.toString()}")
    val result = mutableMapOf<String, String?>()
    val notification = remoteMessage.notification
    val data = remoteMessage.data

    result["body"] = notification?.body
    result["title"] = notification?.title
    result["tag"] = notification?.tag
    result["click_action"] = notification?.clickAction
    result["icon"] = notification?.icon
    result["color"] = notification?.color
    result["data"]

    Log.i("MainActivity", "Received notifications $result")

    val bundle = Bundle()

    result.forEach { (key, value) -> bundle.putString(key, value) }

    if (data.isNotEmpty()) {
      val bundleData = Bundle()
      data.forEach { (key, value) -> bundleData.putString(key, value) }
      bundle.putBundle("data", bundleData)
    }

    this@ExpoPusherNotificationsModule.sendEvent("notification", bundleOf("notification" to bundle))
  }

  private fun handleInterestsChange(interests: Set<String>) {
    Log.i("MainActivity", "Chamou novos interesses $interests")
    this@ExpoPusherNotificationsModule.sendEvent(
        "onInterestsChanged",
        bundleOf("interests" to interests.toList())
    )
  }
}
