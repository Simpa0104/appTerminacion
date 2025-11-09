// screens/historialPrendas.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { baseStyles } from "../styles/baseStyles";

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
  modalContentLarge: baseStyles.modalContentLarge,
  modalHeader: baseStyles.modalHeader,
  modalTitle: baseStyles.modalTitle,
  modalBody: baseStyles.modalBody,
  modalSectionTitle: baseStyles.modalSectionTitle,
  modalActions: baseStyles.modalActions,
  label: baseStyles.label,
  input: baseStyles.input,
  switchRow: baseStyles.switchRow,

  headerRow: {
    ...baseStyles.headerRow,
  },

  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
  },

  colTipo: {
    width: theme.tableColumns.medium,
  },

  colMarca: {
    width: 130,
  },

  colRef: {
    width: theme.tableColumns.large,
  },

  colBotones: {
    width: theme.tableColumns.narrow,
    textAlign: "center",
  },

  colProcesos: {
    width: theme.tableColumns.xxlarge,
  },

  colTotal: {
    width: 130,
  },

  colAcciones: {
    width: theme.tableColumns.small,
  },

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
  },

  totalText: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.success,
    fontSize: theme.fontSize.lg,
  },

  editarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonPrimary,
  },

  eliminarButton: {
    ...baseStyles.buttonText,
    ...baseStyles.buttonDanger,
  },

  cerrarModal: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },

  totalContainerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.table.header,
    padding: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xxl,
    borderWidth: theme.borderWidth.medium,
    borderColor: theme.colors.primary,
  },

  totalLabelModal: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
  },

  totalValueModal: {
    fontSize: theme.fontSize.display2,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },

  card: {
    ...baseStyles.card,
    marginTop: theme.spacing.lg,
  },

  buttonCenter: {
    alignSelf: "center",
    backgroundColor: theme.colors.primary,
  },
});