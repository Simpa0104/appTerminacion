import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/clientes.styles";
import { KeyboardAvoidingView } from "react-native";
import useFetchCollection from "../hooks/useFetchCollection";

const validationSchema = Yup.object().shape({
  nombreCliente: Yup.string().required("Requerido"),
  empresa: Yup.string().required("Requerido"),
  celular: Yup.number().required("Requerido"),
});

export default function Clientes() {

  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator>
        <Formik
          initialValues={{
            nombreCliente: "",
            empresa: "",
            celular: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await addDoc(collection(db, "clientes"), values);
              setMensaje("Cliente guardado correctamente");
            } catch (error) {
              console.error("Error guardando cliente:", error);
              setMensaje("Error al guardar cliente");
            } finally {
              setVisible(true);
              resetForm();
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Text style={styles.label}>Nombre Cliente</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del Cliente"
                value={values.nombreCliente}
                onChangeText={handleChange("nombreCliente")}
                onBlur={handleBlur("nombreCliente")}
              />
              {touched.nombreCliente && errors.nombreCliente && (
                <Text style={styles.error}>{errors.nombreCliente}</Text>
              )}

              <Text style={styles.label}>Empresa</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de la empresa del cliente"
                value={values.empresa}
                onChangeText={handleChange("empresa")}
                onBlur={handleBlur("empresa")}
              />
              {touched.empresa && errors.empresa && (
                <Text style={styles.error}>{errors.empresa}</Text>
              )}

              <Text style={styles.label}>Celular del Cliente</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Celular del cliente"
                value={values.celular}
                onChangeText={handleChange("celular")}
                onBlur={handleBlur("celular")}
              />
              {touched.celular && errors.celular && (
                <Text style={styles.error}>{errors.celular}</Text>
              )}

              <Button
                mode="contained"
                style={styles.submitButton}
                onPress={handleSubmit as any}
              >
                Guardar Cliente
              </Button>
            </View>
          )}
        </Formik>

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
          action={{
            label: "Cerrar",
            onPress: () => setVisible(false)
          }}
        >
          {mensaje}
        </Snackbar>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}