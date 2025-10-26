// src/screens/dashBoard.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, SafeAreaView } from "react-native";
import { Card, Button, Menu, Portal } from "react-native-paper";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import RegistroLotes from "./registroLotes";
import RegistroPrendas from "./registroPrendas";
import Clientes from "./clientes";
import styles from "../styles/checkOutLotes.styles";
import Layout from "../components/layout";
import { useNavigation } from "@react-navigation/native";

export default function CheckOutLotes() {
  const [visibleForm, setVisibleForm] = useState<null | "lotes" | "prendas" | "clientes">(null);
  const [lotes, setLotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lotes"), (snapshot) => {
      const lotesData = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setLotes(lotesData);
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

  const term = search.trim().toLowerCase();
  const lotesFiltrados = lotes.filter((lote) => {
    if (!term) return true;
    return (
      String(lote.cliente || "").toLowerCase().includes(term) ||
      String(lote.referencia || "").toLowerCase().includes(term) ||
      String(lote.tipoPrenda || "").toLowerCase().includes(term) ||
      String(lote.total || "").includes(term)
    );
  });

  const forms: Record<string, { title: string; component: React.ReactNode }> = {
    lotes: { title: "Registro de lotes", component: <RegistroLotes /> },
    prendas: { title: "Registro de prendas", component: <RegistroPrendas /> },
    clientes: { title: "Registro de clientes", component: <Clientes /> },
  };

  return (
    <Layout title="Dashboard" scrollable>
      <SafeAreaView style={styles.container}>
        {/* header row: botones + search */}
        <View style={styles.headerRow}>
          <View style={styles.buttonRow}>
            <Button mode="contained" onPress={() => toggleForm("lotes")} style={styles.button}>
              {visibleForm === "lotes" ? "X" : "Agregar Lote"}
            </Button>
            <Button mode="contained" onPress={() => toggleForm("prendas")} style={styles.button}>
              {visibleForm === "prendas" ? "X" : "Agregar Prendas"}
            </Button>
            <Button mode="contained" onPress={() => toggleForm("clientes")} style={styles.button}>
              {visibleForm === "clientes" ? "X" : "Agregar Clientes"}
            </Button>
          </View>

          <TextInput
            style={styles.searchBar}
            placeholder="Buscar por cliente, referencia, tipo o cantidad..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.sectionTitle}>Lotes registrados</Text>

        {loading ? (
          <Text>Cargando lotes...</Text>
        ) : lotesFiltrados.length === 0 ? (
          <Text>No se encontraron lotes.</Text>
        ) : (
          // El ScrollView horizontal permite si la tabla necesita más ancho
          <ScrollView horizontal contentContainerStyle={styles.tableScrollContainer} showsHorizontalScrollIndicator>
            <View style={styles.tableContainer}>
              {/* encabezado */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.headerText, styles.colReferencia]}>Referencia</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colFecha]}>Fecha salida</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colTipo]}>Tipo prenda</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colEstado]}>Estado</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colAccion]}>Acción</Text>
              </View>

              {/* filas */}
              {lotesFiltrados.map((lote) => (
                <View key={lote.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colReferencia]}>{lote.referencia}</Text>
                  <Text style={[styles.tableCell, styles.colFecha]}>{lote.fechaSalida}</Text>
                  <Text style={[styles.tableCell, styles.colTipo]}>{lote.tipoPrenda}</Text>

                  <View style={[styles.tableCell, styles.colEstado]}>
                    <Menu
                      visible={menuVisible === lote.id}
                      onDismiss={() => setMenuVisible(null)}
                      anchor={
                        <Button
                          mode="outlined"
                          onPress={() => setMenuVisible(menuVisible === lote.id ? null : lote.id)}
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

                  <View style={[styles.tableCell, styles.colAccion]}>
                    <Button
                      mode="text"
                      onPress={() => navigation.navigate("LoteDetalles" as never, { lote } as never)}
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
                <Card.Title title={forms[visibleForm].title} />
                <Card.Content style={styles.overlayContent}>
                  <ScrollView
                    showsVerticalScrollIndicator
                    contentContainerStyle={{ paddingBottom: 20 }}
                  >
                    {forms[visibleForm].component}
                  </ScrollView>
                </Card.Content>

                <Card.Actions style={{ justifyContent: "flex-end" }}>
                  <Button onPress={() => setVisibleForm(null)}>Cerrar</Button>
                </Card.Actions>
              </Card>
            </View>
          )}
        </Portal>
      </SafeAreaView>
    </Layout>
  );
}
