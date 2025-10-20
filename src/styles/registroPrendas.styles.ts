import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
    form: {
        flex: 1,
    },
    label: {
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 6,
        marginTop: 5,
    },
    error: {
        color: "red",
        fontSize: 12,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
});
