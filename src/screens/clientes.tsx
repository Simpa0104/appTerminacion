// src/screens/clientes.tsx
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/clientes.styles";
import { KeyboardAvoidingView, Platform } from "react-native";


const validationSchema = Yup.object().shape({
  nombreCliente: Yup.string().required("Requerido"),
  empresa: Yup.string().required("Requerido"),
  celular: Yup.string().required("Requerido"),
  nit: Yup.string().required("Requerido"),
  direccionEmpresa: Yup.string().required("Requerido"),
  ciudadEmpresa: Yup.string().required("Requerido"),
});

interface ClientesProps {
  onSuccess?: () => void;
}

export default function Clientes({ onSuccess }: ClientesProps) {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Registro de Clientes</Text>

        <Formik
          initialValues={{
            nombreCliente: "",
            empresa: "",
            celular: "",
            nit: "",
            direccionEmpresa: "",
            ciudadEmpresa: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await addDoc(collection(db, "clientes"), values);
              setMensaje("Cliente guardado correctamente");
              resetForm();
            } catch (error) {
              console.error("Error guardando cliente:", error);
              setMensaje("Error al guardar cliente");
            } finally {
              setVisible(true);

              // Cerrar el modal después de 1.5 segundos
              setTimeout(() => {
                if (onSuccess) {
                  onSuccess();
                }
              }, 1500);
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
              <Text style={styles.label}>Nombre del Cliente</Text>
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
                placeholder="Nombre de la empresa"
                value={values.empresa}
                onChangeText={handleChange("empresa")}
                onBlur={handleBlur("empresa")}
              />
              {touched.empresa && errors.empresa && (
                <Text style={styles.error}>{errors.empresa}</Text>
              )}

              <Text style={styles.label}>Celular</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="3001234567"
                value={values.celular}
                onChangeText={handleChange("celular")}
                onBlur={handleBlur("celular")}
              />
              {touched.celular && errors.celular && (
                <Text style={styles.error}>{errors.celular}</Text>
              )}

              <Text style={styles.label}>NIT</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="900123456-7"
                value={values.nit}
                onChangeText={handleChange("nit")}
                onBlur={handleBlur("nit")}
              />
              {touched.nit && errors.nit && (
                <Text style={styles.error}>{errors.nit}</Text>
              )}

              <Text style={styles.label}>Dirección de la empresa</Text>
              <TextInput
                style={styles.input}
                placeholder="Calle 123 #45-67"
                value={values.direccionEmpresa}
                onChangeText={handleChange("direccionEmpresa")}
                onBlur={handleBlur("direccionEmpresa")}
              />
              {touched.direccionEmpresa && errors.direccionEmpresa && (
                <Text style={styles.error}>{errors.direccionEmpresa}</Text>
              )}

              <Text style={styles.label}>Ciudad</Text>
              <TextInput
                style={styles.input}
                placeholder="Medellín"
                value={values.ciudadEmpresa}
                onChangeText={handleChange("ciudadEmpresa")}
                onBlur={handleBlur("ciudadEmpresa")}
              />
              {touched.ciudadEmpresa && errors.ciudadEmpresa && (
                <Text style={styles.error}>{errors.ciudadEmpresa}</Text>
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