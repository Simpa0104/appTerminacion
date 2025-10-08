import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#007AFF",
  },
  card: {
    marginTop: 10,
    borderRadius: 16,
    paddingBottom: 8,
  },
});
