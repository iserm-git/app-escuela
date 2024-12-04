import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

const ProfesorAdd = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "Debes iniciar sesión para guardar datos.");
      return;
    }

    if (!nombre || !carrera) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      await addDoc(collection(db, "profesores"), {
        nombre: nombre,
        semestre: carrera,
        userId: user.uid,
      });

      Alert.alert("Éxito", "Profesor registrado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al agregar el profesor:", error);
      Alert.alert("Error", "Problema al guardar el profesor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Profesor</Text>
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

export default ProfesorAdd;
