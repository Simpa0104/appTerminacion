// styles/historialPrendas.styles.responsive.ts
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
  // Reutilizar estilos base directamente
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
  modalContentLarge: baseStyles.modalContentLarge,
  modalHeader: baseStyles.modalHeader,
  modalTitle: baseStyles.modalTitle,
  modalBody: baseStyles.modalBody,
  modalSectionTitle: baseStyles.modalSectionTitle,
  modalActions: baseStyles.modalActions,
  label: baseStyles.label,
  input: baseStyles.input,
  switchRow: baseStyles.switchRow,

  // Estilos específicos de esta pantalla - responsive
  headerRow: {
    ...baseStyles.headerRow,
  },

  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    minWidth: toNumber(responsiveValue(undefined, 120, 150)),
  } as ViewStyle,

  // Columnas específicas de esta tabla - responsive
  colTipo: {
    width: theme.tableColumns.medium,
    minWidth: toNumber(responsiveValue(100, 120, 140)),
  } as ViewStyle,

  colMarca: {
    width: toNumber(responsiveValue(110, 130, 150)),
    minWidth: 110,
  } as ViewStyle,

  colRef: {
    width: theme.tableColumns.large,
    minWidth: toNumber(responsiveValue(120, 140, 160)),
  } as ViewStyle,

  colBotones: {
    width: theme.tableColumns.narrow,
    textAlign: "center",
    minWidth: toNumber(responsiveValue(80, 90, 100)),
  } as any, // Mezcla View y Text

  colProcesos: {
    width: theme.tableColumns.xxlarge,
    minWidth: toNumber(responsiveValue(200, 250, 300)),
  } as ViewStyle,

  colTotal: {
    width: toNumber(responsiveValue(110, 130, 150)),
    minWidth: 110,
  } as ViewStyle,

  colAcciones: {
    width: theme.tableColumns.small,
    minWidth: toNumber(responsiveValue(100, 110, 120)),
  } as ViewStyle,

  // Chips de procesos - responsive
  procesosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.xs,
  },

  procesoChip: {
    ...baseStyles.chipBlue,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xl,
    fontSize: theme.fontSize.sm,
  } as TextStyle,

  // Chip para procesos personalizados (azul más claro)
  procesoCustom: {
    backgroundColor: "#F0F9FF",
    color: "#1E40AF",
  } as TextStyle,

  totalText: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.success,
    fontSize: theme.fontSize.lg,
  } as TextStyle,

  editarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonPrimary,
    fontSize: theme.fontSize.base,
  } as TextStyle,

  eliminarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonDanger,
    fontSize: theme.fontSize.base,
  } as TextStyle,

  cerrarModal: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  } as TextStyle,

  // Procesos personalizados en el modal de edición - responsive
  customProcessCard: {
    backgroundColor: "#F0F9FF",
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
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

  customProcessBlock: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: "#F0F9FF",
    borderRadius: theme.borderRadius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: "#BFDBFE",
  },

  customProcessLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  totalContainerModal: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    alignItems: responsiveValue("stretch", "center", "center") as "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    backgroundColor: theme.colors.table.header,
    padding: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xxl,
    borderWidth: theme.borderWidth.medium,
    borderColor: theme.colors.primary,
    gap: toNumber(responsiveValue(theme.spacing.sm, 0, 0)),
  } as ViewStyle,

  totalLabelModal: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
    textAlign: responsiveValue("center", "left", "left") as "auto" | "left" | "right" | "center" | "justify",
  } as TextStyle,

  totalValueModal: {
    fontSize: theme.fontSize.display2,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    textAlign: responsiveValue("center", "right", "right") as "auto" | "left" | "right" | "center" | "justify",
  } as TextStyle,

  card: {
    ...baseStyles.card,
    marginTop: theme.spacing.lg,
  },

  buttonCenter: {
    alignSelf: "center",
    backgroundColor: theme.colors.primary,
    minWidth: toNumber(responsiveValue(undefined, 150, 200)),
  } as ViewStyle,
});
