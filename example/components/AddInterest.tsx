import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import { useInterests } from "./InterestsContext";

export const AddInterest = ({}) => {
  const { addInterest } = useInterests();
  const [interestToAdd, setInterestToAdd] = React.useState<string>("");

  const handleAdd = () => {
    if (!_.isEmpty(interestToAdd)) {
      addInterest(interestToAdd);
      setInterestToAdd("");
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder={"Add interests"}
        value={interestToAdd}
        onChangeText={(text) => setInterestToAdd(text)}
      />
      <TouchableOpacity onPress={handleAdd}>
        <View style={styles.addButton}>
          <Ionicons name="add" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addButtonText: {},
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
});
