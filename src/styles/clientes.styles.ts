import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
    },

    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text.primary,
        textAlign: "center",
        marginBottom: theme.spacing.lg,
    },

    label: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.primary,
        fontWeight: "600",
        marginBottom: theme.spacing.xs,
        marginTop: theme.spacing.sm,
    },

    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.card,
        marginBottom: theme.spacing.sm,
        fontSize: 14,
    },

    submitButton: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
    },

    error: {
        color: theme.colors.text.error,
        fontSize: theme.fontSize.sm,
        marginTop: -4,
        marginBottom: theme.spacing.sm,
    },

    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: theme.spacing.sm,
    },

    field: {
        marginBottom: theme.spacing.md,
    },

    form: {
        marginVertical: 10,
    },
});