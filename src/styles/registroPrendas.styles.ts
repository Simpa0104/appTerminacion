// styles/registroPrendas.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "./theme";
import { baseStyles } from "./baseStyles";

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

  // Estilos personalizados de registro de prendas
  sectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginVertical: theme.spacing.lg,
    marginTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: theme.borderWidth.medium,
    borderBottomColor: theme.colors.primary,
  },

  modalSectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: theme.borderWidth.medium,
    borderBottomColor: theme.colors.primary,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111827",
  },

  optionBlock: {
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  // Procesos personalizados
  customProcessCard: {
    backgroundColor: "#F0F9FF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginBottom: 16,
  },

  customProcessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  customProcessTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.primary,
  },

  deleteButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },

  addProcessButton: {
    marginTop: 8,
    marginBottom: 16,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },

  totalContainer: {
    marginVertical: 20,
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E3A8A",
  },

  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E40AF",
    marginTop: 4,
  },

  submitButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "#DC2626",
    fontSize: 12,
    marginBottom: 8,
  },
});