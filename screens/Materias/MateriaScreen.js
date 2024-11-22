import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

const materiaImage = require("../../assets/materia_image.png"); // Cambia la imagen a una de materias

const MateriaScreen = ({ navigation }) => {
  const materias = [
    { id: 1, nombre: "Programación Orientada a Objetos", carrera: "ISC" },
    { id: 2, nombre: "Bases de Datos", carrera: "ISC" },
    { id: 3, nombre: "Redes de Computadoras", carrera: "ISC" },
    { id: 4, nombre: "Sistemas Operativos", carrera: "ISC" },
    { id: 5, nombre: "Ingeniería de Software", carrera: "ISC" },
    { id: 6, nombre: "Matemáticas Discretas", carrera: "ISC" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="school" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Listado de Materias</Text>
        </View>
        {materias.map((materia) => (
          <View key={materia.id} style={styles.materiaCard}>
            <Image source={materiaImage} style={styles.materiaImage} />
            <View style={styles.materiaInfo}>
              <Text style={styles.materiaNombre}>{materia.nombre}</Text>
              <Text style={styles.materiaCarrera}>
                Carrera: {materia.carrera}
              </Text>
              <Button
                title="Ver Detalles"
                onPress={() =>
                  navigation.navigate("MateriaDetails", {
                    nombre: materia.nombre,
                  })
                }
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6200ea", // Color de fondo del encabezado
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  materiaCard: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  materiaImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  materiaInfo: {
    marginLeft: 16,
    justifyContent: "center",
  },
  materiaNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  materiaCarrera: {
    fontSize: 16,
    color: "#777",
  },
  buttonText: {
    color: "blue",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    flex: 1,
    paddingLeft: 20,
  },
  iconButton: {
    padding: 2,
  },
  logo: {
    marginTop: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default MateriaScreen;
