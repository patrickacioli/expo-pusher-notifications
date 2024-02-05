import ExpoModulesCore
import PushNotifications


public class AppLifecycleDelegate: ExpoAppDelegateSubscriber, UIApplicationDelegate  {

  let pusherController = PusherController.shared
  public var window: UIWindow?
    
  public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    self.pusherController.start()
    return true
  }

  public func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    self.pusherController.registerDeviceToken(deviceToken: deviceToken)
  }

  public func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    self.pusherController.handleNotification(userInfo: userInfo)
    guard application.applicationState == .active else { return }
    guard let alertDict = ((userInfo["aps"] as? NSDictionary)?.value(forKey: "alert")) as? NSDictionary,
    let title = alertDict["title"] as? String,
    let body = alertDict["body"] as? String
    else { return }
    let alertController = UIAlertController(title: title, message: body, preferredStyle: .alert)
    let okAct = UIAlertAction(title: "Ok", style: .default, handler: nil)
    alertController.addAction(okAct)
    self.window?.rootViewController?.present(alertController, animated: true, completion: nil)
    completionHandler(UIBackgroundFetchResult.noData)
  }

}


