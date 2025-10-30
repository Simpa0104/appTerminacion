import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/registroPrendas.styles";

const validationSchema = Yup.object().shape({
  tipoPrenda: Yup.string().required("Campo requerido"),
  marca: Yup.string().required("Campo requerido"),
  referencia: Yup.string().required("Campo requerido"),
});

interface RegistroPrendasProps {
  onSuccess?: () => void;
}

export default function RegistroPrendas({ onSuccess }: RegistroPrendasProps) {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            tipoPrenda: "",
            marca: "",
            referencia: "",
            precioAbotonar: "",
            cantidadBotones: "",
            pulir: false,
            precioPulir: "",
            planchar: false,
            precioPlanchar: "",
            etiquetar: false,
            precioEtiquetar: "",
            placa: false,
            precioPlaca: "",
            doblar: false,
            precioDoblar: "",
            empacar: false,
            precioEmpacar: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const parsedValues = {
                ...values,
                precioAbotonar: parseFloat(values.precioAbotonar) || 0,
                precioPulir: parseFloat(values.precioPulir) || 0,
                precioPlanchar: parseFloat(values.precioPlanchar) || 0,
                precioEtiquetar: parseFloat(values.precioEtiquetar) || 0,
                precioPlaca: parseFloat(values.precioPlaca) || 0,
                precioDoblar: parseFloat(values.precioDoblar) || 0,
                precioEmpacar: parseFloat(values.precioEmpacar) || 0,
                cantidadBotones: parseInt(values.cantidadBotones) || 0,
                precioTotal,
              };

              await addDoc(collection(db, "prendas"), parsedValues);
              setMensaje("✅ Prenda guardada correctamente");
              resetForm();
              setPrecioTotal(0);
            } catch (error) {
              console.error("Error guardando la prenda:", error);
              setMensaje("❌ Error al guardar la prenda");
            } finally {
              setVisible(true);
              setTimeout(() => {
                onSuccess?.();
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
            setFieldValue,
          }) => {
            // Recalcular total
            useEffect(() => {
              let total = 0;
              if (values.precioAbotonar && values.cantidadBotones) {
                total +=
                  parseFloat(values.precioAbotonar) *
                  parseInt(values.cantidadBotones);
              }
              [
                { key: "pulir", precio: "precioPulir" },
                { key: "planchar", precio: "precioPlanchar" },
                { key: "etiquetar", precio: "precioEtiquetar" },
                { key: "placa", precio: "precioPlaca" },
                { key: "doblar", precio: "precioDoblar" },
                { key: "empacar", precio: "precioEmpacar" },
              ].forEach((item) => {
                if (values[item.key as keyof typeof values]) {
                  total +=
                    parseFloat(
                      values[item.precio as keyof typeof values] as string
                    ) || 0;
                }
              });
              setPrecioTotal(total);
            }, [values]);

            return (
              <View>
                <Text style={styles.title}>Registro de Prendas</Text>

                {/* CAMPOS BASE */}
                <Text style={styles.label}>Tipo de prenda</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Camisa, Pantalón..."
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
                  placeholder="Ej: Nike, Polo..."
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
                  placeholder="Referencia única"
                  onChangeText={handleChange("referencia")}
                  onBlur={handleBlur("referencia")}
                  value={values.referencia}
                />
                {touched.referencia && errors.referencia && (
                  <Text style={styles.error}>{errors.referencia}</Text>
                )}

                {/* PROCESOS */}
                <Text style={styles.sectionTitle}>Procesos y Costos</Text>

                {/* ABOTONAR */}
                <View style={styles.card}>
                  <Text style={styles.subtitle}>Abotonar</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Precio por botón"
                    onChangeText={handleChange("precioAbotonar")}
                    value={values.precioAbotonar}
                  />
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Cantidad de botones"
                    onChangeText={handleChange("cantidadBotones")}
                    value={values.cantidadBotones}
                  />
                </View>

                {/* OPCIONES CON SWITCH */}
                {[
                  { key: "pulir", label: "Pulir", precio: "precioPulir" },
                  { key: "planchar", label: "Planchar", precio: "precioPlanchar" },
                  { key: "etiquetar", label: "Etiquetar", precio: "precioEtiquetar" },
                  { key: "placa", label: "Colocar placa", precio: "precioPlaca" },
                  { key: "doblar", label: "Doblar", precio: "precioDoblar" },
                  { key: "empacar", label: "Empacar", precio: "precioEmpacar" },
                ].map((item) => (
                  <View key={item.key} style={styles.optionBlock}>
                    <View style={styles.switchRow}>
                      <Text style={styles.label}>{item.label}</Text>
                      <Switch
                        value={values[item.key as keyof typeof values] as boolean}
                        onValueChange={(val) => setFieldValue(item.key, val)}
                      />
                    </View>
                    {values[item.key as keyof typeof values] && (
                      <TextInput
                        style={styles.input}
                        placeholder="Precio del proceso"
                        keyboardType="numeric"
                        onChangeText={handleChange(item.precio)}
                        value={
                          values[item.precio as keyof typeof values] as string
                        }
                      />
                    )}
                  </View>
                ))}

                {/* TOTAL */}
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>Costo total:</Text>
                  <Text style={styles.totalValue}>
                    ${precioTotal.toLocaleString("es-CO")}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit as any}
                >
                  <Text style={styles.submitButtonText}>Guardar Prenda</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
          action={{ label: "Cerrar", onPress: () => setVisible(false) }}
        >
          {mensaje}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
