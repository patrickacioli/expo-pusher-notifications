import { ConfigPlugin, withPlugins } from "expo/config-plugins";
import { androidPlugin } from "./androidPlugin";
import { iosPlugin } from "./iosPlugin";

const withPusherConfig: ConfigPlugin<{ pusherInstanceId: string }> = (
  config,
  { pusherInstanceId }
) => {
  return withPlugins(config, [
    [androidPlugin, { pusherInstanceId }],
    [iosPlugin, { pusherInstanceId }],
  ]);
};

export default withPusherConfig;
