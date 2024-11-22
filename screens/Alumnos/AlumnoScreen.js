import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ModalAlumno from "../../components/utils/ModalAlumno"; // Importa el modal

const alumnoImage = require("../../assets/alumno_image1.png");

const AlumnoScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial para la opacidad

  const alumnos = [
    { id: 1, nombre: "Juan Pérez", sem: "7A" },
    { id: 2, nombre: "Ana Gómez", sem: "7A" },
    { id: 3, nombre: "Luis Martínez", sem: "7B" },
    { id: 4, nombre: "Francisco Nuñez", sem: "7A" },
    { id: 5, nombre: "Berenice Aguilar", sem: "7A" },
    { id: 6, nombre: "Jose Hurtado", sem: "7B" },
  ];

  useEffect(() => {
    // Animar la opacidad al montar el componente
    Animated.timing(fadeAnim, {
      toValue: 1, // La vista será completamente visible
      duration: 3000, // Duración de la animación en milisegundos
      useNativeDriver: true, // Usa el driver nativo para mejorar el rendimiento
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="school" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Listado de Alumnos</Text>
        </View>
        {alumnos.map((alumno) => (
          <View key={alumno.id} style={styles.alumnoCard}>
            <Image source={alumnoImage} style={styles.alumnoImage} />
            <View style={styles.alumnoInfo}>
              <Text style={styles.alumnoNombre}>{alumno.nombre}</Text>
              <Text style={styles.alumnoSem}>Semestre: {alumno.sem}</Text>
              <Button
                title="Ver Detalles"
                onPress={() =>
                  navigation.navigate("AlumnoDetails", {
                    nombre: alumno.nombre,
                  })
                }
              />
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Mostrar Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <ModalAlumno
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Animated.View>
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
  alumnoImage: {
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

export default AlumnoScreen;
