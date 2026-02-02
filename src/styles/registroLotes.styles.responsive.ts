// styles/registroLotes.styles.responsive.ts
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
  container: baseStyles.container,
  searchBar: baseStyles.searchBar,
  statsRow: baseStyles.statsRow,
  statCard: baseStyles.statCard,
  statNumber: baseStyles.statNumber,
  statLabel: baseStyles.statLabel,
  sectionTitle: baseStyles.sectionTitle,
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
  modalSectionTitle: baseStyles.modalSectionTitle,
  modalBody: baseStyles.modalBody,
  modalActions: baseStyles.modalActions,
  card: baseStyles.card,

  label: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.md,
  } as TextStyle,

  input: {
    backgroundColor: theme.colors.card,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderMedium,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.lg,
    height: theme.heights.input,
  },

  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderMedium,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    height: theme.heights.input,
  },

  // Estilos para dropdown personalizado - responsive
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderMedium,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    height: theme.heights.input,
  },

  dropdownDisabled: {
    backgroundColor: "#F5F5F5",
    opacity: 0.6,
  },

  dropdownButtonText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.secondary,
  } as TextStyle,

  modalItem: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderBottomWidth: theme.borderWidth.thin,
    borderBottomColor: theme.colors.borderLight,
  },

  modalItemText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.secondary,
  } as TextStyle,

  // Texto de error
  errorText: {
    color: theme.colors.text.error,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
  } as TextStyle,

  // Info de prenda seleccionada - responsive
  prendaInfo: {
    backgroundColor: "#E8F5E9",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginVertical: theme.spacing.sm,
  },

  prendaInfoTitle: {
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
    fontSize: theme.fontSize.base,
    color: "#2E7D32",
  } as TextStyle,

  prendaInfoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  // Resumen del lote - responsive
  resumenContainer: {
    backgroundColor: "#E3F2FD",
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xl,
  },

  resumenTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
    color: "#1565C0",
  } as TextStyle,

  resumenText: {
    fontSize: theme.fontSize.base,
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.secondary,
  } as TextStyle,

  resumenTotal: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: "#1976D2",
    marginTop: theme.spacing.xs,
  } as TextStyle,

  submitButton: {
    marginTop: toNumber(responsiveValue(25, 30, 35)),
    marginBottom: toNumber(responsiveValue(30, 40, 50)),
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    minHeight: theme.heights.button,
    alignSelf: responsiveValue("stretch", "center", "center") as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    minWidth: toNumber(responsiveValue(undefined, 200, 250)),
  } as ViewStyle,

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: toNumber(responsiveValue(100, 120, 150)),
  } as ViewStyle,
});
