import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        backgroundColor: "#007AFF",
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 16,
    },
});
