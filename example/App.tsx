import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { InterestsList } from "./components/InterestsList";
import { AddInterest } from "./components/AddInterest";
import { ClearAll } from "./components/ClearAll";
import { InterestsProvider, useInterests } from "./components/InterestsContext";

function Wrapper() {
  const { interests } = useInterests();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pusher Example App</Text>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          width: "100%",
        }}
      >
        <View style={styles.interestsWrapper}>
          <InterestsList />
        </View>

        {interests?.length > 0 && <ClearAll />}
      </ScrollView>

      <AddInterest />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <InterestsProvider>
      <Wrapper />
    </InterestsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  interestsWrapper: {
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
