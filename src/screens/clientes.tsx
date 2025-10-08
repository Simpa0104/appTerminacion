import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../styles/clientes.styles";

const validacionSquema = Yup.object().shape({
  nombreCliente: Yup.string().required("Requerido"),
  empresa: Yup.string().required("Requerido"),
  celular: Yup.number().required("Requerido"),
});

export default function Clientes() {
  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          nombreCliente: "",
          empresa: "",
          celular: "",
        }}
        validacionSquema={validacionSquema}
        onSubmit={(values) => {
          alert("Formulario enviado");
          alert("Datos del formulario:\n" + JSON.stringify(values, null, 2));
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
    </ScrollView>
  );
}