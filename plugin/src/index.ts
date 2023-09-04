import {
  ConfigPlugin,
  WarningAggregator,
  withInfoPlist,
  withPlugins,
  withProjectBuildGradle,
} from "expo/config-plugins";
import { androidPlugin } from "./androidPlugin";

const withPusherConfig: ConfigPlugin = (config) => {
  return withPlugins(config, [androidPlugin]);
};

export default withPusherConfig;
