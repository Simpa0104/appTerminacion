import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/registroLotes.styles";

const validationSchema = Yup.object().shape({
  fechaEntrada: Yup.string().required("Requerido"),
  fechaSalida: Yup.string().required("Requerido"),
  cliente: Yup.string().required("Requerido"),
  colores: Yup.number().required("Requerido"),
  tipoPrenda: Yup.string().required("Requerido"),
  referencia: Yup.string().required("Requerido"),
  implementos: Yup.string(),
  xs: Yup.number(),
  s: Yup.number(),
  m: Yup.number(),
  l: Yup.number(),
  xl: Yup.number(),
  total: Yup.number().required("Requerido"),
});

export default function RegistroLotes() {

  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          fechaEntrada: "",
          fechaSalida: "",
          cliente: "",
          colores: "",
          tipoPrenda: "",
          referencia: "",
          implementos: "",
          xs: "",
          s: "",
          m: "",
          l: "",
          xl: "",
          total: "",
        }}
        validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await addDoc(collection(db, "lotes"), values);
                    setMensaje("Lote guardado correctamente");
                  } catch (error) {
                    console.error("Error guardando el lote:", error);
                    setMensaje("Error al guardar el lote");
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
            <Text style={styles.label}>Fecha de entrada del lote</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={values.fechaEntrada}
              onChangeText={handleChange("fechaEntrada")}
              onBlur={handleBlur("fechaEntrada")}
            />
            {touched.fechaEntrada && errors.fechaEntrada && (
              <Text style={styles.error}>{errors.fechaEntrada}</Text>
            )}

            <Text style={styles.label}>Fecha de salida del lote</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={values.fechaSalida}
              onChangeText={handleChange("fechaSalida")}
              onBlur={handleBlur("fechaSalida")}
            />
            {touched.fechaSalida && errors.fechaSalida && (
              <Text style={styles.error}>{errors.fechaSalida}</Text>
            )}

            <Text style={styles.label}>Cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del cliente"
              value={values.cliente}
              onChangeText={handleChange("cliente")}
              onBlur={handleBlur("cliente")}
            />
            {touched.cliente && errors.cliente && (
              <Text style={styles.error}>{errors.cliente}</Text>
            )}

            <Text style={styles.label}>Colores en total por lote</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.colores}
              onChangeText={handleChange("colores")}
              onBlur={handleBlur("colores")}
            />
            {touched.colores && errors.colores && (
              <Text style={styles.error}>{errors.colores}</Text>
            )}

            <Text style={styles.label}>Tipo de prenda</Text>
            <TextInput
              style={styles.input}
              placeholder="Camisa, pantalón, etc."
              value={values.tipoPrenda}
              onChangeText={handleChange("tipoPrenda")}
              onBlur={handleBlur("tipoPrenda")}
            />
            {touched.tipoPrenda && errors.tipoPrenda && (
              <Text style={styles.error}>{errors.tipoPrenda}</Text>
            )}

            <Text style={styles.label}>Referencia</Text>
            <TextInput
              style={styles.input}
              placeholder="Referencia"
              value={values.referencia}
              onChangeText={handleChange("referencia")}
              onBlur={handleBlur("referencia")}
            />
            {touched.referencia && errors.referencia && (
              <Text style={styles.error}>{errors.referencia}</Text>
            )}

            <Text style={styles.label}>Implementos</Text>
            <TextInput
              style={styles.input}
              placeholder="Hilo, botones, etc."
              value={values.implementos}
              onChangeText={handleChange("implementos")}
            />

            <Text style={styles.label}>Cantidad XS / EP / ECH</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.xs}
              onChangeText={handleChange("xs")}
            />

            <Text style={styles.label}>Cantidad S / P / CH</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.s}
              onChangeText={handleChange("s")}
            />

            <Text style={styles.label}>Cantidad M / M / M</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.m}
              onChangeText={handleChange("m")}
            />

            <Text style={styles.label}>Cantidad L / G / G</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.l}
              onChangeText={handleChange("l")}
            />

            <Text style={styles.label}>Cantidad XL / EG / EG</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.xl}
              onChangeText={handleChange("xl")}
            />

            <Text style={styles.label}>Total de prendas</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.total}
              onChangeText={handleChange("total")}
              onBlur={handleBlur("total")}
            />
            {touched.total && errors.total && (
              <Text style={styles.error}>{errors.total}</Text>
            )}

            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={handleSubmit as any}
            >
              Guardar Lote
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
  );
}