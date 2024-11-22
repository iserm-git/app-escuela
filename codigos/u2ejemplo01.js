import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const alumnoImage = require('./assets/alumno_image1.png');
const logoImage = require('./assets/logoApp.png');


const App = () => {
  const alumnos = [
    { id: 1, nombre: 'Juan Pérez', sem: '7A'},
    { id: 2, nombre: 'Ana Gómez', sem: '7A'},
    { id: 3, nombre: 'Luis Martínez', sem: '7B'},
    { id: 4, nombre: 'Francisco Nuñez', sem: '7A'},
    { id: 5, nombre: 'Berenice Aguilar', sem: '7A'},
    { id: 6, nombre: 'Jose Hurtado', sem: '7B'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>

    <ScrollView style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Lista de Alumnos</Text>
      {alumnos.map((alumno) => (
        <View key={alumno.id} style={styles.alumnoCard}>
          <Image source={alumnoImage} style={styles.alumnoImage} />
          <View style={styles.alumnoInfo}>
            <Text style={styles.alumnoNombre}>{alumno.nombre}</Text>
            <Text style={styles.alumnoSem}>Semestre: {alumno.sem}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  alumnoCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
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
    justifyContent: 'center',
  },
  alumnoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alumnoSem: {
    fontSize: 16,
    color: '#777',
  },
  logo: {
    marginTop: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default App;
