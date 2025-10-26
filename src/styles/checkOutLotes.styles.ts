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

  searchBar: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 40,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
  },

  // contenedor general de tabla (para horizontal scroll)
  tableScrollContainer: {
    // si quieres que ocupe todo el ancho posible
    paddingBottom: 10,
  },

  tableContainer: {
    minWidth: 900, // si quieres forzar ancho mínimo para que no se corte; ajusta según columnas
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
  },

  headerText: {
    fontWeight: "700",
  },

  // columnas (anchos)
  colReferencia: {
    width: 220,
  },
  colFecha: {
    width: 200,
  },
  colTipo: {
    width: 220,
  },
  colEstado: {
    width: 220,
  },
  colAccion: {
    width: 140,
  },

  // overlay (se usa Portal) — sobre la tabla
  overlay: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },

  overlayCard: {
    width: "100%",
    maxHeight: "85%",
    borderRadius: 12,
    overflow: "hidden",
  },

  overlayContent: {
    flexGrow: 1,
    paddingVertical: 8,
    maxHeight: 500,
  },

  card: {
    marginTop: 20,
    padding: 10,
  },
});
