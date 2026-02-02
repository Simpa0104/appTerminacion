// styles/layout.styles.responsive.ts
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

    header: {
        padding: theme.spacing.lg,
        backgroundColor: "#007AFF",
        paddingHorizontal: toNumber(responsiveValue(16, 24, 32)),
    } as ViewStyle,
    
    title: {
        color: "#fff",
        fontSize: theme.fontSize.xxl,
        fontWeight: "bold",
    } as TextStyle,
    
    content: {
        flex: 1,
        padding: theme.spacing.lg,
        maxWidth: toNumber(responsiveValue(undefined, 1200, 1400)),
        alignSelf: "center",
        width: "100%",
    } as ViewStyle,
});
