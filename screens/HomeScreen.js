import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      Alert.alert("Error al cerrar sesión", error.message);
    }
  };

  const handleProfile = () => {
    // Lógica para ir a la pantalla de perfil
    console.log("Perfil presionado");
    setMenuVisible(false);
  };

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Barra superior con el logo, el título y el menú de hamburguesa */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.iconButton} onPress={openMenu}>
          <MaterialIcons name="school" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sistema de Gestión Escolar</Text>
        <TouchableOpacity style={styles.iconButton} onPress={openMenu}>
          <MaterialIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal del menú de hamburguesa */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <Pressable style={styles.menuOption} onPress={handleProfile}>
              <Text style={styles.menuText}>Perfil</Text>
            </Pressable>
            <Pressable style={styles.menuOption} onPress={handleLogout}>
              <Text style={styles.menuText}>Cerrar sesión</Text>
            </Pressable>
            <Pressable style={styles.closeMenuButton} onPress={closeMenu}>
              <Text style={styles.closeMenuText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AlumnoList")}
        >
          <FontAwesome5 name="user-graduate" size={50} color="blue" />
          <Text style={styles.cardText}>Alumnos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ProfesorList")}
        >
          <Entypo name="briefcase" size={50} color="blue" />
          <Text style={styles.cardText}>Profesores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            /* Navegar a Grupos */
            navigation.navigate("GrupoList");
          }}
        >
          <FontAwesome5 name="users" size={50} color="blue" />
          <Text style={styles.cardText}>Grupos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("MateriaList")}
        >
          <FontAwesome5 name="book" size={50} color="blue" />
          <Text style={styles.cardText}>Materias</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("PaseLista");
          }}
        >
          <MaterialIcons name="check-box" size={50} color="blue" />
          <Text style={styles.cardText}>Pase de Lista</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => {}}>
          <MaterialIcons name="bar-chart" size={50} color="blue" />
          <Text style={styles.cardText}>Calificaciones</Text>
        </TouchableOpacity>

        {/* Nueva opción: Pase de Lista */}
      </View>
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
  schoolLogo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  iconButton: {
    padding: 5,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    width: "40%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuOption: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 18,
  },
  closeMenuButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  closeMenuText: {
    fontSize: 16,
    color: "blue",
  },
});

export default HomeScreen;
