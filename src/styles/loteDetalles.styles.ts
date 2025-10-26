// src/styles/loteDetalles.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    padding: theme.spacing.lg,
  },

  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadow.card,
  },

  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },

  section: {
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },

  label: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    fontWeight: "600",
  },

  value: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.primary,
    fontWeight: "500",
    marginBottom: theme.spacing.sm,
  },

  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },

  sizeBox: {
    backgroundColor: "#E8F0FF",
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    marginVertical: 4,
    width: "48%",
  },

  sizeText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
    textAlign: "center",
    fontWeight: "600",
  },

  buttonContainer: {
    marginTop: theme.spacing.lg,
    alignItems: "center",
  },

  backButton: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
  },
});
