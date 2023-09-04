package expo.modules.pushernotifications

import android.app.Activity
import android.os.Bundle
import android.util.Log
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class ExpoPusherActivityListener : ReactActivityLifecycleListener {
    override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
        // Your setup code in `Activity.onCreate`.
        Log.i("ActivityListener", "OnCreate")
    }
}
