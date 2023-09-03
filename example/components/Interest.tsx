import React from "react";
import { TouchableOpacity, StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useInterests } from "./InterestsContext";

type InterestProps = { title: string };

export const Interest = ({ title }: InterestProps) => {
  const { removeInterest } = useInterests();

  const handleRemove = () => {
    removeInterest(title);
  };

  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleRemove}>
        <MaterialIcons name="delete" size={16} color="#cecece" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
