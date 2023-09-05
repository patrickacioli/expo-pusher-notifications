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
    console.log(`getInterests`);

    ExpoPusherNotifications.getDeviceInterests().then((interests) => {
      setInterests(interests);
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

  const removeInterest = useCallback(
    (interest: string) => {
      ExpoPusherNotifications.removeDeviceInterest(interest).then(() => {
        console.log(`Removed interest with id: ${interest}`);
      });
    },
    [getInterests]
  );

  useEffect(() => {
    console.log(`start`);
    ExpoPusherNotifications.start(
      "b857d876-be95-4bb2-941f-93a122ab39aa",
      () => {
        console.log(`Connected to Pusher from effect`);
      }
    ).then(() => {
      console.log(`algo`);
    });
    getInterests();
  }, []);

  useEffect(() => {
    const subscription =
      ExpoPusherNotifications.setOnDeviceInterestsChangedListener(
        ({ interests: newInterests }) => {
          console.log(`From Event:`, newInterests);
        }
      );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = ExpoPusherNotifications.onNotification(
      ({ notification }) => {
        console.log(`On Notification:`, notification);
      }
    );
    return () => subscription.remove();
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
