import {
  ConfigPlugin,
  WarningAggregator,
  withInfoPlist,
  withPlugins,
  withProjectBuildGradle,
} from "expo/config-plugins";
import { androidPlugin } from "./androidPlugin";
import { iosPlugin } from "./iosPlugin";

const withPusherConfig: ConfigPlugin = (config) => {
  return withPlugins(config, [androidPlugin, iosPlugin]);
};

export default withPusherConfig;
