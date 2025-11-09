//layout.styles.ts
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

    header: {
        padding: 16,
        backgroundColor: "#007AFF",
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 16,
    },
});
