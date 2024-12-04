import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ProfesorEdit = ({ route, navigation }) => {
  const { profesorId } = route.params;
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfesor = async () => {
      try {
        const docRef = doc(db, "profesores", profesorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profesorData = docSnap.data();
          setNombre(profesorData.nombre);
          setCarrera(profesorData.carrera);
          setLoading(false);
        } else {
          Alert.alert(
            "Error",
            "No se encontró información del profesor seleccionado."
          );
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error al consultar información del profesor:", error);
        Alert.alert("Error", "Problema al cargar la información");
        navigation.goBack();
      }
    };

    fetchProfesor();
  }, [profesorId, navigation]);

  // Guardar información del profesor
  const handleSave = async () => {
    if (!nombre || !carrera) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const docRef = doc(db, "profesores", profesorId);
      await updateDoc(docRef, {
        nombre: nombre,
        carrera: carrera,
      });
      Alert.alert(
        "Éxito",
        "Información del Profesor actualizada correctamente"
      );
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error("Error al actualizar información del profesor:", error);
      Alert.alert("Error", "Error al guardar los cambios");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Cargando información del profesor ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Profesor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Profesor"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
      />
      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ProfesorEdit;
