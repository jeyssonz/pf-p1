import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { View } from 'react-native'
import Login from '../Usuario/Login'
import Perfil from '../Usuario/Perfil'
import RC from '../Usuario/Rc'
import cursos from '../Estudio/Cursos'
import curso from '../Estudio/Curso'


const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {Login} title = "Login" initial = {true} />
         <Scene key = "Perfil" component = {Perfil} title = "Perfil" />
         <Scene key = "Rc" component = {RC} title = "Recuperar Cuenta" />
         <Scene key = "Cursos" component = {cursos} title = "Lista de Cursos"  renderLeftButton={<View></View>} />
         <Scene key = "Curso" component = {curso} />
      </Scene>
   </Router>
)
export default Routes