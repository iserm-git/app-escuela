import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

const AlumnoAdd = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [semestre, setSemestre] = useState("");

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Debes iniciar sesión para guardar datos.");
      return;
    }

    if (!nombre || !semestre) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      await addDoc(collection(db, "alumnos"), {
        nombre: nombre,
        semestre: semestre,
        userId: user.uid,
      });

      Alert.alert("Éxito", "Alumno registrado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al agregar el alumno:", error);
      Alert.alert("Error", "Problema al guardar alumno");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Alumno</Text>
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
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default AlumnoAdd;
