import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, TextInput, Modal, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Card, Button, Portal, Dialog } from "react-native-paper";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import useFetchCollection from "../hooks/useFetchCollection";
import RegistroPrendas from "./registroPrendas";
import styles from "../styles/historialPrendas.styles";
import Layout from "../components/layout";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HistorialPrendas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [search, setSearch] = useState("");
  const [prendaEditando, setPrendaEditando] = useState<any>(null);
  const [mostrarDialogoEliminar, setMostrarDialogoEliminar] = useState(false);
  const [prendaAEliminar, setPrendaAEliminar] = useState<any>(null);

  const { data: prendas, loading } = useFetchCollection("prendas");
  const scrollRef = useRef<ScrollView>(null);

  // Hacer scroll al inicio cuando se abre el modal de edición
  useEffect(() => {
    if (prendaEditando && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }, 300);
    }
  }, [prendaEditando]);

  // Filtrar prendas
  const term = search.trim().toLowerCase();
  const prendasFiltradas = prendas.filter((prenda) => {
    if (!term) return true;
    return (
      String(prenda.tipoPrenda || "").toLowerCase().includes(term) ||
      String(prenda.marca || "").toLowerCase().includes(term) ||
      String(prenda.referencia || "").toLowerCase().includes(term)
    );
  });

  // Función para editar prenda
  const iniciarEdicion = (prenda: any) => {
    setPrendaEditando(prenda);
  };

  const guardarEdicion = async () => {
    if (!prendaEditando) return;

    try {
      const { id, ...datos } = prendaEditando;
      await updateDoc(doc(db, "prendas", id), datos);
      setPrendaEditando(null);
    } catch (error) {
      console.error("Error actualizando prenda:", error);
    }
  };

  // Función para eliminar prenda
  const confirmarEliminacion = (prenda: any) => {
    setPrendaAEliminar(prenda);
    setMostrarDialogoEliminar(true);
  };

  const eliminarPrenda = async () => {
    if (!prendaAEliminar) return;

    try {
      await deleteDoc(doc(db, "prendas", prendaAEliminar.id));
      setMostrarDialogoEliminar(false);
      setPrendaAEliminar(null);
    } catch (error) {
      console.error("Error eliminando prenda:", error);
    }
  };

  return (
    <Layout title="Historial de Prendas" scrollable>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.headerRow}>
          <Button
            mode="contained"
            onPress={() => setMostrarFormulario(!mostrarFormulario)}
            style={styles.addButton}
          >
            {mostrarFormulario ? "Cerrar" : "Agregar prenda"}
          </Button>

          <TextInput
            style={styles.searchBar}
            placeholder="Buscar por tipo, marca o referencia..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{prendas.length}</Text>
            <Text style={styles.statLabel}>Total Prendas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {new Set(prendas.map((p) => p.tipoPrenda)).size}
            </Text>
            <Text style={styles.statLabel}>Tipos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {new Set(prendas.map((p) => p.marca)).size}
            </Text>
            <Text style={styles.statLabel}>Marcas</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Prendas registradas</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando prendas...</Text>
          </View>
        ) : prendasFiltradas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="hanger" size={64} color="#999" />
            <Text style={styles.emptyText}>
              {search ? "No se encontraron prendas" : "No hay prendas registradas"}
            </Text>
            {!search && (
              <Button
                mode="contained"
                onPress={() => setMostrarFormulario(true)}
                style={{ marginTop: 10 }}
              >
                Crear primera prenda
              </Button>
            )}
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View style={styles.tableContainer}>
              {/* Encabezado */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.headerText, styles.colTipo]}>Tipo</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colMarca]}>Marca</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colRef]}>Referencia</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colBotones]}>Botones</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colProcesos]}>Procesos</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colTotal]}>Total</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colAcciones]}>Acciones</Text>
              </View>

              {/* Filas */}
              {prendasFiltradas.map((prenda) => (
                <View key={prenda.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colTipo]}>{prenda.tipoPrenda}</Text>
                  <Text style={[styles.tableCell, styles.colMarca]}>{prenda.marca}</Text>
                  <Text style={[styles.tableCell, styles.colRef]}>{prenda.referencia}</Text>
                  <Text style={[styles.tableCell, styles.colBotones]}>
                    {prenda.cantidadBotones || 0}
                  </Text>
                  <View style={[styles.tableCell, styles.colProcesos]}>
                    <View style={styles.procesosContainer}>
                      {prenda.pulir && <Text style={styles.procesoChip}>Pulir</Text>}
                      {prenda.planchar && <Text style={styles.procesoChip}>Planchar</Text>}
                      {prenda.etiquetar && <Text style={styles.procesoChip}>Etiquetar</Text>}
                      {prenda.placa && <Text style={styles.procesoChip}>Placa</Text>}
                      {prenda.doblar && <Text style={styles.procesoChip}>Doblar</Text>}
                      {prenda.empacar && <Text style={styles.procesoChip}>Empacar</Text>}
                    </View>
                  </View>
                  <Text style={[styles.tableCell, styles.colTotal, styles.totalText]}>
                    ${(prenda.precioTotal || 0).toLocaleString("es-CO")}
                  </Text>

                  {/* ✅ Reemplazo de íconos por texto */}
                  <View style={[styles.tableCell, styles.colAcciones]}>
                    <View style={styles.accionesRow}>
                      <TouchableOpacity onPress={() => iniciarEdicion(prenda)}>
                        <Text style={{ color: "#007AFF", marginRight: 10 }}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => confirmarEliminacion(prenda)}>
                        <Text style={{ color: "#FF3B30" }}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Modal de agregar */}
        <Portal>
          {mostrarFormulario && (
            <View style={styles.overlay}>
              <Card style={styles.overlayCard}>
                <Card.Title title="Registro de prendas" />
                <Card.Content style={styles.overlayContent}>
                  <ScrollView showsVerticalScrollIndicator>
                    <RegistroPrendas onSuccess={() => setMostrarFormulario(false)} />
                  </ScrollView>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "flex-end" }}>
                  <Button onPress={() => setMostrarFormulario(false)}>Cerrar</Button>
                </Card.Actions>
              </Card>
            </View>
          )}
        </Portal>

        {/* Modal de edición */}
        
        <Modal
          visible={!!prendaEditando}
          transparent
          animationType="slide"
          onRequestClose={() => setPrendaEditando(null)}
        >
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, width: "100%" }}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Editar Prenda</Text>
                  <TouchableOpacity onPress={() => setPrendaEditando(null)}>
                    <Text style={{ color: "#FF3B30", fontWeight: "bold" }}>Cerrar</Text>
                  </TouchableOpacity>
                </View>

                {/* 🔹 ScrollView para todo el formulario */}
                <ScrollView
                  ref={scrollRef}
                  style={styles.modalBody}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {prendaEditando && (
                    <>
                      <Text style={styles.label}>Tipo de prenda</Text>
                      <TextInput
                        style={styles.input}
                        value={prendaEditando.tipoPrenda}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, tipoPrenda: text })
                        }
                      />

                      <Text style={styles.label}>Marca</Text>
                      <TextInput
                        style={styles.input}
                        value={prendaEditando.marca}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, marca: text })
                        }
                      />

                      <Text style={styles.label}>Referencia</Text>
                      <TextInput
                        style={styles.input}
                        value={prendaEditando.referencia}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, referencia: text })
                        }
                      />

                      <Text style={styles.label}>Cantidad de botones</Text>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(prendaEditando.cantidadBotones || 0)}
                        onChangeText={(text) =>
                          setPrendaEditando({
                            ...prendaEditando,
                            cantidadBotones: parseInt(text) || 0,
                          })
                        }
                      />

                      {/* Aquí puedes seguir añadiendo más campos si los deseas editar */}
                    </>
                  )}
                </ScrollView>

                <View style={styles.modalActions}>
                  <Button mode="outlined" onPress={() => setPrendaEditando(null)}>
                    Cancelar
                  </Button>
                  <Button mode="contained" onPress={guardarEdicion}>
                    Guardar
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        {/* Diálogo eliminar */}
        <Portal>
          <Dialog
            visible={mostrarDialogoEliminar}
            onDismiss={() => setMostrarDialogoEliminar(false)}
          >
            <Dialog.Title>Confirmar eliminación</Dialog.Title>
            <Dialog.Content>
              <Text>
                ¿Estás seguro de eliminar la prenda{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {prendaAEliminar?.referencia}
                </Text>
                ?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setMostrarDialogoEliminar(false)}>Cancelar</Button>
              <Button onPress={eliminarPrenda} textColor="#FF3B30">
                Eliminar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Layout>
  );
}