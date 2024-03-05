import PushNotifications


public class LocalTokenProvider: TokenProvider {
    
    public var _token: String?
    
    public func fetchToken(userId: String, completionHandler completion: @escaping (String, Error?) -> Void) throws {
        if (self._token == nil) {
            return completion("", TokenProviderError.error("[PushNotifications] - BeamsTokenProvider: Token is nil"))
        } else {
            return completion(self._token!, nil)
        }        
    }
    
 
    public func setToken(token: String) {
        self._token = token
    }
}
