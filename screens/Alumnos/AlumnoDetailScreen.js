// screens/Alumnos/AlumnoDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const alumnoImage = require('../../assets/alumno_image1.png');
const logoImage = require('../../assets/logoApp.png');

const AlumnoDetailScreen = ({ route }) => {
  const { nombre } = route.params;

  return (
    <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
      <View style={styles.alumnoCard}>
        <Image source={alumnoImage} style={styles.alumnoImage} />
        <View style={styles.alumnoInfo}>
          <Text style={styles.alumnoNombre}>Detalles del Alumno</Text>
          <Text style={styles.alumnoSem}>Nombre: {nombre}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  alumnoCard: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    width: '90%',
    alignItems: 'center',
  },
  alumnoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  alumnoInfo: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  alumnoNombre: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  alumnoSem: {
    fontSize: 18,
    color: '#777',
  },
  logo: {
    marginTop: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default AlumnoDetailScreen;
