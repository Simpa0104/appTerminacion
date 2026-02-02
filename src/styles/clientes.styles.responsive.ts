// styles/clientes.styles.responsive.ts
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { theme } from "./theme.responsive";
import { responsiveValue } from "./responsive.utils";

// Helper para convertir valores responsive a número
const toNumber = (value: string | number | undefined): number | undefined => {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return value;
};

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        maxWidth: toNumber(responsiveValue(undefined, 700, 800)),
        alignSelf: responsiveValue(undefined, "center", "center") as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
        width: "100%",
    } as ViewStyle,

    title: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text.primary,
        textAlign: "center",
        marginBottom: theme.spacing.lg,
    } as TextStyle,

    label: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.primary,
        fontWeight: "600",
        marginBottom: theme.spacing.xs,
        marginTop: theme.spacing.sm,
    } as TextStyle,

    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.card,
        marginBottom: theme.spacing.sm,
        fontSize: theme.fontSize.base,
        height: theme.heights.input,
    },

    submitButton: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        height: theme.heights.button,
        minWidth: toNumber(responsiveValue(undefined, 200, 250)),
        alignSelf: responsiveValue("stretch", "center", "center") as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    } as ViewStyle,

    error: {
        color: theme.colors.text.error,
        fontSize: theme.fontSize.sm,
        marginTop: -4,
        marginBottom: theme.spacing.sm,
    } as TextStyle,

    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: theme.spacing.sm,
        paddingHorizontal: toNumber(responsiveValue(0, theme.spacing.sm, theme.spacing.md)),
    } as ViewStyle,

    field: {
        marginBottom: theme.spacing.md,
    },

    form: {
        marginVertical: toNumber(responsiveValue(10, 15, 20)),
        width: "100%",
    } as ViewStyle,
});
