import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import { Card, Button, Menu } from "react-native-paper";
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

  // Escucha en tiempo real los lotes
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lotes"), (snapshot) => {
      const lotesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
      setLotes((prev) =>
        prev.map((lote) =>
          lote.id === id ? { ...lote, estado: nuevoEstado } : lote
        )
      );
    } catch (error) {
      console.error("Error actualizando el estado:", error);
    }
  };

  const lotesFiltrados = lotes.filter((lote) => {
    const term = search.toLowerCase();
    return (
      lote.cliente?.toLowerCase().includes(term) ||
      lote.referencia?.toLowerCase().includes(term) ||
      lote.tipoPrenda?.toLowerCase().includes(term) ||
      String(lote.total)?.includes(term)
    );
  });

  const forms = {
    lotes: { title: "Registro de lotes", component: <RegistroLotes /> },
    prendas: { title: "Registro de prendas", component: <RegistroPrendas /> },
    clientes: { title: "Registro de clientes", component: <Clientes /> },
  };

  return (
    <Layout title="Dashboard" scrollable>
      <View style={styles.container}>
        {/* Botones principales + buscador */}
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

        {/* 🧾 Tabla */}
        {loading ? (
          <Text>Cargando lotes...</Text>
        ) : lotesFiltrados.length === 0 ? (
          <Text>No se encontraron lotes.</Text>
        ) : (
          <ScrollView
            horizontal
            contentContainerStyle={{ width: "100%", paddingBottom: 10 }}
            showsHorizontalScrollIndicator={true}
          >
            <View>
              {/* Encabezado */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.headerText, { width: 280 }]}>Referencia</Text>
                <Text style={[styles.tableCell, styles.headerText, { width: 280 }]}>Fecha salida</Text>
                <Text style={[styles.tableCell, styles.headerText, { width: 280 }]}>Tipo prenda</Text>
                <Text style={[styles.tableCell, styles.headerText, { width: 280 }]}>Estado</Text>
                <Text style={[styles.tableCell, styles.headerText, { width: 280 }]}>Acción</Text>
              </View>

              {/* Filas */}
              {lotesFiltrados.map((lote) => (
                <View key={lote.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 280 }]}>{lote.referencia}</Text>
                  <Text style={[styles.tableCell, { width: 280 }]}>{lote.fechaSalida}</Text>
                  <Text style={[styles.tableCell, { width: 280 }]}>{lote.tipoPrenda}</Text>

                  {/* Menú de estado */}
                  <View style={[styles.tableCell, { width: 280 }]}>
                    <Menu
                      visible={menuVisible === lote.id}
                      onDismiss={() => setMenuVisible(null)}
                      anchor={
                        <Button
                          mode="outlined"
                          onPress={() =>
                            setMenuVisible(menuVisible === lote.id ? null : lote.id)
                          }
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

                  {/* Botón de detalles */}
                  <View style={[styles.tableCell, { width: 280 }]}>
                    <Button
                      mode="text"
                      onPress={() =>
                        navigation.navigate("LoteDetalles" as never, { lote } as never)
                      }
                    >
                      Ver detalles
                    </Button>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* 📋 Formulario dinámico */}
        {visibleForm && (
          <Card style={styles.card}>
            <Card.Title title={forms[visibleForm].title} />
            <Card.Content style={{ height: 400 }}>
              <ScrollView>{forms[visibleForm].component}</ScrollView>
            </Card.Content>
          </Card>
        )}
      </View>
    </Layout>
  );
}
