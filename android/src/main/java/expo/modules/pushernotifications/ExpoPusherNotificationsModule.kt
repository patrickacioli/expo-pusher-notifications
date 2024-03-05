package expo.modules.pushernotifications
import android.content.pm.PackageManager
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
  private var tokenProvider: ExpoPusherCustomTokenProvider = ExpoPusherCustomTokenProvider()

  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  private var instanceId: String? = null;

  override fun definition() = ModuleDefinition {
    Name("ExpoPusherNotifications")

    Events("onInterestsChanged", "notification")

    AsyncFunction("start") {promise: Promise ->
      try {
        pusher = ExpoPusherNotificationsWrapper()
        val applicationInfo = context.packageManager?.getApplicationInfo(context.packageName.toString(), PackageManager.GET_META_DATA)
        val apiKey = applicationInfo?.metaData?.getString("PUSHER_INSTANCE_ID")
        if (apiKey === null) {
          throw Exception("You must configure pusherInstanceId on app.json")
        }
        pusher.start(apiKey!!, context, this@ExpoPusherNotificationsModule::handleInterestsChange)
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

    AsyncFunction("clearAllState") {
      pusher.clearAllState()
    }

    AsyncFunction("setDeviceInterests") { interests: List<String> ->
      pusher.setDeviceInterests(interests)
    }

    AsyncFunction("setUserId") { userId: String, token: String, promise: Promise ->
      try {
        tokenProvider = ExpoPusherCustomTokenProvider()
        tokenProvider.setLocalToken(token)
        pusher.setUserId(userId, tokenProvider)
        promise.resolve(null)
      }  catch (e: Exception) {
        promise.reject("ERR_PUSH_NOTIFICATIONS_SET_USER_ID", "Cannot set user token", e)
      }
    }

    OnActivityEntersForeground {
      pusher.onReceiveActivity(
          appContext.currentActivity,
          this@ExpoPusherNotificationsModule::handleOnActivity
      )
    }
  }

  private fun handleOnActivity(remoteMessage: RemoteMessage) {
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
