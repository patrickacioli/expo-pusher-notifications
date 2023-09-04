package expo.modules.pushernotifications


import android.content.Context
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class ExpoPusherNotificationsPackage : Package {
    override fun createReactActivityLifecycleListeners(activityContext: Context): List<ReactActivityLifecycleListener> {
        return listOf(ExpoPusherActivityListener())
    }
}
