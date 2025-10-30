import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, SafeAreaView } from "react-native";
import { Card, Button, Menu, Portal } from "react-native-paper";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import RegistroLotes from "./registroLotes";
import RegistroPrendas from "./registroPrendas";
import Clientes from "./clientes";
import styles from "../styles/dashBoard.styles";
import Layout from "../components/layout";
import { useNavigation } from "@react-navigation/native";


export default function Dashboard() {
  const [visibleForm, setVisibleForm] = useState<null | "lotes" | "prendas" | "clientes">(null);
  const [lotes, setLotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lotes"), (snapshot) => {
      const lotesData = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Filtrar solo lotes que NO estén completados
      const lotesFiltradosEstado = lotesData.filter(lote => lote.estado !== "Completado");
      // Ordenar por fecha de entrada (más reciente primero)
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

  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      await updateDoc(doc(db, "lotes", id), { estado: nuevoEstado });
      setLotes((prev) => prev.map((l) => (l.id === id ? { ...l, estado: nuevoEstado } : l)));
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
  };

  // Función para cerrar el formulario (se pasa a los componentes hijos)
  const handleCloseForm = () => {
    setVisibleForm(null);
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
        {/* Botones */}
        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={() => toggleForm("lotes")} style={styles.button}>
            {visibleForm === "lotes" ? "✕ Cerrar" : "Agregar Lote"}
          </Button>
          <Button mode="contained" onPress={() => toggleForm("prendas")} style={styles.button}>
            {visibleForm === "prendas" ? "✕ Cerrar" : "Agregar Prendas"}
          </Button>
          <Button mode="contained" onPress={() => toggleForm("clientes")} style={styles.button}>
            {visibleForm === "clientes" ? "✕ Cerrar" : "Agregar Clientes"}
          </Button>
        </View>

        {/* Barra de búsqueda debajo de los botones */}
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
              <Button
                mode="contained"
                onPress={() => toggleForm("lotes")}
                style={{ marginTop: 10 }}
              >
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
                <Text style={[styles.tableCell, styles.headerText, styles.colAccion]}>Acción</Text>
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
                    ${(lote.totalLote || 0).toLocaleString("es-CO")}
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
                            lote.estado === "Completado" && styles.estadoCompletado,
                            lote.estado === "En proceso" && styles.estadoProceso,
                          ]}
                        >
                          {lote.estado || "Recibido" && styles.estadoRecibido}
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

                  <View style={[styles.tableCell, styles.colAccion]}>
                    <Button
                      mode="text"
                      onPress={() => navigation.navigate("LoteDetalles" as never, { lote } as never)}
                      style={styles.verDetallesButton}
                    >
                      Ver detalles
                    </Button>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        <Portal>
          {visibleForm && (
            <View style={styles.overlay}>
              <Card style={styles.overlayCard}>
                <Card.Title
                  title={forms[visibleForm].title}
                  titleStyle={styles.overlayTitle}
                />
                <Card.Content style={styles.overlayContent}>
                  <ScrollView
                    showsVerticalScrollIndicator
                    contentContainerStyle={{ paddingBottom: 20 }}
                  >
                    {forms[visibleForm].component}
                  </ScrollView>
                </Card.Content>

                <Card.Actions style={{ justifyContent: "flex-end", padding: 16 }}>
                  <Button
                    onPress={() => setVisibleForm(null)}
                    mode="outlined"
                  >
                    Cerrar
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          )}
        </Portal>
      </SafeAreaView>
    </Layout>
  );
}