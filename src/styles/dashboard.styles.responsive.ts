// styles/dashboard.styles.responsive.ts
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

  // ==================== ESTILOS ESPECÍFICOS DEL DASHBOARD ====================
  buttonRow: {
    flexDirection: responsiveValue("column", "row", "row"),
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  } as ViewStyle,

  button: {
    marginRight: toNumber(responsiveValue(0, theme.spacing.sm, theme.spacing.sm)),
    marginBottom: toNumber(responsiveValue(theme.spacing.sm, 0, 0)),
    backgroundColor: theme.colors.primary,
    minWidth: toNumber(responsiveValue(undefined, 100, 120)),
  } as ViewStyle,

  tableScrollContainer: {
    paddingBottom: theme.spacing.sm,
  },

  // Columnas específicas de esta tabla - responsive
  colReferencia: {
    width: theme.tableColumns.medium,
    minWidth: toNumber(responsiveValue(100, 120, 140)),
  } as ViewStyle,

  colCliente: {
    width: theme.tableColumns.large,
    minWidth: toNumber(responsiveValue(120, 140, 160)),
  } as ViewStyle,

  colFecha: {
    width: theme.tableColumns.small,
    minWidth: toNumber(responsiveValue(100, 110, 120)),
  } as ViewStyle,

  colTipo: {
    width: theme.tableColumns.medium,
    minWidth: toNumber(responsiveValue(100, 120, 140)),
  } as ViewStyle,

  colCantidad: {
    width: theme.tableColumns.narrow,
    minWidth: toNumber(responsiveValue(80, 90, 100)),
  } as ViewStyle,

  colTotal: {
    width: toNumber(responsiveValue(110, 120, 130)),
    fontWeight: theme.fontWeight.semibold,
    minWidth: 100,
  } as any, // Mezcla de View y Text styles

  colEstado: {
    width: theme.tableColumns.medium,
    minWidth: toNumber(responsiveValue(110, 130, 140)),
  } as ViewStyle,

  colAcciones: {
    width: theme.tableColumns.xlarge,
    minWidth: toNumber(responsiveValue(150, 180, 220)),
  } as ViewStyle,

  // Botones de estado (chips) - responsive
  estadoButton: {
    minWidth: toNumber(responsiveValue(100, 110, 120)),
    paddingHorizontal: theme.spacing.sm,
  } as ViewStyle,

  estadoCompletado: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.chip.green.bg,
  },

  estadoProceso: {
    borderColor: theme.colors.warning,
    backgroundColor: theme.colors.chip.orange.bg,
  },

  estadoRecibido: {
    borderColor: theme.colors.info,
    backgroundColor: theme.colors.chip.blue.bg,
  },

  // Botones de acciones - responsive
  verButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonSecondary,
    marginRight: theme.spacing.sm,
    fontSize: theme.fontSize.base,
  } as TextStyle,

  editarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonPrimary,
    marginRight: theme.spacing.sm,
    fontSize: theme.fontSize.base,
  } as TextStyle,

  eliminarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonDanger,
    fontSize: theme.fontSize.base,
  } as TextStyle,

  overlayTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
  } as TextStyle,

  cerrarModal: {
    color: theme.colors.error,
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.xl,
  } as TextStyle,

  modalLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.md,
  } as TextStyle,

  modalInput: {
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderMedium,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    fontSize: theme.fontSize.base,
    height: theme.heights.input,
  },
});
