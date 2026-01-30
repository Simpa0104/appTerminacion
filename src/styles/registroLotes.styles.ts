// styles/registroLotes.styles.ts
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

    label: {
        fontSize: 15,
        color: "#333",
        fontWeight: "600",
        marginBottom: 6,
        marginTop: 14,
    },

    input: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        fontSize: 15,
    },

    dateButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
    },

    // Estilos para dropdown personalizado
    dropdownButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        height: 48,
    },

    dropdownDisabled: {
        backgroundColor: "#F5F5F5",
        opacity: 0.6,
    },

    dropdownButtonText: {
        fontSize: 15,
        color: "#333",
    },

    modalItem: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },

    modalItemText: {
        fontSize: 16,
        color: "#333",
    },

    // Texto de error
    errorText: {
        color: "#FF3B30",
        fontSize: 12,
        marginTop: 4,
    },

    // Info de prenda seleccionada
    prendaInfo: {
        backgroundColor: "#E8F5E9",
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
    },

    prendaInfoTitle: {
        fontWeight: "bold",
        marginBottom: 4,
        fontSize: 14,
        color: "#2E7D32",
    },

    prendaInfoText: {
        fontSize: 13,
        color: "#333",
        marginBottom: 2,
    },

    // Resumen del lote
    resumenContainer: {
        backgroundColor: "#E3F2FD",
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
    },

    resumenTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#1565C0",
    },

    resumenText: {
        fontSize: 14,
        marginBottom: 4,
        color: "#333",
    },

    resumenTotal: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1976D2",
        marginTop: 4,
    },

    submitButton: {
        marginTop: 25,
        marginBottom: 30,
        borderRadius: 14,
        backgroundColor: "#007bff",
        paddingVertical: 8,
    },

    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
});