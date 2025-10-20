import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    field: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: "#007AFF",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    form: {
        marginVertical: 10,
    },
});
