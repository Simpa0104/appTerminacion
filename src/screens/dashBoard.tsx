// src/screens/dashBoard.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Menu, Portal, Dialog } from "react-native-paper";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import RegistroLotes from "./registroLotes";
import RegistroPrendas from "./registroPrendas";
import Clientes from "./clientes";
import styles from "../styles/dashboard.styles.responsive";
import Layout from "../components/layout";
import { useNavigation } from "@react-navigation/native";
import { Lote } from "../types/lote";
import WhatsAppService from "../services/whatsappService";

export default function Dashboard() {
  const [visibleForm, setVisibleForm] = useState<null | "lotes" | "prendas" | "clientes">(null);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loteEditando, setLoteEditando] = useState<Lote | null>(null);
  const [dialogoEliminar, setDialogoEliminar] = useState(false);
  const [loteAEliminar, setLoteAEliminar] = useState<Lote | null>(null);
  const navigation = useNavigation();
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lotes"), (snapshot) => {
      const lotesData = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Lote));
      const lotesFiltradosEstado = lotesData.filter(lote => lote.estado !== "Completado");
      lotesFiltradosEstado.sort((a, b) => {
        const dateA = new Date(a.fechaEntrada || 0);
        const dateB = new Date(b.fechaEntrada || 0);
        return dateB.getTime() - dateA.getTime();
      });
      setLotes(lotesFiltradosEstado);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleForm = (formName: "lotes" | "prendas" | "clientes") => {
    setVisibleForm(visibleForm === formName ? null : formName);
  };

  // En dashBoard.tsx
  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      const loteActual = lotes.find((l) => l.id === id);

      await updateDoc(doc(db, "lotes", id), { estado: nuevoEstado });
      setLotes((prev) => prev.map((l) => (l.id === id ? { ...l, estado: nuevoEstado } : l)));

      if (nuevoEstado === "Completado" && loteActual) {
        console.log("Enviando notificación de WhatsApp...");
        await WhatsAppService.notifyLoteCompletado(loteActual);
      }
    } catch (err) {
      // console.error("Error actualizando estado:", err);
    }
  };

  const handleCloseForm = () => {
    setVisibleForm(null);
  };

  const iniciarEdicion = (lote: Lote) => {
    setLoteEditando(lote);
  };

  const guardarEdicion = async () => {
    if (!loteEditando) return;

    try {
      const { id, ...datos } = loteEditando;
      await updateDoc(doc(db, "lotes", id), datos);
      setLotes((prev) => prev.map((l) => (l.id === id ? loteEditando : l)));
      setLoteEditando(null);
    } catch (error) {
      console.error("Error actualizando lote:", error);
    }
  };

  const confirmarEliminacion = (lote: Lote) => {
    setLoteAEliminar(lote);
    setDialogoEliminar(true);
  };

  const eliminarLote = async () => {
    if (!loteAEliminar) return;

    try {
      await deleteDoc(doc(db, "lotes", loteAEliminar.id));
      setLotes((prev) => prev.filter(l => l.id !== loteAEliminar.id));
      setDialogoEliminar(false);
      setLoteAEliminar(null);
    } catch (error) {
      console.error("Error eliminando lote:", error);
    }
  };

  const term = search.trim().toLowerCase();
  const lotesFiltrados = lotes.filter((lote) => {
    if (!term) return true;
    return (
      String(lote.cliente || "").toLowerCase().includes(term) ||
      String(lote.referenciaLote || "").toLowerCase().includes(term) ||
      String(lote.referenciaPrenda || "").toLowerCase().includes(term) ||
      String(lote.tipoPrenda || "").toLowerCase().includes(term) ||
      String(lote.totalPrendas || "").includes(term)
    );
  });

  const forms: Record<string, { title: string; component: React.ReactNode }> = {
    lotes: {
      title: "Registro de lotes",
      component: <RegistroLotes onSuccess={handleCloseForm} />
    },
    prendas: {
      title: "Registro de prendas",
      component: <RegistroPrendas onSuccess={handleCloseForm} />
    },
    clientes: {
      title: "Registro de clientes",
      component: <Clientes onSuccess={handleCloseForm} />
    },
  };

  return (
    <Layout title="Dashboard" scrollable>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={() => toggleForm("lotes")} style={styles.button}>
            {visibleForm === "lotes" ? "Cerrar" : "Agregar Lote"}
          </Button>
          <Button mode="contained" onPress={() => toggleForm("prendas")} style={styles.button}>
            {visibleForm === "prendas" ? "Cerrar" : "Agregar Prendas"}
          </Button>
          <Button mode="contained" onPress={() => toggleForm("clientes")} style={styles.button}>
            {visibleForm === "clientes" ? "Cerrar" : "Agregar Clientes"}
          </Button>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Buscar por cliente, referencia, tipo o cantidad..."
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{lotes.length}</Text>
            <Text style={styles.statLabel}>Total Lotes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {lotes.filter(l => l.estado === "Recibido").length}
            </Text>
            <Text style={styles.statLabel}>Recibidos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {lotes.filter(l => l.estado === "En proceso").length}
            </Text>
            <Text style={styles.statLabel}>En Proceso</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Lotes registrados</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando lotes...</Text>
          </View>
        ) : lotesFiltrados.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {search ? "No se encontraron lotes con ese criterio" : "No hay lotes registrados"}
            </Text>
            {!search && (
              <Button mode="contained" onPress={() => toggleForm("lotes")} style={{ marginTop: 10 }}>
                Crear primer lote
              </Button>
            )}
          </View>
        ) : (
          <ScrollView horizontal contentContainerStyle={styles.tableScrollContainer} showsHorizontalScrollIndicator>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.headerText, styles.colReferencia]}>Ref. Lote</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colCliente]}>Cliente</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colFecha]}>Fecha Salida</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colTipo]}>Tipo Prenda</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colCantidad]}>Cantidad</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colTotal]}>Total</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colEstado]}>Estado</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colAcciones]}>Acciones</Text>
              </View>

              {lotesFiltrados.map((lote) => (
                <View key={lote.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colReferencia]}>
                    {lote.referenciaLote || "Sin ref."}
                  </Text>
                  <Text style={[styles.tableCell, styles.colCliente]}>
                    {lote.cliente || "Sin cliente"}
                  </Text>
                  <Text style={[styles.tableCell, styles.colFecha]}>
                    {lote.fechaSalida || "Sin fecha"}
                  </Text>
                  <Text style={[styles.tableCell, styles.colTipo]}>
                    {lote.tipoPrenda || "Sin tipo"}
                  </Text>
                  <Text style={[styles.tableCell, styles.colCantidad]}>
                    {lote.totalPrendas || 0}
                  </Text>
                  <Text style={[styles.tableCell, styles.colTotal]}>
                    ${(Number(lote.totalLote) || 0).toLocaleString("es-CO")}
                  </Text>

                  <View style={[styles.tableCell, styles.colEstado]}>
                    <Menu
                      visible={menuVisible === lote.id}
                      onDismiss={() => setMenuVisible(null)}
                      anchor={
                        <Button
                          mode="outlined"
                          onPress={() => setMenuVisible(menuVisible === lote.id ? null : lote.id)}
                          style={[
                            styles.estadoButton,
                            lote.estado === "En proceso" && styles.estadoProceso,
                          ]}
                        >
                          {lote.estado || "Recibido"}
                        </Button>
                      }
                    >
                      {["Recibido", "En proceso", "Completado"].map((estado) => (
                        <Menu.Item
                          key={estado}
                          onPress={() => {
                            actualizarEstado(lote.id, estado);
                            setMenuVisible(null);
                          }}
                          title={estado}
                        />
                      ))}
                    </Menu>
                  </View>

                  <View style={[styles.tableCell, styles.colAcciones]}>
                    <View style={styles.accionesRow}>
                      <TouchableOpacity onPress={() => (navigation as any).navigate("LoteDetalles", { lote })}>
                        <Text style={styles.verButton}>Ver</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => iniciarEdicion(lote)}>
                        <Text style={styles.editarButton}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => confirmarEliminacion(lote)}>
                        <Text style={styles.eliminarButton}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Modal para agregar */}
        <Portal>
          {visibleForm && (
            <View style={styles.overlay}>
              <Card style={styles.overlayCard}>
                <Card.Title title={forms[visibleForm].title} titleStyle={styles.overlayTitle} />
                <Card.Content style={styles.overlayContent}>
                  <ScrollView showsVerticalScrollIndicator contentContainerStyle={{ paddingBottom: 20 }}>
                    {forms[visibleForm].component}
                  </ScrollView>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "flex-end", padding: 16 }}>
                  <Button onPress={() => setVisibleForm(null)} mode="outlined">
                    Cerrar
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          )}
        </Portal>

        {/* Modal de edición completo */}
        <Modal
          visible={!!loteEditando}
          transparent
          animationType="slide"
          onRequestClose={() => setLoteEditando(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Editar Lote</Text>
                <TouchableOpacity onPress={() => setLoteEditando(null)}>
                  <Text style={styles.cerrarModal}>Cerrar</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator>
                {loteEditando && (
                  <>
                    {/* FECHAS */}
                    <Text style={styles.modalSectionTitle}>Fechas</Text>

                    <Text style={styles.modalLabel}>Fecha de entrada</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={loteEditando.fechaEntrada}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, fechaEntrada: text })
                      }
                      placeholder="YYYY-MM-DD"
                    />

                    <Text style={styles.modalLabel}>Fecha de salida</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={loteEditando.fechaSalida}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, fechaSalida: text })
                      }
                      placeholder="YYYY-MM-DD"
                    />

                    {/* INFORMACIÓN GENERAL */}
                    <Text style={styles.modalSectionTitle}>Informacion General</Text>

                    <Text style={styles.modalLabel}>Referencia del lote</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={loteEditando.referenciaLote}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, referenciaLote: text })
                      }
                    />

                    <Text style={styles.modalLabel}>Cliente</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={loteEditando.cliente}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, cliente: text })
                      }
                    />

                    <Text style={styles.modalLabel}>Tipo de prenda</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={loteEditando.tipoPrenda}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, tipoPrenda: text })
                      }
                    />

                    <Text style={styles.modalLabel}>Referencia de prenda</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={loteEditando.referenciaPrenda}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, referenciaPrenda: text })
                      }
                    />

                    <Text style={styles.modalLabel}>Colores</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.colores || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, colores: text })
                      }
                      keyboardType="numeric"
                    />

                    {/* TALLAS */}
                    <Text style={styles.modalSectionTitle}>Cantidades por Talla</Text>

                    <Text style={styles.modalLabel}>XS</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.xs || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, xs: text })
                      }
                      keyboardType="numeric"
                    />

                    <Text style={styles.modalLabel}>S</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.s || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, s: text })
                      }
                      keyboardType="numeric"
                    />

                    <Text style={styles.modalLabel}>M</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.m || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, m: text })
                      }
                      keyboardType="numeric"
                    />

                    <Text style={styles.modalLabel}>L</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.l || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, l: text })
                      }
                      keyboardType="numeric"
                    />

                    <Text style={styles.modalLabel}>XL</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.xl || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, xl: text })
                      }
                      keyboardType="numeric"
                    />

                    {/* TOTALES */}
                    <Text style={styles.modalSectionTitle}>Totales</Text>

                    <Text style={styles.modalLabel}>Total de prendas</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.totalPrendas || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, totalPrendas: text })
                      }
                      keyboardType="numeric"
                    />

                    <Text style={styles.modalLabel}>Total del lote (COP)</Text>
                    <TextInput
                      style={styles.modalInput}
                      value={String(loteEditando.totalLote || "")}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, totalLote: text })
                      }
                      keyboardType="numeric"
                    />

                    {/* INSUMOS */}
                    <Text style={styles.modalSectionTitle}>Insumos</Text>

                    <Text style={styles.modalLabel}>Insumos (opcional)</Text>
                    <TextInput
                      style={[styles.modalInput, { height: 80 }]}
                      value={loteEditando.insumos}
                      onChangeText={(text) =>
                        setLoteEditando({ ...loteEditando, insumos: text })
                      }
                      multiline
                      placeholder="Botones, hilos, etiquetas..."
                    />
                  </>
                )}
              </ScrollView>

              <View style={styles.modalActions}>
                <Button mode="outlined" onPress={() => setLoteEditando(null)}>
                  Cancelar
                </Button>
                <Button mode="contained" onPress={guardarEdicion}>
                  Guardar Cambios
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Diálogo de eliminación */}
        <Portal>
          <Dialog visible={dialogoEliminar} onDismiss={() => setDialogoEliminar(false)}>
            <Dialog.Title>Confirmar eliminacion</Dialog.Title>
            <Dialog.Content>
              <Text>
                Estas seguro de eliminar el lote{" "}
                <Text style={{ fontWeight: "bold" }}>{loteAEliminar?.referenciaLote}</Text>?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogoEliminar(false)}>Cancelar</Button>
              <Button onPress={eliminarLote} textColor="#FF3B30">
                Eliminar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </Layout>
  );
}