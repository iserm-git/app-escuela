import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const grupoImage = require("../../assets/grupo_image.png"); // Cambia la imagen a una de grupos
const logoImage = require("../../assets/logoApp.png");

const GrupoDetailScreen = ({ route }) => {
  const { nombre } = route.params;

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <View style={styles.grupoCard}>
        <Image source={grupoImage} style={styles.grupoImage} />
        <View style={styles.grupoInfo}>
          <Text style={styles.grupoNombre}>Detalles del Grupo</Text>
          <Text style={styles.grupoCarrera}>Nombre del Grupo: {nombre}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  grupoCard: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    width: "90%",
    alignItems: "center",
  },
  grupoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  grupoInfo: {
    marginLeft: 20,
    justifyContent: "center",
  },
  grupoNombre: {
    fontSize: 22,
    fontWeight: "bold",
  },
  grupoCarrera: {
    fontSize: 18,
    color: "#777",
  },
  logo: {
    marginTop: 10,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default GrupoDetailScreen;
