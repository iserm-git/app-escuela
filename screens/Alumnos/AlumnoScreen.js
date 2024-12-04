import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

const AlumnoScreen = ({ navigation }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Debes iniciar sesión", [
        { text: "ACEPTAR", onPress: () => navigation.replace("Login") },
      ]);
      return;
    }

    // Recuperar alumnos de Firestore
    const q = query(collection(db, "alumnos"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const alumnosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlumnos(alumnosList);
        setLoading(false);
      },
      (error) => {
        console.error("Error en la carga de alumnos:", error);
        Alert.alert("Error", "No se pudo cargar la lista de alumnos.");
      }
    );

    return () => unsubscribe();
  }, [navigation]);

  // Borrar alumno
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "alumnos", id));
      Alert.alert("Éxito", "Alumno eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
      Alert.alert("Error", "No se pudo eliminar el alumno.");
    }
  };

  // Renderizado de botón eliminar
  const renderDeleteAction = (id) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: "red" }]}
      onPress={() =>
        Alert.alert(
          "Confirmar eliminación",
          "¿Estás seguro de que deseas eliminar este alumno?",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Eliminar", onPress: () => handleDelete(id) },
          ]
        )
      }
    >
      <MaterialIcons name="delete" size={28} color="white" />
    </TouchableOpacity>
  );

  // Renderizado de botón editar
  const renderEditAction = (id) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: "blue" }]}
      onPress={() => navigation.navigate("AlumnoEdit", { alumnoId: id })}
    >
      <MaterialIcons name="edit" size={28} color="white" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Cargando información de alumnos ...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Lista de Alumnos</Text>
        // Botón para agregar alumno
        <TouchableOpacity
          onPress={() => navigation.navigate("AlumnoAdd")}
          style={styles.addButton}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
      {alumnos.length > 0 ? (
        alumnos.map((alumno) => (
          <Swipeable
            key={alumno.id}
            renderRightActions={() => renderDeleteAction(alumno.id)} // Acción de eliminar
            renderLeftActions={() => renderEditAction(alumno.id)} // Acción de editar
          >
            <View style={styles.alumnoCard}>
              <Text style={styles.alumnoNombre}>{alumno.nombre}</Text>
              <Text style={styles.alumnoSem}>Semestre: {alumno.semestre}</Text>
            </View>
          </Swipeable>
        ))
      ) : (
        <Text style={styles.noDataText}>No hay alumnos registrados.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6200ea",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
  addButton: {
    padding: 8,
  },
  alumnoCard: {
    flexDirection: "column",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 10,
  },
  alumnoNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  alumnoSem: {
    fontSize: 16,
    color: "#777",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#777",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
});

export default AlumnoScreen;
