import {
  ConfigPlugin,
  WarningAggregator,
  withAppBuildGradle,
  withProjectBuildGradle,
  withAndroidManifest,
  AndroidConfig,
} from "expo/config-plugins";

const applyGoogleServicesClassPath = (buildGradle: string) => {
  const newClassPath = `classpath 'com.google.gms:google-services:4.3.8'\r\n`;
  const depsRegex = new RegExp(/dependencies {/, "g");
  return buildGradle.replace(
    depsRegex,
    `dependencies {
        ${newClassPath}`
  );
};
const applyPusherDepsToApp = (buildGradle: string) => {
  const firebaseMessaging = `implementation('com.google.firebase:firebase-messaging:21.1.0')`;
  const pusherLib = `implementation('com.pusher:push-notifications-android:1.9.0')`;
  const reactLib = `implementation('com.facebook.react:react-android')`;

  const depsRegex = new RegExp(
    /implementation\("com\.facebook\.react\:react-android"\)/,
    "g"
  );

  return buildGradle.replace(
    depsRegex,
    `${reactLib}\r\n\t${firebaseMessaging}\r\n\t${pusherLib}\r\n`
  );
};

const applyGoogleServicesPlugin = (buildGradle: string) => {
  let newBuildGradle = buildGradle;
  newBuildGradle += `\napply plugin: 'com.google.gms.google-services'`;
  return newBuildGradle;
};

export const androidPlugin: ConfigPlugin = (config) => {
  /**
   * Update project build.gradle
   */
  config = withProjectBuildGradle(config, ({ modResults, ...subConfig }) => {
    if (modResults.language !== "groovy") {
      WarningAggregator.addWarningAndroid(
        "withBackgroundGeolocation",
        `Cannot automatically configure project build.gradle if it's not groovy`
      );
      return { modResults, ...subConfig };
    }

    if (!subConfig.android?.googleServicesFile) {
      WarningAggregator.addWarningAndroid(
        "withBackgroundGeolocation",
        `Cannot automatically configure project build.gradle if no googleServicesFile provided.`
      );
      return { modResults, ...subConfig };
    }

    // Apply Google Services plugin
    modResults.contents = applyGoogleServicesPlugin(modResults.contents);

    return {
      modResults,
      ...subConfig,
    };
  });

  config = withAppBuildGradle(config, ({ modResults, ...subConfig }) => {
    if (modResults.language !== "groovy") {
      WarningAggregator.addWarningAndroid(
        "withBackgroundGeolocation",
        `Cannot automatically configure project build.gradle if it's not groovy`
      );
      return { modResults, ...subConfig };
    }

    // Apply Pusher deps
    modResults.contents = applyPusherDepsToApp(modResults.contents);

    return {
      modResults,
      ...subConfig,
    };
  });

  config = withAndroidManifest(config, ({ modResults, ...subConfig }) => {
    AndroidConfig.Permissions.addPermission(
      modResults,
      "android.permission.POST_NOTIFICATIONS"
    );

    return {
      modResults,
      ...subConfig,
    };
  });

  return config;
};
