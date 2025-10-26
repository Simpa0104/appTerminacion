import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/registroLotes.styles";
import useFetchCollection from "../hooks/useFetchCollection";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const validationSchema = Yup.object().shape({
  fechaEntrada: Yup.string().required("Requerido"),
  fechaSalida: Yup.string().required("Requerido"),
  cliente: Yup.string().required("Requerido"),
  colores: Yup.number().required("Requerido"),
  tipoPrenda: Yup.string().required("Requerido"),
  referenciaLote: Yup.string().required("Requerido"),
  referenciaPrenda: Yup.string().required("Requerido"),
  insumos: Yup.string(),
});

export default function RegistroLotes() {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState(new Date());
  const [fechaSalida, setFechaSalida] = useState(new Date());
  const [mostrarPickerEntrada, setMostrarPickerEntrada] = useState(false);
  const [mostrarPickerSalida, setMostrarPickerSalida] = useState(false);

  const { data: prendas, loading: loadingPrendas } = useFetchCollection("prendas");
  const { data: clientes, loading: loadingClientes } = useFetchCollection("clientes");

  if (loadingPrendas || loadingClientes) return <Text>Cargando datos...</Text>;

  const opcionesClientes = [
    ...new Set(clientes.map((item) => item.nombreCliente || item.cliente)),
  ];
  const opcionesPrendas = [...new Set(prendas.map((item) => item.tipoPrenda))];
  const opcionesReferencias = [...new Set(prendas.map((item) => item.referencia))];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            fechaEntrada: fechaEntrada.toISOString().split("T")[0],
            fechaSalida: fechaSalida.toISOString().split("T")[0],
            cliente: "",
            colores: "",
            tipoPrenda: "",
            referenciaLote: "",
            referenciaPrenda: "",
            insumos: "",
            xs: "",
            s: "",
            m: "",
            l: "",
            xl: "",
            totalPrendas: 0,
            totalLote: 0,
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
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
            // 🧮 Cálculo automático
            useEffect(() => {
              const parseNum = (val) => (isNaN(val) || val === "" ? 0 : Number(val));
              const totalTallas =
                parseNum(values.xs) +
                parseNum(values.s) +
                parseNum(values.m) +
                parseNum(values.l) +
                parseNum(values.xl);

              const totalPrendas = totalTallas * parseNum(values.colores);

              const prendaSeleccionada = prendas.find(
                (p) => p.referencia === values.referenciaPrenda
              );
              const precioPrenda = prendaSeleccionada ? parseNum(prendaSeleccionada.costoTotal) : 0;

              const totalLote = totalPrendas * precioPrenda;

              setFieldValue("totalPrendas", totalPrendas);
              setFieldValue("totalLote", totalLote);
            }, [values.xs, values.s, values.m, values.l, values.xl, values.colores, values.referenciaPrenda]);

            return (
              <View>
                {/* Fecha entrada */}
                <Text style={styles.label}>Fecha de entrada</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setMostrarPickerEntrada(true)}
                >
                  <Text>{values.fechaEntrada}</Text>
                  <Icon name="calendar" size={20} />
                </TouchableOpacity>
                {mostrarPickerEntrada && (
                  <DateTimePicker
                    value={fechaEntrada}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setMostrarPickerEntrada(false);
                      if (selectedDate) {
                        setFechaEntrada(selectedDate);
                        const f = selectedDate.toISOString().split("T")[0];
                        setFieldValue("fechaEntrada", f);
                      }
                    }}
                  />
                )}

                {/* Fecha salida */}
                <Text style={styles.label}>Fecha de salida</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setMostrarPickerSalida(true)}
                >
                  <Text>{values.fechaSalida}</Text>
                  <Icon name="calendar" size={20} />
                </TouchableOpacity>
                {mostrarPickerSalida && (
                  <DateTimePicker
                    value={fechaSalida}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setMostrarPickerSalida(false);
                      if (selectedDate) {
                        setFechaSalida(selectedDate);
                        const f = selectedDate.toISOString().split("T")[0];
                        setFieldValue("fechaSalida", f);
                      }
                    }}
                  />
                )}

                {/* Cliente */}
                <Text style={styles.label}>Cliente</Text>
                <SelectDropdown
                  data={opcionesClientes}
                  onSelect={(selectedItem) => setFieldValue("cliente", selectedItem)}
                  buttonStyle={styles.dropdownButton}
                  buttonTextStyle={styles.dropdownButtonText}
                  dropdownStyle={{ backgroundColor: "#fff" }}
                  renderButton={(selectedItem) => (
                    <Text style={styles.dropdownButtonText}>
                      {selectedItem || "Seleccione un cliente"}
                    </Text>
                  )}
                />

                {/* Colores */}
                <Text style={styles.label}>Colores por lote</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={values.colores}
                  onChangeText={handleChange("colores")}
                />

                {/* Tipo de prenda */}
                <Text style={styles.label}>Tipo de prenda</Text>
                <SelectDropdown
                  data={opcionesPrendas}
                  onSelect={(selectedItem) => setFieldValue("tipoPrenda", selectedItem)}
                  buttonStyle={styles.dropdownButton}
                  renderButton={(selectedItem) => (
                    <Text style={styles.dropdownButtonText}>
                      {selectedItem || "Seleccione tipo de prenda"}
                    </Text>
                  )}
                />

                {/* Referencia */}
                <Text style={styles.label}>Referencia prenda</Text>
                <SelectDropdown
                  data={opcionesReferencias}
                  onSelect={(selectedItem) => setFieldValue("referenciaPrenda", selectedItem)}
                  buttonStyle={styles.dropdownButton}
                  renderButton={(selectedItem) => (
                    <Text style={styles.dropdownButtonText}>
                      {selectedItem || "Seleccione referencia"}
                    </Text>
                  )}
                />

                {/* Tallas */}
                {["xs", "s", "m", "l", "xl"].map((talla) => (
                  <View key={talla}>
                    <Text style={styles.label}>{talla.toUpperCase()}</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={values[talla]}
                      onChangeText={handleChange(talla)}
                    />
                  </View>
                ))}

                {/* Totales */}
                <Text style={styles.label}>Total de prendas: {values.totalPrendas}</Text>
                <Text style={styles.label}>Total del lote: ${values.totalLote}</Text>

                <Button
                  mode="contained"
                  style={styles.submitButton}
                  onPress={handleSubmit as any}
                >
                  Guardar Lote
                </Button>
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