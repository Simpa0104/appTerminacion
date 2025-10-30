import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/registroLotes.styles";
import useFetchCollection from "../hooks/useFetchCollection";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
  fechaEntrada: Yup.string().required("Requerido"),
  fechaSalida: Yup.string().required("Requerido"),
  cliente: Yup.string().required("Requerido"),
  colores: Yup.number().required("Requerido"),
  tipoPrenda: Yup.string().required("Requerido"),
  referenciaLote: Yup.string().required("Requerido"),
  referenciaPrenda: Yup.string().required("Requerido"),
});

// Componente Dropdown personalizado
const CustomDropdown = ({
  label,
  data,
  value,
  onSelect,
  placeholder = "Seleccionar...",
  disabled = false,
  error
}: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropdownButton, disabled && styles.dropdownDisabled]}
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
      >
        <Text style={[styles.dropdownButtonText, !value && { color: "#999" }]}>
          {value || placeholder}
        </Text>
        <Text>⇩</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text>⇩</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={data}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

interface RegistroLotesProps {
  onSuccess?: () => void;
}

export default function RegistroLotes({ onSuccess }: RegistroLotesProps) {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState(new Date());
  const [fechaSalida, setFechaSalida] = useState(new Date());
  const [mostrarPickerEntrada, setMostrarPickerEntrada] = useState(false);
  const [mostrarPickerSalida, setMostrarPickerSalida] = useState(false);
  const [prendaSeleccionada, setPrendaSeleccionada] = useState<any>(null);

  const { data: prendas, loading: loadingPrendas } = useFetchCollection("prendas");
  const { data: clientes, loading: loadingClientes } = useFetchCollection("clientes");

  if (loadingPrendas || loadingClientes) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  // Opciones para los dropdowns
  const opcionesClientes = [
    ...new Set(clientes.map((item) => item.nombreCliente || item.cliente)),
  ].filter(Boolean);

  const opcionesTiposPrenda = [...new Set(prendas.map((item) => item.tipoPrenda))].filter(Boolean);

  // Función para obtener referencias filtradas por tipo
  const obtenerReferenciasPorTipo = (tipoPrenda: string) => {
    if (!tipoPrenda) return prendas.map((p) => p.referencia).filter(Boolean);
    return prendas
      .filter((p) => p.tipoPrenda === tipoPrenda)
      .map((p) => p.referencia)
      .filter(Boolean);
  };

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
            cantidadesPorColor: [] as Array<{
              nombreColor: string;
              xs: string;
              s: string;
              m: string;
              l: string;
              xl: string;
            }>,
            totalPrendas: 0,
            totalLote: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await addDoc(collection(db, "lotes"), {
                ...values,
                estado: "Recibido",
              });
              setMensaje("Lote guardado correctamente");
              setPrendaSeleccionada(null);
              resetForm();

              // Cerrar el modal después de 1.5 segundos
              setTimeout(() => {
                if (onSuccess) {
                  onSuccess();
                }
              }, 1500);
            } catch (error) {
              console.error("Error guardando el lote:", error);
              setMensaje("Error al guardar el lote");
            } finally {
              setVisible(true);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
            // Actualizar array de colores cuando cambia la cantidad
            useEffect(() => {
              const numColores = Number(values.colores) || 0;
              const coloresActuales = values.cantidadesPorColor.length;

              if (numColores !== coloresActuales) {
                const nuevosColores = Array.from({ length: numColores }, (_, i) => {
                  if (i < coloresActuales) {
                    return values.cantidadesPorColor[i];
                  }
                  return {
                    nombreColor: `Color ${i + 1}`,
                    xs: "",
                    s: "",
                    m: "",
                    l: "",
                    xl: "",
                  };
                });
                setFieldValue("cantidadesPorColor", nuevosColores);
              }
            }, [values.colores]);

            // Cálculo automático de totales
            useEffect(() => {
              const parseNum = (val: any) => (isNaN(val) || val === "" ? 0 : Number(val));

              let totalPrendas = 0;

              // Sumar todas las cantidades de todos los colores
              values.cantidadesPorColor.forEach((color) => {
                totalPrendas +=
                  parseNum(color.xs) +
                  parseNum(color.s) +
                  parseNum(color.m) +
                  parseNum(color.l) +
                  parseNum(color.xl);
              });

              const precioUnitario = prendaSeleccionada ? parseNum(prendaSeleccionada.precioTotal) : 0;
              const totalLote = totalPrendas * precioUnitario;

              setFieldValue("totalPrendas", totalPrendas);
              setFieldValue("totalLote", totalLote);
            }, [values.cantidadesPorColor, prendaSeleccionada]);

            return (
              <View>
                {/* ========== FECHA ENTRADA ========== */}
                <Text style={styles.label}>Fecha de entrada</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setMostrarPickerEntrada(true)}
                >
                  <Text>{values.fechaEntrada}</Text>
                  <Text>⬗</Text>
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
                        setFieldValue("fechaEntrada", selectedDate.toISOString().split("T")[0]);
                      }
                    }}
                  />
                )}

                {/* ========== FECHA SALIDA ========== */}
                <Text style={styles.label}>Fecha de salida</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setMostrarPickerSalida(true)}
                >
                  <Text>{values.fechaSalida}</Text>
                  <Text>⬗</Text>
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
                        setFieldValue("fechaSalida", selectedDate.toISOString().split("T")[0]);
                      }
                    }}
                  />
                )}

                {/* ========== CLIENTE ========== */}
                <CustomDropdown
                  label="Cliente"
                  data={opcionesClientes}
                  value={values.cliente}
                  onSelect={(item: string) => setFieldValue("cliente", item)}
                  placeholder="Seleccione un cliente"
                  error={touched.cliente && errors.cliente}
                />

                {/* ========== COLORES ========== */}
                <Text style={styles.label}>Cantidad de colores en el lote</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Ej: 3"
                  value={values.colores}
                  onChangeText={handleChange("colores")}
                  onBlur={handleBlur("colores")}
                />
                {touched.colores && errors.colores && (
                  <Text style={styles.errorText}>{errors.colores}</Text>
                )}

                {/* ========== TIPO DE PRENDA ========== */}
                <CustomDropdown
                  label="Tipo de prenda"
                  data={opcionesTiposPrenda}
                  value={values.tipoPrenda}
                  onSelect={(item: string) => {
                    setFieldValue("tipoPrenda", item);
                    setFieldValue("referenciaPrenda", "");
                    setPrendaSeleccionada(null);
                  }}
                  placeholder="Seleccione tipo de prenda"
                  error={touched.tipoPrenda && errors.tipoPrenda}
                />

                {/* ========== REFERENCIA PRENDA ========== */}
                <CustomDropdown
                  label="Referencia prenda"
                  data={obtenerReferenciasPorTipo(values.tipoPrenda)}
                  value={values.referenciaPrenda}
                  onSelect={(item: string) => {
                    setFieldValue("referenciaPrenda", item);
                    const prenda = prendas.find((p) => p.referencia === item);
                    if (prenda) {
                      setPrendaSeleccionada(prenda);
                      if (!values.tipoPrenda) {
                        setFieldValue("tipoPrenda", prenda.tipoPrenda);
                      }
                    }
                  }}
                  placeholder="Seleccione referencia"
                  disabled={!values.tipoPrenda}
                  error={touched.referenciaPrenda && errors.referenciaPrenda}
                />

                {/* Info de la prenda seleccionada */}
                {prendaSeleccionada && (
                  <View style={styles.prendaInfo}>
                    <Text style={styles.prendaInfoTitle}>📦 Prenda seleccionada:</Text>
                    <Text style={styles.prendaInfoText}>• Tipo: {prendaSeleccionada.tipoPrenda}</Text>
                    <Text style={styles.prendaInfoText}>• Marca: {prendaSeleccionada.marca}</Text>
                    <Text style={styles.prendaInfoText}>
                      • Precio unitario: ${prendaSeleccionada.precioTotal?.toLocaleString("es-CO")}
                    </Text>
                  </View>
                )}

                {/* ========== REFERENCIA LOTE ========== */}
                <Text style={styles.label}>Referencia del lote</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: LOTE-001"
                  value={values.referenciaLote}
                  onChangeText={handleChange("referenciaLote")}
                  onBlur={handleBlur("referenciaLote")}
                />
                {touched.referenciaLote && errors.referenciaLote && (
                  <Text style={styles.errorText}>{errors.referenciaLote}</Text>
                )}

                {/* ========== INSUMOS ========== */}
                <Text style={styles.label}>Insumos (opcional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Botones, hilos, etiquetas..."
                  value={values.insumos}
                  onChangeText={handleChange("insumos")}
                  multiline
                />

                {/* ========== CANTIDADES POR COLOR ========== */}
                {values.cantidadesPorColor.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Cantidades por color y talla</Text>
                    {values.cantidadesPorColor.map((color, colorIndex) => {
                      const totalColor =
                        Number(color.xs || 0) +
                        Number(color.s || 0) +
                        Number(color.m || 0) +
                        Number(color.l || 0) +
                        Number(color.xl || 0);

                      return (
                        <View
                          key={colorIndex}
                          style={{
                            backgroundColor: "#F9FAFB",
                            padding: 15,
                            borderRadius: 12,
                            marginBottom: 16,
                            borderWidth: 1,
                            borderColor: "#E5E7EB",
                          }}
                        >
                          {/* Nombre del color */}
                          <Text style={styles.label}>Nombre del color {colorIndex + 1}</Text>
                          <TextInput
                            style={styles.input}
                            placeholder={`Ej: Azul, Rojo, Verde...`}
                            value={color.nombreColor}
                            onChangeText={(text) => {
                              const nuevosColores = [...values.cantidadesPorColor];
                              nuevosColores[colorIndex].nombreColor = text;
                              setFieldValue("cantidadesPorColor", nuevosColores);
                            }}
                          />

                          {/* Tallas para este color */}
                          <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: "600", color: "#666", marginBottom: 8 }}>
                              Cantidades por talla:
                            </Text>
                            {["xs", "s", "m", "l", "xl"].map((talla) => (
                              <View key={talla} style={{ marginBottom: 8 }}>
                                <Text style={[styles.label, { marginTop: 4 }]}>
                                  {talla.toUpperCase()}
                                </Text>
                                <TextInput
                                  style={styles.input}
                                  keyboardType="numeric"
                                  placeholder="0"
                                  value={color[talla as keyof typeof color] as string}
                                  onChangeText={(text) => {
                                    const nuevosColores = [...values.cantidadesPorColor];
                                    nuevosColores[colorIndex][talla as keyof typeof color] = text as any;
                                    setFieldValue("cantidadesPorColor", nuevosColores);
                                  }}
                                />
                              </View>
                            ))}
                          </View>

                          {/* Total del color */}
                          <View
                            style={{
                              backgroundColor: "#EEF2FF",
                              padding: 10,
                              borderRadius: 8,
                              marginTop: 10,
                            }}
                          >
                            <Text style={{ fontSize: 14, fontWeight: "600", color: "#4F46E5" }}>
                              Total {color.nombreColor}: {totalColor} prendas
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </>
                )}

                {/* ========== TOTALES ========== */}
                <View style={styles.resumenContainer}>
                  <Text style={styles.resumenTitle}>Resumen del lote</Text>
                  <Text style={styles.resumenText}>
                    Total de prendas: {values.totalPrendas}
                  </Text>
                  <Text style={styles.resumenTotal}>
                    Total del lote: ${values.totalLote.toLocaleString("es-CO")}
                  </Text>
                </View>

                {/* ========== BOTÓN GUARDAR ========== */}
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