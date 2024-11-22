import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation, // Importamos LayoutAnimation
  UIManager,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const grupoImage = require("../../assets/grupo_image.png"); // Cambia la imagen a una de grupos

// Habilitamos LayoutAnimation en Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const GrupoScreen = ({ navigation }) => {
  const [expandedGroup, setExpandedGroup] = useState(null);

  const grupos = [
    { id: 1, nombre: "Grupo 7A", carrera: "ISC" },
    { id: 2, nombre: "Grupo 7B", carrera: "ISC" },
    { id: 3, nombre: "Grupo 8A", carrera: "ISC" },
    { id: 4, nombre: "Grupo 8B", carrera: "ISC" },
    { id: 5, nombre: "Grupo 9A", carrera: "ISC" },
    { id: 6, nombre: "Grupo 9B", carrera: "ISC" },
  ];

  const toggleExpandGroup = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Aplicamos la animación
    setExpandedGroup(expandedGroup === id ? null : id); // Expande o colapsa el grupo
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="school" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Listado de Grupos</Text>
        </View>
        {grupos.map((grupo) => (
          <View key={grupo.id} style={styles.grupoCard}>
            <Image source={grupoImage} style={styles.grupoImage} />
            <View style={styles.grupoInfo}>
              <Text style={styles.grupoNombre}>{grupo.nombre}</Text>
              <Text style={styles.grupoCarrera}>Carrera: {grupo.carrera}</Text>
              <Button
                title="Ver Detalles"
                onPress={() =>
                  navigation.navigate("GrupoDetails", {
                    nombre: grupo.nombre,
                  })
                }
              />
              <TouchableOpacity
                onPress={() => toggleExpandGroup(grupo.id)} // Expande o contrae el grupo al hacer clic
                style={styles.expandButton}
              >
                <Text style={styles.buttonText}>
                  {expandedGroup === grupo.id ? "Contraer" : "Expandir"}
                </Text>
              </TouchableOpacity>
              {expandedGroup === grupo.id && ( // Si el grupo está expandido, muestra detalles adicionales
                <View style={styles.extraInfo}>
                  <Text>Detalles adicionales sobre {grupo.nombre}...</Text>
                </View>
              )}
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
  grupoCard: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  grupoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  grupoInfo: {
    marginLeft: 16,
    justifyContent: "center",
  },
  grupoNombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  grupoCarrera: {
    fontSize: 16,
    color: "#777",
  },
  buttonText: {
    color: "blue",
  },
  expandButton: {
    marginTop: 10,
  },
  extraInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
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

export default GrupoScreen;
