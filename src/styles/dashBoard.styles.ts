import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  button: {
    marginRight: 8,
    backgroundColor: "#007AFF",
  },

  // barra de búsqueda
  searchBar: {
    margin: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
  },

  // Tarjetas de estadísticas
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

  // Estados de carga y vacío
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
  },

  // Tabla
  tableScrollContainer: {
    paddingBottom: 10,
  },

  tableContainer: {
    minWidth: 1200,
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
    paddingVertical: 18,
    alignItems: "center",
  },

  tableCell: {
    paddingHorizontal: 10,
    textAlign: "center",
    justifyContent: "center",
  },

  headerText: {
    fontWeight: "700",
    fontSize: 13,
  },

  // Columnas (anchos ajustados)
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

  colAccion: {
    width: 130,
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

  estadoRecibido: {
    borderColor: "#FF5722",
    backgroundColor: "#FFF3E0",
  },

  verDetallesButton: {
    paddingVertical: 4,
  },

  // Overlay (modal) - MEJORADO
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  overlayCard: {
    width: "90%",
    maxWidth: 800,
    maxHeight: "85%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  overlayContent: {
    maxHeight: 550,
  },

  card: {
    marginTop: 20,
    padding: 10,
  },
});