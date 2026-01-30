// styles/dashBoard.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "./theme";
import { baseStyles } from "./baseStyles";

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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },

  button: {
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },

  tableScrollContainer: {
    paddingBottom: theme.spacing.sm,
  },

  // Columnas específicas de esta tabla
  colReferencia: {
    width: theme.tableColumns.medium,
  },

  colCliente: {
    width: theme.tableColumns.large,
  },

  colFecha: {
    width: theme.tableColumns.small,
  },

  colTipo: {
    width: theme.tableColumns.medium,
  },

  colCantidad: {
    width: theme.tableColumns.narrow,
  },

  colTotal: {
    width: 130,
    fontWeight: theme.fontWeight.semibold,
  },

  colEstado: {
    width: theme.tableColumns.medium,
  },

  colAcciones: {
    width: theme.tableColumns.xlarge,
  },

  // Botones de estado (chips)
  estadoButton: {
    minWidth: 120,
  },

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

  // Botones de acciones
  verButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonSecondary,
    marginRight: theme.spacing.sm,
  },

  editarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonPrimary,
    marginRight: theme.spacing.sm,
  },

  eliminarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonDanger,
  },

  overlayTitle: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
  },

  cerrarModal: {
    color: theme.colors.error,
    fontWeight: theme.fontWeight.bold,
  },

  modalLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },

  modalInput: {
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderMedium,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    fontSize: theme.fontSize.base,
  },
});