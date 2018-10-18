'use strict'
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground,
    Alert,
    TouchableOpacity
} from 'react-native'
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';



type Props = {};
export default class Rc extends Component <Props> {

    constructor(props){
        super(props);
        this.state ={
            email: '',
        };
    }

    Enviar=()=>{
        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(()=>{
            Alert.alert("LA Contraseña a sido enviada al email.");
        }, (error)=>{
            Alert.alert(error.menssage);
        });
    }
    render(){
        return(
            <ImageBackground style={{width: '100%', height: '100%'}} source={{uri:'https://images.unsplash.com/photo-1532259102610-2a92187336d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b0006f2555f88730e5ede5ac40fa46eb&auto=format&fit=crop&w=1567&q=80'}}>
                <View style={styles.container}>
                   
                    <TextInput 
                        style={styles.textInput} placeholder='Email'
                        onChangeText={(email) => this.setState({email}) }
                        underlineColorAndroid='transparent'
                        />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.Enviar}>
                        <Text>Enviar Correo</Text>
                        </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    warper:{
        flex: 1,
    },  
    container: {
      marginVertical:-50,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: '#2896d3',
      paddingLeft: 40,
      paddingRight: 40,
    },
    header:{
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold',
    },
    textInput:{
        alignSelf: 'stretch',
        padding: 16,
        marginBottom:20,
        backgroundColor: '#fff',
    },
    btn:{
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
  });
  