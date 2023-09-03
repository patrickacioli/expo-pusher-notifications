import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const ClearAll = () => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.item}>
      <Text style={styles.title}>Clear All</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    textAlign: "center",
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "white",
  },
});
