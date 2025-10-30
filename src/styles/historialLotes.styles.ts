import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f2f2f2",
    },

    searchBar: {
        width: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        height: 40,
        marginBottom: 16,
    },

    // Estadísticas
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        gap: 10,
    },

    statCard: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#007AFF",
        marginBottom: 4,
    },

    statLabel: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 10,
    },

    // Estados de carga
    loadingContainer: {
        padding: 40,
        alignItems: "center",
    },

    loadingText: {
        fontSize: 16,
        color: "#666",
    },

    emptyContainer: {
        padding: 40,
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        marginTop: 20,
    },

    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginVertical: 12,
    },

    // Tabla
    tableScrollContainer: {
        paddingBottom: 10,
    },

    tableContainer: {
        minWidth: 1100,
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#e9e9e9",
        paddingVertical: 12,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },

    tableRow: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#e6e6e6",
        paddingVertical: 16,
        alignItems: "center",
    },

    tableCell: {
        paddingHorizontal: 10,
        justifyContent: "center",
    },

    headerText: {
        fontWeight: "700",
        fontSize: 13,
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
        textAlign: "center",
    },

    colTotal: {
        width: 130,
        fontWeight: "bold",
        color: "#4CAF50",
        fontSize: 14,
    },

    colAcciones: {
        width: 140,
    },

    accionesRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
});