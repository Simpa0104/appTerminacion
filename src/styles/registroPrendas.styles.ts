import { StyleSheet } from "react-native";

// Asumiendo que tienes un theme similar
const theme = {
  colors: {
    background: "#F7F9FC",
    card: "#FFFFFF",
    primary: "#007bff",
    border: "#DDD",
    text: {
      primary: "#333",
      secondary: "#666",
      error: "#FF3B30",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 20,
    xl: 32,
  },
  fontSize: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
  },
  fontWeight: {
    bold: "700" as "700",
  },
  borderRadius: {
    md: 12,
  },
};

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

  // Card para proceso de abotonar
  processCard: {
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E4E8",
  },

  processTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
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
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
  },

  // Subtotal por proceso
  subtotalBox: {
    backgroundColor: "#EEF2FF",
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    alignItems: "center",
  },

  subtotalText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4F46E5",
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
    fontWeight: "600",
  },

  totalValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  totalNote: {
    fontSize: 12,
    color: "#2E7D32",
    marginTop: 8,
    fontStyle: "italic",
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