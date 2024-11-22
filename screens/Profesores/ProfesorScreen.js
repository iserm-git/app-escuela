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

const profesorImage = require("../../assets/profesor_image1.png");

const ProfesorScreen = ({ navigation }) => {
  const profesores = [
    { id: 1, nombre: "Antonio Suárez Zinzun", carrera: "ISC" },
    { id: 2, nombre: "Roberto Suárez Zinzun", carrera: "ISC" },
    { id: 3, nombre: "Francisco Rodríguez Díaz", carrera: "ISC" },
    { id: 4, nombre: "Ana Celia Segundo Sevilla", carrera: "ISC" },
    { id: 5, nombre: "Claudia Baeza Lara", carrera: "ISC" },
    { id: 6, nombre: "Ricardo García Cruz", carrera: "ISC" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="school" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Listado de Profesores</Text>
        </View>
        {profesores.map((profesor) => (
          <View key={profesor.id} style={styles.alumnoCard}>
            <Image source={profesorImage} style={styles.profesorImage} />
            <View style={styles.alumnoInfo}>
              <Text style={styles.alumnoNombre}>{profesor.nombre}</Text>
              <Text style={styles.alumnoSem}>Carrera: {profesor.carrera}</Text>
              <Button
                title="Ver Detalles"
                onPress={() =>
                  navigation.navigate("AlumnoDetails", {
                    nombre: alumno.nombre,
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
  alumnoCard: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  profesorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  alumnoInfo: {
    marginLeft: 16,
    justifyContent: "center",
  },
  alumnoNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  alumnoSem: {
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

export default ProfesorScreen;
