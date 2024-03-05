import ExpoModulesCore
import PushNotifications

public class ExpoPusherNotificationsModule: Module {
    
  let pusherController = PusherController.shared

  public required init(appContext: AppContext) {
    super.init(appContext: appContext)
  }
  
  public func definition() -> ModuleDefinition {
    Name("ExpoPusherNotifications")

    Events("onInterestsChanged", "notification")
      
    Function("setInstanceId") { (apiKey: String) in
      self.pusherController.setApiKey(apiKey: apiKey)
    }

    AsyncFunction("start") { (promise: Promise) in
        self.pusherController.registerForNotifications()
        promise.resolve(true)
    }
    
    AsyncFunction("addDeviceInterest") { ( interest: String, promise: Promise ) in
      try? self.pusherController.addDeviceInterest(interest: interest)
      promise.resolve(true)
    }

    AsyncFunction("removeDeviceInterest") { (interest: String, promise: Promise) in 
      try? self.pusherController.removeDeviceInterest(interest: interest)
      promise.resolve(true)
    }

    AsyncFunction("getDeviceInterests") {
      (promise: Promise) in
      let interests = self.pusherController.getDeviceInterests()
      promise.resolve(interests)
    }


    AsyncFunction("setDeviceInterests") { (interests: [String], promise: Promise) in
        do {
            try self.pusherController.setDeviceInterests(interests: interests)
            promise.resolve(true)
        }          
        catch {
            promise.reject("PUSHER_ERROR", "Cannot set device interests")
        }
    }

    AsyncFunction("setUserId") { (userId: String, token: String, promise: Promise) in
        let tokenProvider = LocalTokenProvider()
        tokenProvider.setToken(token: token)
        self.pusherController.setUserId(userId: userId, tokenProvider: tokenProvider)
        promise.resolve(true)
    }

    AsyncFunction("clearAllState") { (promise: Promise) in
        self.pusherController.clearAllState()
        promise.resolve(true)
    }

    View(ExpoPusherNotificationsView.self) {
      // Defines a setter for the `name` prop.
      Prop("name") { (view: ExpoPusherNotificationsView, prop: String) in
        print(prop)
      }
    }
  }

  public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    print("module will start")
    return true
  }


}
