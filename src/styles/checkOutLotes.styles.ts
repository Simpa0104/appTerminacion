import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  button: {
    marginRight: 8,
    backgroundColor: "#007AFF",
  },

  searchBar: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 40,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    alignItems: "center",
  },

  tableCell: {
    paddingHorizontal: 10,
    textAlign: "center",
  },

  headerText: {
    fontWeight: "bold",
  },

  card: {
    marginTop: 20,
    padding: 10,
  },
});
