import _, { uniq } from "lodash";
import * as ExpoPusherNotifications from "expo-pusher-notifications";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

ExpoPusherNotifications.setInstanceId("b857d876-be95-4bb2-941f-93a122ab39aa");

type InterestsContextType = {
  interests: string[];
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
};

export const InterestsContext = createContext<InterestsContextType>(
  {} as InterestsContextType
);

export const InterestsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [interests, setInterests] = useState<string[]>([]);

  const getInterests = useCallback(() => {
    ExpoPusherNotifications.getDeviceInterests().then((newInterests) => {
      console.log(`Device interests:`, newInterests);
      setInterests(newInterests);
    });
  }, []);

  const addInterest = useCallback(
    (interest: string) => {
      ExpoPusherNotifications.addDeviceInterest(interest).then(() => {
        console.log(`Added interest with id: ${interest}`);
        getInterests();
      });
    },
    [getInterests]
  );

  const removeInterest = useCallback((interest: string) => {
    ExpoPusherNotifications.removeDeviceInterest(interest).then(() => {
      console.log(`Removed interest with id: ${interest}`);
      getInterests();
    });
  }, []);

  useEffect(() => {
    ExpoPusherNotifications.start(() => {
      console.log(`Pusher Notifications started`);
      getInterests();
    });
    const onNotificationSubscription = ExpoPusherNotifications.onNotification(
      ({ notification }) => {
        console.log(`On Notification:`, notification);
      }
    );
    const onEventSubscription =
      ExpoPusherNotifications.setOnDeviceInterestsChangedListener(
        ({ interests: newInterests }) => {
          console.log(
            `Received new event (setOnDeviceInterestsChangedListener):`,
            newInterests
          );
        }
      );
    return () => {
      onNotificationSubscription.remove();
      onEventSubscription.remove();
    };
  }, []);

  return (
    <InterestsContext.Provider
      value={{
        interests,
        addInterest,
        removeInterest,
      }}
    >
      {children}
    </InterestsContext.Provider>
  );
};

export const useInterests = () => {
  const { interests, addInterest, removeInterest } =
    useContext(InterestsContext);
  return {
    interests,
    addInterest,
    removeInterest,
  };
};
