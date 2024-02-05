import Foundation
import ExpoModulesCore
import PushNotifications

/**
 This singleton that holds information about connection with pusher 
 */
@objc
public class PusherController: NSObject, UIApplicationDelegate {
    
    @objc
    public static let shared = PusherController()
    public var apiKey = ""
    var deviceToken: Data? = nil
    
    let pushNotifications = PushNotifications.shared

    public func setApiKey(apiKey: String) {
        self.apiKey = apiKey
    }
    
    public func start()  {
        let apiKeyFromConfig = Bundle.main.object(forInfoDictionaryKey: "PUSHER_INSTANCE_ID") as? String        
        if let unwrappedApiKey = apiKeyFromConfig {
            self.pushNotifications.start(instanceId: unwrappedApiKey)
            print("Pusher started with api key: \(unwrappedApiKey)")
        }
        else{
            print("No api key found in config")
        }

       
    }
    
    public func registerForNotifications() {
        print("Registering for notifications")
        self.pushNotifications.registerForRemoteNotifications()
    }
    
    public func registerDeviceToken(deviceToken: Data) {
        print("Registering device token")
        self.pushNotifications.registerDeviceToken(deviceToken)
    }

    public func addDeviceInterest(interest: String) throws {
        try self.pushNotifications.addDeviceInterest(interest: interest)
    }

    public func getDeviceInterests() throws -> [String] {
        return try self.pushNotifications.getDeviceInterests()!
    }
    public func removeDeviceInterest(interest: String) throws {
        return try self.pushNotifications.removeDeviceInterest(interest: interest)
    }

    public func handleNotification(userInfo: [AnyHashable: Any]) {
        self.pushNotifications.handleNotification(userInfo: userInfo)
    }

    public func setDeviceInterests(
        interests: [String]
    ) throws {
        try? self.pushNotifications.setDeviceInterests(interests: interests)
    }

    private override init() {
        super.init();
    }

}
