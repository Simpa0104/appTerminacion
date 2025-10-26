import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
        paddingHorizontal: 20,
        paddingTop: 25,
    },

    label: {
        fontSize: 15,
        color: "#333",
        fontWeight: "600",
        marginBottom: 6,
        marginTop: 14,
    },

    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        fontSize: 15,
    },

    dateButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },

    dropdownButton: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        height: 48,
        justifyContent: "center",
        marginBottom: 6,
    },

    dropdownButtonText: {
        fontSize: 15,
        color: "#333",
        textAlign: "left",
    },

    submitButton: {
        marginTop: 25,
        borderRadius: 14,
        backgroundColor: "#007bff",
        paddingVertical: 8,
    },

    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
});