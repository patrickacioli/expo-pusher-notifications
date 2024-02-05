import {
  ConfigPlugin,
  withInfoPlist,
  withPodfileProperties,
} from "expo/config-plugins";

export const iosPlugin: ConfigPlugin<{
  pusherInstanceId: string;
}> = (config, { pusherInstanceId }) => {
  config = withPodfileProperties(config, ({ modResults, ...subConfig }) => {
    modResults = {
      ...modResults,
      "ios.useFrameworks": "static",
    };
    return {
      modResults,
      ...subConfig,
    };
  });

  config = withInfoPlist(config, (config) => {
    config.modResults["PUSHER_INSTANCE_ID"] = pusherInstanceId;
    return config;
  });

  return config;
};
