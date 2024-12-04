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

const AlumnoEdit = ({ route, navigation }) => {
  const { alumnoId } = route.params;
  const [nombre, setNombre] = useState("");
  const [semestre, setSemestre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const docRef = doc(db, "alumnos", alumnoId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const alumnoData = docSnap.data();
          setNombre(alumnoData.nombre);
          setSemestre(alumnoData.semestre);
          setLoading(false);
        } else {
          Alert.alert(
            "Error",
            "No se encontro información del alumno seleccionado."
          );
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error al consultar información del alumno:", error);
        Alert.alert("Error", "Problema al cargar la información");
        navigation.goBack();
      }
    };

    fetchAlumno();
  }, [alumnoId, navigation]);

  // Guardar información del alumno
  const handleSave = async () => {
    if (!nombre || !semestre) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const docRef = doc(db, "alumnos", alumnoId);
      await updateDoc(docRef, {
        nombre: nombre,
        semestre: semestre,
      });
      Alert.alert("Éxito", "Información de Alumno actualizada correctamente");
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error("Error al actualizar información del alumno:", error);
      Alert.alert("Error", "Error al guardar los cambios");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Cargando información del alumno ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Alumno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Alumno"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Semestre"
        value={semestre}
        onChangeText={setSemestre}
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

export default AlumnoEdit;
