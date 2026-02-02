// src/screens/histtorialPrendas.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, Modal, TouchableOpacity, Switch } from "react-native";
import { Card, Button, Portal, Dialog } from "react-native-paper";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import useFetchCollection from "../hooks/useFetchCollection";
import RegistroPrendas from "./registroPrendas";
import styles from "../styles/historialPrendas.styles.responsive";
import Layout from "../components/layout";

export default function HistorialPrendas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [search, setSearch] = useState("");
  const [prendaEditando, setPrendaEditando] = useState<any>(null);
  const [mostrarDialogoEliminar, setMostrarDialogoEliminar] = useState(false);
  const [prendaAEliminar, setPrendaAEliminar] = useState<any>(null);
  const [precioTotalEdicion, setPrecioTotalEdicion] = useState(0);

  const { data: prendas, loading } = useFetchCollection("prendas");

  // Filtrar prendas
  const term = search.trim().toLowerCase();
  const prendasFiltradas = prendas.filter((prenda) => {
    if (!term) return true;
    return (
      String(prenda.tipoPrenda || "").toLowerCase().includes(term) ||
      String(prenda.marca || "").toLowerCase().includes(term) ||
      String(prenda.referencia || "").toLowerCase().includes(term)
    );
  });

  // Recalcular precio total al editar
  useEffect(() => {
    if (!prendaEditando) return;

    let total = 0;

    // Abotonar
    if (prendaEditando.precioAbotonar && prendaEditando.cantidadBotones) {
      total += parseFloat(prendaEditando.precioAbotonar) * parseInt(prendaEditando.cantidadBotones);
    }

    // Procesos predeterminados
    [
      { key: "pulir", precio: "precioPulir" },
      { key: "planchar", precio: "precioPlanchar" },
      { key: "etiquetar", precio: "precioEtiquetar" },
      { key: "placa", precio: "precioPlaca" },
      { key: "doblar", precio: "precioDoblar" },
      { key: "empacar", precio: "precioEmpacar" },
    ].forEach((item) => {
      if (prendaEditando[item.key]) {
        total += parseFloat(prendaEditando[item.precio]) || 0;
      }
    });

    // Procesos personalizados
    if (prendaEditando.procesosPersonalizados && Array.isArray(prendaEditando.procesosPersonalizados)) {
      prendaEditando.procesosPersonalizados.forEach((proceso: any) => {
        total += parseFloat(proceso.precio) || 0;
      });
    }

    setPrecioTotalEdicion(total);
  }, [prendaEditando]);

  const iniciarEdicion = (prenda: any) => {
    setPrendaEditando({
      ...prenda,
      precioAbotonar: String(prenda.precioAbotonar || ""),
      cantidadBotones: String(prenda.cantidadBotones || ""),
      precioPulir: String(prenda.precioPulir || ""),
      precioPlanchar: String(prenda.precioPlanchar || ""),
      precioEtiquetar: String(prenda.precioEtiquetar || ""),
      precioPlaca: String(prenda.precioPlaca || ""),
      precioDoblar: String(prenda.precioDoblar || ""),
      precioEmpacar: String(prenda.precioEmpacar || ""),
      procesosPersonalizados: prenda.procesosPersonalizados || [],
    });
  };

  const guardarEdicion = async () => {
    if (!prendaEditando) return;

    try {
      const { id, ...datos } = prendaEditando;

      // Filtrar procesos personalizados válidos
      const procesosValidos = prendaEditando.procesosPersonalizados.filter(
        (p: any) => p.nombre.trim() !== "" && p.precio !== ""
      );

      const datosActualizados = {
        ...datos,
        precioAbotonar: parseFloat(prendaEditando.precioAbotonar) || 0,
        precioPulir: parseFloat(prendaEditando.precioPulir) || 0,
        precioPlanchar: parseFloat(prendaEditando.precioPlanchar) || 0,
        precioEtiquetar: parseFloat(prendaEditando.precioEtiquetar) || 0,
        precioPlaca: parseFloat(prendaEditando.precioPlaca) || 0,
        precioDoblar: parseFloat(prendaEditando.precioDoblar) || 0,
        precioEmpacar: parseFloat(prendaEditando.precioEmpacar) || 0,
        cantidadBotones: parseInt(prendaEditando.cantidadBotones) || 0,
        procesosPersonalizados: procesosValidos,
        precioTotal: precioTotalEdicion,
      };

      await updateDoc(doc(db, "prendas", id), datosActualizados);
      setPrendaEditando(null);
    } catch (error) {
      console.error("Error actualizando prenda:", error);
    }
  };

  const confirmarEliminacion = (prenda: any) => {
    setPrendaAEliminar(prenda);
    setMostrarDialogoEliminar(true);
  };

  const eliminarPrenda = async () => {
    if (!prendaAEliminar) return;

    try {
      await deleteDoc(doc(db, "prendas", prendaAEliminar.id));
      setMostrarDialogoEliminar(false);
      setPrendaAEliminar(null);
    } catch (error) {
      console.error("Error eliminando prenda:", error);
    }
  };

  // Funciones para manejar procesos personalizados en edición
  const agregarProcesoEnEdicion = () => {
    if (!prendaEditando) return;

    const nuevosProcesos = [
      ...prendaEditando.procesosPersonalizados,
      { nombre: "", precio: "" }
    ];

    setPrendaEditando({
      ...prendaEditando,
      procesosPersonalizados: nuevosProcesos
    });
  };

  const eliminarProcesoEnEdicion = (index: number) => {
    if (!prendaEditando) return;

    const nuevosProcesos = prendaEditando.procesosPersonalizados.filter(
      (_: any, i: number) => i !== index
    );

    setPrendaEditando({
      ...prendaEditando,
      procesosPersonalizados: nuevosProcesos
    });
  };

  const actualizarProcesoEnEdicion = (index: number, campo: "nombre" | "precio", valor: string) => {
    if (!prendaEditando) return;

    const nuevosProcesos = [...prendaEditando.procesosPersonalizados];
    nuevosProcesos[index] = {
      ...nuevosProcesos[index],
      [campo]: campo === "precio" ? (parseFloat(valor) || 0) : valor
    };

    setPrendaEditando({
      ...prendaEditando,
      procesosPersonalizados: nuevosProcesos
    });
  };

  return (
    <Layout title="Historial de Prendas" scrollable>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.headerRow}>
          <Button
            mode="contained"
            onPress={() => setMostrarFormulario(!mostrarFormulario)}
            style={styles.addButton}
          >
            {mostrarFormulario ? "Cerrar" : "Agregar prenda"}
          </Button>

          <TextInput
            style={styles.searchBar}
            placeholder="Buscar por tipo, marca o referencia..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{prendas.length}</Text>
            <Text style={styles.statLabel}>Total Prendas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {new Set(prendas.map((p) => p.tipoPrenda)).size}
            </Text>
            <Text style={styles.statLabel}>Tipos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {new Set(prendas.map((p) => p.marca)).size}
            </Text>
            <Text style={styles.statLabel}>Marcas</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Prendas registradas</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando prendas...</Text>
          </View>
        ) : prendasFiltradas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {search ? "No se encontraron prendas" : "No hay prendas registradas"}
            </Text>
            {!search && (
              <Button mode="contained" onPress={() => setMostrarFormulario(true)} style={{ marginTop: 10 }}>
                Crear primera prenda
              </Button>
            )}
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.headerText, styles.colTipo]}>Tipo</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colMarca]}>Marca</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colRef]}>Referencia</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colBotones]}>Botones</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colProcesos]}>Procesos</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colTotal]}>Total</Text>
                <Text style={[styles.tableCell, styles.headerText, styles.colAcciones]}>Acciones</Text>
              </View>

              {prendasFiltradas.map((prenda) => (
                <View key={prenda.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.colTipo]}>{prenda.tipoPrenda}</Text>
                  <Text style={[styles.tableCell, styles.colMarca]}>{prenda.marca}</Text>
                  <Text style={[styles.tableCell, styles.colRef]}>{prenda.referencia}</Text>
                  <Text style={[styles.tableCell, styles.colBotones]}>{prenda.cantidadBotones || 0}</Text>

                  {/* PROCESOS - INCLUYE PERSONALIZADOS */}
                  <View style={[styles.tableCell, styles.colProcesos]}>
                    <View style={styles.procesosContainer}>
                      {/* Procesos predeterminados */}
                      {prenda.pulir && <Text style={styles.procesoChip}>Pulir</Text>}
                      {prenda.planchar && <Text style={styles.procesoChip}>Planchar</Text>}
                      {prenda.etiquetar && <Text style={styles.procesoChip}>Etiquetar</Text>}
                      {prenda.placa && <Text style={styles.procesoChip}>Placa</Text>}
                      {prenda.doblar && <Text style={styles.procesoChip}>Doblar</Text>}
                      {prenda.empacar && <Text style={styles.procesoChip}>Empacar</Text>}

                      {/* Procesos personalizados */}
                      {prenda.procesosPersonalizados && prenda.procesosPersonalizados.length > 0 &&
                        prenda.procesosPersonalizados.map((proceso: any, idx: number) => (
                          <Text key={idx} style={[styles.procesoChip, styles.procesoCustom]}>
                            {proceso.nombre}
                          </Text>
                        ))
                      }
                    </View>
                  </View>

                  <Text style={[styles.tableCell, styles.colTotal, styles.totalText]}>
                    ${(prenda.precioTotal || 0).toLocaleString("es-CO")}
                  </Text>

                  <View style={[styles.tableCell, styles.colAcciones]}>
                    <View style={styles.accionesRow}>
                      <TouchableOpacity onPress={() => iniciarEdicion(prenda)}>
                        <Text style={styles.editarButton}>Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => confirmarEliminacion(prenda)}>
                        <Text style={styles.eliminarButton}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Modal de agregar */}
        <Portal>
          {mostrarFormulario && (
            <View style={styles.overlay}>
              <Card style={styles.overlayCard}>
                <Card.Title title="Registro de prendas" />
                <Card.Content style={styles.overlayContent}>
                  <ScrollView showsVerticalScrollIndicator>
                    <RegistroPrendas onSuccess={() => setMostrarFormulario(false)} />
                  </ScrollView>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "flex-end" }}>
                  <Button onPress={() => setMostrarFormulario(false)}>Cerrar</Button>
                </Card.Actions>
              </Card>
            </View>
          )}
        </Portal>

        {/* Modal de edición COMPLETO */}
        <Modal
          visible={!!prendaEditando}
          transparent
          animationType="slide"
          onRequestClose={() => setPrendaEditando(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentLarge}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Editar Prenda</Text>
                <TouchableOpacity onPress={() => setPrendaEditando(null)}>
                  <Text style={styles.cerrarModal}>Cerrar</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator>
                {prendaEditando && (
                  <>
                    <Text style={styles.modalSectionTitle}>Información Básica</Text>

                    <Text style={styles.label}>Tipo de prenda</Text>
                    <TextInput
                      style={styles.input}
                      value={prendaEditando.tipoPrenda}
                      onChangeText={(text) =>
                        setPrendaEditando({ ...prendaEditando, tipoPrenda: text })
                      }
                    />

                    <Text style={styles.label}>Marca</Text>
                    <TextInput
                      style={styles.input}
                      value={prendaEditando.marca}
                      onChangeText={(text) =>
                        setPrendaEditando({ ...prendaEditando, marca: text })
                      }
                    />

                    <Text style={styles.label}>Referencia</Text>
                    <TextInput
                      style={styles.input}
                      value={prendaEditando.referencia}
                      onChangeText={(text) =>
                        setPrendaEditando({ ...prendaEditando, referencia: text })
                      }
                    />

                    <Text style={styles.modalSectionTitle}>Procesos y Costos</Text>

                    {/* ABOTONAR */}
                    <Text style={styles.label}>Precio por abotonar (por boton)</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={prendaEditando.precioAbotonar}
                      onChangeText={(text) =>
                        setPrendaEditando({ ...prendaEditando, precioAbotonar: text })
                      }
                    />

                    <Text style={styles.label}>Cantidad de botones</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={prendaEditando.cantidadBotones}
                      onChangeText={(text) =>
                        setPrendaEditando({ ...prendaEditando, cantidadBotones: text })
                      }
                    />

                    {/* PULIR */}
                    <View style={styles.switchRow}>
                      <Text style={styles.label}>Pulir</Text>
                      <Switch
                        value={prendaEditando.pulir}
                        onValueChange={(val) =>
                          setPrendaEditando({ ...prendaEditando, pulir: val })
                        }
                      />
                    </View>
                    {prendaEditando.pulir && (
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Precio"
                        value={prendaEditando.precioPulir}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, precioPulir: text })
                        }
                      />
                    )}

                    {/* PLANCHAR */}
                    <View style={styles.switchRow}>
                      <Text style={styles.label}>Planchar</Text>
                      <Switch
                        value={prendaEditando.planchar}
                        onValueChange={(val) =>
                          setPrendaEditando({ ...prendaEditando, planchar: val })
                        }
                      />
                    </View>
                    {prendaEditando.planchar && (
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Precio"
                        value={prendaEditando.precioPlanchar}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, precioPlanchar: text })
                        }
                      />
                    )}

                    {/* ETIQUETAR */}
                    <View style={styles.switchRow}>
                      <Text style={styles.label}>Etiquetar</Text>
                      <Switch
                        value={prendaEditando.etiquetar}
                        onValueChange={(val) =>
                          setPrendaEditando({ ...prendaEditando, etiquetar: val })
                        }
                      />
                    </View>
                    {prendaEditando.etiquetar && (
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Precio"
                        value={prendaEditando.precioEtiquetar}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, precioEtiquetar: text })
                        }
                      />
                    )}

                    {/* PLACA */}
                    <View style={styles.switchRow}>
                      <Text style={styles.label}>Colocar placa</Text>
                      <Switch
                        value={prendaEditando.placa}
                        onValueChange={(val) =>
                          setPrendaEditando({ ...prendaEditando, placa: val })
                        }
                      />
                    </View>
                    {prendaEditando.placa && (
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Precio"
                        value={prendaEditando.precioPlaca}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, precioPlaca: text })
                        }
                      />
                    )}

                    {/* DOBLAR */}
                    <View style={styles.switchRow}>
                      <Text style={styles.label}>Doblar</Text>
                      <Switch
                        value={prendaEditando.doblar}
                        onValueChange={(val) =>
                          setPrendaEditando({ ...prendaEditando, doblar: val })
                        }
                      />
                    </View>
                    {prendaEditando.doblar && (
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Precio"
                        value={prendaEditando.precioDoblar}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, precioDoblar: text })
                        }
                      />
                    )}

                    {/* EMPACAR */}
                    <View style={styles.switchRow}>
                      <Text style={styles.label}>Empacar</Text>
                      <Switch
                        value={prendaEditando.empacar}
                        onValueChange={(val) =>
                          setPrendaEditando({ ...prendaEditando, empacar: val })
                        }
                      />
                    </View>
                    {prendaEditando.empacar && (
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Precio"
                        value={prendaEditando.precioEmpacar}
                        onChangeText={(text) =>
                          setPrendaEditando({ ...prendaEditando, precioEmpacar: text })
                        }
                      />
                    )}

                    {/* PROCESOS PERSONALIZADOS - CON EDICIÓN COMPLETA */}
                    <Text style={styles.modalSectionTitle}>Procesos Personalizados</Text>

                    {prendaEditando.procesosPersonalizados &&
                      prendaEditando.procesosPersonalizados.length > 0 && (
                        <>
                          {prendaEditando.procesosPersonalizados.map((proceso: any, index: number) => (
                            <View key={index} style={styles.customProcessCard}>
                              <View style={styles.customProcessHeader}>
                                <Text style={styles.customProcessTitle}>
                                  Proceso {index + 1}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => eliminarProcesoEnEdicion(index)}
                                  style={styles.deleteButton}
                                >
                                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                                </TouchableOpacity>
                              </View>

                              <Text style={styles.label}>Nombre del proceso</Text>
                              <TextInput
                                style={styles.input}
                                placeholder="Ej: Bordado, Estampado..."
                                value={proceso.nombre}
                                onChangeText={(text) =>
                                  actualizarProcesoEnEdicion(index, "nombre", text)
                                }
                              />

                              <Text style={styles.label}>Precio del proceso</Text>
                              <TextInput
                                style={styles.input}
                                placeholder="0"
                                keyboardType="numeric"
                                value={String(proceso.precio)}
                                onChangeText={(text) =>
                                  actualizarProcesoEnEdicion(index, "precio", text)
                                }
                              />
                            </View>
                          ))}
                        </>
                      )}

                    <Button
                      mode="outlined"
                      onPress={agregarProcesoEnEdicion}
                      style={styles.addProcessButton}
                      icon="plus"
                    >
                      Agregar Proceso Personalizado
                    </Button>

                    {/* TOTAL */}
                    <View style={styles.totalContainerModal}>
                      <Text style={styles.totalLabelModal}>Costo total:</Text>
                      <Text style={styles.totalValueModal}>
                        ${precioTotalEdicion.toLocaleString("es-CO")}
                      </Text>
                    </View>
                  </>
                )}
              </ScrollView>

              <View style={styles.modalActions}>
                <Button mode="outlined" onPress={() => setPrendaEditando(null)}>
                  Cancelar
                </Button>
                <Button mode="contained" onPress={guardarEdicion}>
                  Guardar Cambios
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        {/* Diálogo eliminar */}
        <Portal>
          <Dialog visible={mostrarDialogoEliminar} onDismiss={() => setMostrarDialogoEliminar(false)}>
            <Dialog.Title>Confirmar eliminacion</Dialog.Title>
            <Dialog.Content>
              <Text>
                Estas seguro de eliminar la prenda{" "}
                <Text style={{ fontWeight: "bold" }}>{prendaAEliminar?.referencia}</Text>?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setMostrarDialogoEliminar(false)}>Cancelar</Button>
              <Button onPress={eliminarPrenda} textColor="#FF3B30">
                Eliminar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Layout>
  );
}