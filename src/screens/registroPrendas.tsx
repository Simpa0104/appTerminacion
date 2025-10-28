import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
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
});

interface RegistroPrendasProps {
  onSuccess?: () => void;
}

export default function RegistroPrendas({ onSuccess }: RegistroPrendasProps) {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.form} showsVerticalScrollIndicator>
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
            precioempacar: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              // Convertir precios a número antes de guardar
              const parsedValues = {
                ...values,
                precioAbotonar: parseFloat(values.precioAbotonar) || 0,
                precioPulir: parseFloat(values.precioPulir) || 0,
                precioPlanchar: parseFloat(values.precioPlanchar) || 0,
                precioEtiquetar: parseFloat(values.precioEtiquetar) || 0,
                precioPlaca: parseFloat(values.precioPlaca) || 0,
                precioDoblar: parseFloat(values.precioDoblar) || 0,
                precioempacar: parseFloat(values.precioempacar) || 0,
                cantidadBotones: parseInt(values.cantidadBotones) || 0,
                precioTotal,
              };

              await addDoc(collection(db, "prendas"), parsedValues);
              setMensaje("Prenda guardada correctamente");
              resetForm();
              setPrecioTotal(0);
            } catch (error) {
              console.error("Error guardando la prenda:", error);
              setMensaje("Error al guardar la prenda");
            } finally {
              setVisible(true);

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
            setFieldValue,
          }) => {
            // 🔹 Recalcular total en tiempo real
            useEffect(() => {
              let total = 0;

              // Sumar precio por abotonar
              if (values.precioAbotonar && values.cantidadBotones) {
                total +=
                  parseFloat(values.precioAbotonar) *
                  parseInt(values.cantidadBotones);
              }

              // Sumar todas las opciones activas
              [
                { key: "pulir", precio: "precioPulir" },
                { key: "planchar", precio: "precioPlanchar" },
                { key: "etiquetar", precio: "precioEtiquetar" },
                { key: "placa", precio: "precioPlaca" },
                { key: "doblar", precio: "precioDoblar" },
                { key: "empacar", precio: "precioempacar" },
              ].forEach((item) => {
                if (values[item.key as keyof typeof values]) {
                  total += parseFloat(values[item.precio as keyof typeof values] as string) || 0;
                }
              });

              setPrecioTotal(total);
            }, [values]);

            return (
              <View>
                <Text style={styles.title}>Registro de Prendas</Text>

                {/* === CAMPOS BASE === */}
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

                {/* === PROCESOS Y PRECIOS === */}
                <Text style={styles.sectionTitle}>Procesos y costos</Text>

                {/* ABOTONAR */}
                <Text style={styles.label}>Precio por abotonar (por botón)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Ej: 500"
                  onChangeText={handleChange("precioAbotonar")}
                  value={values.precioAbotonar}
                />

                <Text style={styles.label}>Cantidad de botones</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Ej: 6"
                  onChangeText={handleChange("cantidadBotones")}
                  value={values.cantidadBotones}
                />

                {/* === OPCIONES CON SWITCH === */}
                {[
                  { key: "pulir", label: "¿Se debe pulir?", precio: "precioPulir" },
                  { key: "planchar", label: "¿Se debe planchar?", precio: "precioPlanchar" },
                  { key: "etiquetar", label: "¿Se debe etiquetar?", precio: "precioEtiquetar" },
                  { key: "placa", label: "¿Se debe colocar placa?", precio: "precioPlaca" },
                  { key: "doblar", label: "¿Se debe doblar?", precio: "precioDoblar" },
                  { key: "empacar", label: "¿Se debe empacar?", precio: "precioempacar" },
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
                        placeholder="Precio adicional"
                        keyboardType="numeric"
                        onChangeText={handleChange(item.precio)}
                        value={values[item.precio as keyof typeof values] as string}
                      />
                    )}
                  </View>
                ))}

                {/* === TOTAL === */}
                <View style={styles.totalContainer}>
                  <Text style={styles.totalLabel}>💰 Precio total por prenda:</Text>
                  <Text style={styles.totalValue}>
                    ${precioTotal.toLocaleString("es-CO")}
                  </Text>
                </View>

                {/* === BOTÓN GUARDAR === */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit as any}
                >
                  <Text style={styles.submitButtonText}>Guardar prenda</Text>
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