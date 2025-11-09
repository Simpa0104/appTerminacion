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
    modalHeader: baseStyles.modalHeader,
    modalTitle: baseStyles.modalTitle,
    modalSectionTitle: baseStyles.modalSectionTitle,
    modalBody: baseStyles.modalBody,
    modalActions: baseStyles.modalActions,
    card: baseStyles.card,

    // Tabla
    tableScrollContainer: {
        paddingBottom: 10,
    },

    // Columnas
    colReferencia: {
        width: 140,
    },

    colCliente: {
        width: 150,
    },

    colFecha: {
        width: 120,
    },

    colTipo: {
        width: 140,
    },

    colCantidad: {
        width: 100,
    },

    colTotal: {
        width: 130,
        fontWeight: "600",
    },

    colEstado: {
        width: 140,
    },

    colAcciones: {
        width: 150,
    },

    // Botones de estado
    estadoButton: {
        minWidth: 120,
    },

    estadoCompletado: {
        borderColor: "#4CAF50",
        backgroundColor: "#E8F5E9",
    },

    estadoProceso: {
        borderColor: "#FF9800",
        backgroundColor: "#FFF3E0",
    },

    verButton: {
        color: "#007AFF",
        fontWeight: "600",
        marginRight: 10,
    },

    eliminarButton: {
        color: "#FF3B30",
        fontWeight: "600",
    },
});