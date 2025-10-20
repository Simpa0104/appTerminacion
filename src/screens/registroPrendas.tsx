import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/registroPrendas.styles";

const validationSchema = Yup.object().shape({
  tipoPrenda: Yup.string().required("Requerido"),
  marca: Yup.string().required("Requerido"),
  referencia: Yup.string().required("Requerido"),
  precioXS: Yup.number().required("Requerido"),
  precioS: Yup.number().required("Requerido"),
  precioM: Yup.number().required("Requerido"),
  precioL: Yup.number().required("Requerido"),
  precioXL: Yup.number().required("Requerido"),
});

export default function RegistroPrendas() {

  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [tieneAdiciones, setTieneAdiciones] = useState(false);

  return (
    <ScrollView style={styles.form}>
      <Formik
        initialValues={{
          tipoPrenda: "",
          marca: "",
          referencia: "",
          precioXS: "",
          precioS: "",
          precioM: "",
          precioL: "",
          precioXL: "",
          precioAbotonar: "",
          cantidadBotones: "",
          pulir: false,
        }}
        validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await addDoc(collection(db, "prendas"), values);
                    setMensaje("Prenda guardada correctamente");
                  } catch (error) {
                    console.error("Error guardando la prenda:", error);
                    setMensaje("Error al guardar cla prenda");
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
          setFieldValue,
        }) => (
          <View>
            <Text style={styles.label}>Tipo de prenda</Text>
            <TextInput
              style={styles.input}
              placeholder="Camisa, pantalón, etc."
              onChangeText={handleChange("tipoPrenda")}
              onBlur={handleBlur("tipoPrenda")}
              value={values.tipoPrenda}
            />
            {touched.tipoPrenda && errors.tipoPrenda && (
              <Text style={styles.error}>{errors.tipoPrenda}</Text>
            )}

            <Text style={styles.label}>Marca</Text>
            <TextInput
              style={styles.input}
              placeholder="Polo, Nike, etc."
              onChangeText={handleChange("marca")}
              onBlur={handleBlur("marca")}
              value={values.marca}
            />
            {touched.marca && errors.marca && (
              <Text style={styles.error}>{errors.marca}</Text>
            )}

            <Text style={styles.label}>Referencia</Text>
            <TextInput
              style={styles.input}
              placeholder="Referencia"
              onChangeText={handleChange("referencia")}
              onBlur={handleBlur("referencia")}
              value={values.referencia}
            />
            {touched.referencia && errors.referencia && (
              <Text style={styles.error}>{errors.referencia}</Text>
            )}

            <Text style={styles.label}>Precio por XS/EP/ECG</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("precioXS")}
              value={values.precioXS}
            />

            <Text style={styles.label}>Precio por S/P/CH</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("precioS")}
              value={values.precioS}
            />

            <Text style={styles.label}>Precio por M/M/M</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("precioM")}
              value={values.precioM}
            />

            <Text style={styles.label}>Precio por L/G/G</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("precioL")}
              value={values.precioL}
            />

            <Text style={styles.label}>Precio por XL/EG/E</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange("precioXL")}
              value={values.precioXL}
            />

            <View style={styles.switchRow}>
              <Text style={styles.label}>¿Tendrá adiciones?</Text>
              <Switch
                value={tieneAdiciones}
                onValueChange={setTieneAdiciones}
              />
            </View>

            {tieneAdiciones && (
              <>
                <Text style={styles.label}>Precio por abotonar</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={handleChange("precioAbotonar")}
                  value={values.precioAbotonar}
                />

                <Text style={styles.label}>Cantidad de botones</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={handleChange("cantidadBotones")}
                  value={values.cantidadBotones}
                />

                <View style={styles.switchRow}>
                  <Text style={styles.label}>¿Se debe pulir?</Text>
                  <Switch
                    value={values.pulir}
                    onValueChange={(val) => {
                      setFieldValue("pulir", val);
                    }}
                  />
                </View>
              </>
            )}

            <Button title="Guardar prenda" onPress={handleSubmit as any} />
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
