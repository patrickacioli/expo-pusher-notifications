import { ConfigPlugin, withPodfileProperties } from "expo/config-plugins";

export const iosPlugin: ConfigPlugin = (config) => {
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

  return config;
};
