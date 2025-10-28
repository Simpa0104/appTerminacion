import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
        paddingHorizontal: 20,
        paddingTop: 25,
    },

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

    // Estilos para el modal del dropdown
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },

    modalContent: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "70%",
        paddingBottom: 20,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
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

    // Título de sección
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
        marginTop: 20,
        marginBottom: 10,
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