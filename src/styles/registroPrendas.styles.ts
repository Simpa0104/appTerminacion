import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
    form: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
    },

    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text.primary,
        textAlign: "center",
        marginBottom: theme.spacing.lg,
    },

    sectionTitle: {
        fontSize: theme.fontSize.lg,
        fontWeight: "600",
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
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

    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
    },

    optionBlock: {
        marginTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
    },

    // Estilos para el contenedor del total
    totalContainer: {
        marginTop: 20,
        backgroundColor: "#E8F5E9",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },

    totalLabel: {
        fontSize: 14,
        color: "#2E7D32",
        marginBottom: 4,
    },

    totalValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4CAF50",
    },

    submitButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        paddingVertical: theme.spacing.md,
        alignItems: "center",
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },

    submitButtonText: {
        color: "#fff",
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.bold,
    },

    error: {
        color: theme.colors.text.error,
        fontSize: theme.fontSize.sm,
        marginBottom: theme.spacing.sm,
        marginTop: -4,
    },
});