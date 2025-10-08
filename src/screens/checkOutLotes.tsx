import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import RegistroLotes from "./registroLotes";
import RegistroPrendas from "./registroPrendas";
import Clientes from "./clientes";
import styles from "../styles/checkOutLotes.styles";
import Layout from "../components/layout";

export default function CheckOutLotes() {
  const [visibleForm, setVisibleForm] = useState<null | "lotes" | "prendas" | "clientes">(null);

  const toggleForm = (formName: "lotes" | "prendas" | "clientes") => {
    setVisibleForm(visibleForm === formName ? null : formName)
  };

  const forms = {
    lotes: { title: "Registro de lotes", component: <RegistroLotes /> },
    prendas: { title: "Registro de prendas", component: <RegistroPrendas /> },
    clientes: { title: "Registro de clientes", component: <Clientes /> },
  };

  return (
    <Layout title="Inicio">
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={() => toggleForm("lotes")}
            style={styles.button}
          >
            {visibleForm === "lotes" ? "X" : "Agregar Lote"}
          </Button>

          <Button
            mode="contained"
            onPress={() => toggleForm("prendas")}
            style={styles.button}
          >
            {visibleForm === "prendas" ? "X" : "Agregar Prendas"}
          </Button>

          <Button
            mode="contained"
            onPress={() => toggleForm("clientes")}
            style={styles.button}
          >
            {visibleForm === "clientes" ? "X" : "Agregar Clientes"}
          </Button>
        </View>

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