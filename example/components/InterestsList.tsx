import React from "react";
import { StyleSheet, View } from "react-native";
import { Interest } from "./Interest";

import { useInterests } from "./InterestsContext";

export const InterestsList = () => {
  const { interests } = useInterests();

  return (
    <View style={styles.container}>
      {interests?.map((interest, index) => {
        return <Interest title={interest} key={`${index}-${interest}`} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
  },
});
