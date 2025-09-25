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
import Layout from "../components/layout";
import styles from "../styles/registroLotes.styles";

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

export default function RegistroLotes() {
  const [tieneAdiciones, setTieneAdiciones] = useState(false);

  return (
    <Layout title="CheckOutLotes">
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
          onSubmit={(values) => {
            alert("Formulario enviado 🚀");
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
            setFieldValue,
          }) => (
            <View>
              <Text style={styles.label}>Tipo de prenda</Text>
              <TextInput
                style={styles.input}
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

              <Button title="Guardar" onPress={handleSubmit as any} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </Layout>
  );
}
