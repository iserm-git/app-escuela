// navigation.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AlumnoScreen from "./screens/Alumnos/AlumnoScreen";
import AlumnoDetailScreen from "./screens/Alumnos/AlumnoDetailScreen";
import AlumnoAdd from "./screens/Alumnos/AlumnoAdd";
import AlumnoEdit from "./screens/Alumnos/AlumnoEdit";
import ProfesorScreen from "./screens/Profesores/ProfesorScreen";
// import ProfesorDetailScreen from "./screens/Profesores/ProfesorDetailScreen";
import ProfesorAdd from "./screens/Profesores/ProfesorAdd";
import ProfesorEdit from "./screens/Profesores/ProfesorEdit";
import GrupoScreen from "./screens/Grupos/GrupoScreen";
import GrupoDetailScreen from "./screens/Grupos/GrupoDetailScreen";
import MateriaScreen from "./screens/Materias/MateriaScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Iniciar Sesión" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Menú" }}
      />
      <Stack.Screen
        name="AlumnoList"
        component={AlumnoScreen}
        options={{ title: "Lista de Alumnos" }}
      />
      <Stack.Screen
        name="AlumnoDetails"
        component={AlumnoDetailScreen}
        options={{ title: "Detalle de alumno" }}
      />
      <Stack.Screen
        name="AlumnoAdd"
        component={AlumnoAdd}
        options={{ title: "Agregar Alumno" }}
      />
      <Stack.Screen
        name="AlumnoEdit"
        component={AlumnoEdit}
        options={{ title: "Editar Alumno" }}
      />
      <Stack.Screen
        name="ProfesorList"
        component={ProfesorScreen}
        options={{ title: "Lista de Profesores" }}
      />
      {/* <Stack.Screen
        name="ProfesorDetails"
        component={ProfesorDetailScreen}
        options={{ title: "Detalle de alumno" }}
      /> */}
      <Stack.Screen
        name="ProfesorAdd"
        component={ProfesorAdd}
        options={{ title: "Agregar Profesor" }}
      />

      <Stack.Screen
        name="ProfesorEdit"
        component={ProfesorEdit}
        options={{ title: "Editar Profesor" }}
      />
      <Stack.Screen
        name="MateriaList"
        component={MateriaScreen}
        options={{ title: "Lista de Materias" }}
      />
      <Stack.Screen
        name="GrupoList"
        component={GrupoScreen}
        options={{ title: "Lista de Grupos" }}
      />
      <Stack.Screen
        name="GrupoDetails"
        component={GrupoDetailScreen}
        options={{ title: "Detalle de alumno" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
