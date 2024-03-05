package expo.modules.pushernotifications

import android.util.Log
import com.pusher.pushnotifications.auth.TokenProvider

internal class ExpoPusherCustomTokenProvider : TokenProvider {

    private var _token: String? = null

    fun setLocalToken(token: String) {
        this._token = token
    }
    override fun fetchToken(userId: String): String {
        if (this._token === null) {
            throw Exception("User token has not configured yet")
        } else {
            return this._token!!
        }
    }
}
