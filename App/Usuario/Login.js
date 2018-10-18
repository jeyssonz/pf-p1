import React, {Component} from 'react';
import {Platform,Alert, StyleSheet, Text, View, TextInput,ImageBackground , KeyboardAvoidingView,TouchableOpacity,AsyncStorage} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

type Props = {};
export default class Login extends Component <Props> {

constructor(props){
    super(props);
    this.state ={
        email: '',
        password: ''
    }
}

componentDidMount(){
    var config = {
        apiKey: "AIzaSyBe5PpRON924vUcm5BIiyNc9FsRcGw7aGs",
        authDomain: "cursos-767e8.firebaseapp.com",
        databaseURL: "https://cursos-767e8.firebaseio.com",
        projectId: "cursos-767e8",
        storageBucket: "cursos-767e8.appspot.com",
        messagingSenderId: "974751556469"
        };
        firebase.initializeApp(config);
    

        /*agregar datos al database
        firebase.database().ref('users/004').set(
            {
                name: 'Pheng Sengvuthy 004',
                age: 24
            }
        ).then(() => {
            console.log('INSERTED !');
        }).catch((error) => {
            console.log(error);
        });
        /*/
    this._loadInitialState().done();
}

_loadInitialState = async () =>{
    var value = await AsyncStorage.getItem('user');
    if(value !== null){
        this.props.navigation.navigate('profile');
    }
}
static navigationOptions = {
    title: '- LOGIN -',
    headerStyle: {
        backgroundColor: '#7923AE',
    },
    headerTitleStyle: {
            fontWeight: 'bold',
          },
}

    render(){
        return(
            <ImageBackground style={{width: '100%', height: '100%'}} source={{uri:'https://images.unsplash.com/photo-1528634367987-575029c358d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5d1cc6a76a3ab61e568186ba0e3c812&auto=format&fit=crop&w=1482&q=80'}}>
            
                <View style={styles.container}>
                
                    <TextInput 
                        style={styles.textInput} placeholder='Email'
                        onChangeText={(email) => this.setState({email}) }
                        underlineColorAndroid='transparent'
                        />
                    <TextInput 
                        style={styles.textInput} placeholder='Password'
                        onChangeText={(password) => this.setState({password}) }
                        underlineColorAndroid='transparent'
                        />
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={this.login}>
                      <Text style={styles.btnText}>Log in</Text>
                      </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={this.signUp}>
                      <Text style={styles.btnText}>Sigup</Text>
                      </TouchableOpacity>
                

                    <TouchableOpacity
                      style={styles.btn}
                      onPress={this.Rcuenta}>
                      <Text style={styles.btnText}>Recuperar Cuenta</Text>
                      </TouchableOpacity>
            
                </View>

            </ImageBackground >
       
        );
    }


LEche=()=>{
    Alert.alert("Ok")
}
login =() => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=> {
        Actions.Cursos()
    },(error)=>{
        Alert.alert(error.message);
    });
}

Rcuenta= () => {
    Actions.Rc()
}

signUp= ()=> {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=> {
       Actions.Cursos()
   },(error)=>{
       Alert.alert(error.message);
   });
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
    //  backgroundColor: '#2896d3',
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
        alignSelf: 'center',
        backgroundColor: '#7923AE',
        padding: 10,
        width: '40%',
        alignItems: 'center',
        marginBottom: 10,
    },
    btnText:{
      fontWeight: 'bold',
    },
  });
  