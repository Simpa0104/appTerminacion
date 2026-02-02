// styles/registroPrendas.styles.responsive.ts
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { theme } from "./theme.responsive";
import { baseStyles } from "./baseStyles.responsive";
import { responsiveValue } from "./responsive.utils";

// Helper para convertir valores responsive a número
const toNumber = (value: string | number | undefined): number | undefined => {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return value;
};

export default StyleSheet.create({
  // Reutilizar estilos base
  container: baseStyles.container,
  searchBar: baseStyles.searchBar,
  statsRow: baseStyles.statsRow,
  statCard: baseStyles.statCard,
  statNumber: baseStyles.statNumber,
  statLabel: baseStyles.statLabel,
  loadingContainer: baseStyles.loadingContainer,
  loadingText: baseStyles.loadingText,
  emptyContainer: baseStyles.emptyContainer,
  emptyText: baseStyles.emptyText,
  tableContainer: baseStyles.tableContainer,
  tableHeader: baseStyles.tableHeader,
  tableRow: baseStyles.tableRow,
  tableCell: baseStyles.tableCell,
  headerText: baseStyles.headerText,
  accionesRow: baseStyles.accionesRow,
  overlay: baseStyles.overlay,
  overlayCard: baseStyles.overlayCard,
  overlayContent: baseStyles.overlayContent,
  modalOverlay: baseStyles.modalOverlay,
  modalContent: baseStyles.modalContent,
  modalHeader: baseStyles.modalHeader,
  modalTitle: baseStyles.modalTitle,
  modalBody: baseStyles.modalBody,
  modalActions: baseStyles.modalActions,
  card: baseStyles.card,

  // Estilos personalizados de registro de prendas - responsive
  sectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginVertical: theme.spacing.lg,
    marginTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: theme.borderWidth.medium,
    borderBottomColor: theme.colors.primary,
  } as TextStyle,

  modalSectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: theme.borderWidth.medium,
    borderBottomColor: theme.colors.primary,
  } as TextStyle,

  title: {
    fontSize: theme.fontSize.display1,
    fontWeight: theme.fontWeight.bold,
    color: "#111827",
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  } as TextStyle,

  label: {
    fontSize: theme.fontSize.base,
    color: "#374151",
    marginBottom: theme.spacing.xs,
    fontWeight: theme.fontWeight.semibold,
  } as TextStyle,

  input: {
    borderWidth: theme.borderWidth.thin,
    borderColor: "#D1D5DB",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSize.base,
    height: theme.heights.input,
  },

  subtitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
    color: "#111827",
  } as TextStyle,

  optionBlock: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderWidth: theme.borderWidth.thin,
    borderColor: "#E5E7EB",
    padding: theme.spacing.md,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },

  // Procesos personalizados - responsive
  customProcessCard: {
    backgroundColor: "#F0F9FF",
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: theme.borderWidth.thin,
    borderColor: "#BFDBFE",
    marginBottom: theme.spacing.lg,
  },

  customProcessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },

  customProcessTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  } as TextStyle,

  deleteButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    minWidth: toNumber(responsiveValue(undefined, 80, 100)),
  } as ViewStyle,

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
  } as TextStyle,

  addProcessButton: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    minWidth: toNumber(responsiveValue(undefined, 150, 200)),
  } as ViewStyle,

  totalContainer: {
    marginVertical: theme.spacing.xl,
    backgroundColor: "#EEF2FF",
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.lg,
    alignItems: "center",
  },

  totalLabel: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: "#1E3A8A",
  } as TextStyle,

  totalValue: {
    fontSize: theme.fontSize.display1,
    fontWeight: theme.fontWeight.bold,
    color: "#1E40AF",
    marginTop: theme.spacing.xs,
  } as TextStyle,

  submitButton: {
    backgroundColor: "#2563EB",
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    minHeight: theme.heights.button,
    alignSelf: responsiveValue("stretch", "center", "center") as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    minWidth: toNumber(responsiveValue(undefined, 200, 250)),
  } as ViewStyle,

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  } as TextStyle,

  error: {
    color: "#DC2626",
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.sm,
  } as TextStyle,
});
