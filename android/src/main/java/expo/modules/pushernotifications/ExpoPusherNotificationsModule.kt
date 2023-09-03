package expo.modules.pushernotifications

import android.content.Context
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

    Events("onInterestsChanged")

    AsyncFunction("start") { apiKey: String, promise: Promise ->
      try {
        pusher = ExpoPusherNotificationsWrapper()
        pusher.start(apiKey, context)
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
  }
}
