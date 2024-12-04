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

const ProfesorScreen = ({ navigation }) => {
  const [profesores, setProfesores] = useState([]);
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

    // Consultar la colección "profesores" en Firestore
    const q = query(collection(db, "profesores"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const profesoresList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfesores(profesoresList);
        setLoading(false);
      },
      (error) => {
        console.error("Error en la carga de profesores:", error);
        Alert.alert("Error", "No se pudo cargar la lista de profesores.");
      }
    );

    return () => unsubscribe();
  }, [navigation]);

  // Borrar profesor
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "profesores", id));
      Alert.alert("Éxito", "Profesor eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar profesor:", error);
      Alert.alert("Error", "No se pudo eliminar el profesor.");
    }
  };

  // Renderizar botón borrar
  const renderDeleteAction = (id) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: "red" }]}
      onPress={() =>
        Alert.alert(
          "Confirmar eliminación",
          "¿Estás seguro de que deseas eliminar este profesor?",
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

  // Renderizar botón editar
  const renderEditAction = (id) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: "blue" }]}
      onPress={() => navigation.navigate("ProfesorEdit", { profesorId: id })}
    >
      <MaterialIcons name="edit" size={28} color="white" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Cargando información de profesores...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Lista de Profesores</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfesorAdd")}
          style={styles.addButton}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
      {profesores.length > 0 ? (
        profesores.map((profesor) => (
          <Swipeable
            key={profesor.id}
            renderRightActions={() => renderDeleteAction(profesor.id)}
            renderLeftActions={() => renderEditAction(profesor.id)}
          >
            <View style={styles.profesorCard}>
              <Text style={styles.profesorNombre}>{profesor.nombre}</Text>
              <Text style={styles.profesorCarrera}>
                Carrera: {profesor.carrera}
              </Text>
            </View>
          </Swipeable>
        ))
      ) : (
        <Text style={styles.noDataText}>No hay profesores registrados.</Text>
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
  profesorCard: {
    flexDirection: "column",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 10,
  },
  profesorNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profesorCarrera: {
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

export default ProfesorScreen;
