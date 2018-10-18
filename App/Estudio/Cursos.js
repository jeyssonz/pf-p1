/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ListView,Alert,TouchableHighlight} from 'react-native';
import {Container,Content,Header,Form,Input,Item,Button,Label, Icon, List,ListItem} from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';



var data =[]

  
type Props = {};
export default class Cursos extends Component<Props> {

  constructor(props){
    super(props);
     this.ds =new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2 })

    this.state ={
      
      listViewData: data,
      newContact:""
    }
  }

  
  componentDidMount(){

    var that = this

    firebase.database().ref('/contacts').on('child_added',function(data) {

      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({listViewData : newData})
      
    })

  }


  addRow(data){

    var key = firebase.database().ref('/contacts').push().key
    firebase.database().ref('/contacts').child(key).set({name: data})
  }

  async deleteRow(data,secId,rowId,rowMap){

    await firebase.database().ref('contacts/'+data.key).set(null)
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({listViewData: newData});
  }

  showInformation(){
    Alert.alert("Desea habrir el curso");

  }



  
  abrirCurso(data,secId,rowId,rowMap){
    Actions.Curso({title: data.val().name ,name: data.val().name , text:data.key})
 
  }
  render() {
    return (
     <Container style={styles.container}>
       <Header  style={styles.fondo}  title={"Lista de Cursos"}>
         <Content>
           <Item>
             <Input 
             onChangeText ={(newContact)=>this.setState({newContact})}
             placeholder="Agregar Nombre de la materia"/>
             <Button style={{ top: 5 }} onPress={()=>this.addRow(this.state.newContact)}>
               <Icon style={{ fontSize: 18 }}>
                <Text>+</Text>
               </Icon>
             </Button>
           </Item>
         </Content>
       </Header>
       <Content>
         <List
         enableEmptySections
         dataSource={this.ds.cloneWithRows(this.state.listViewData)}
         renderRow={data=>
          <ListItem >
                <Text>{data.val().name}.{"\n"}
                </Text>
          </ListItem>
        }
        

        renderLeftHiddenRow={(data,secId,rowId,rowMap) =>
          <Button full onPress={()=>this.abrirCurso(data,secId,rowId,rowMap)} >
            <Icon name="book"></Icon>
          </Button>
        }

        renderRightHiddenRow={(data,secId,rowId,rowMap) =>
          <Button full danger onPress={()=>this.deleteRow(data,secId,rowId,rowMap)}>
            <Icon name="trash"></Icon>
          </Button>
        }


        leftOpenValue={75}
        rightOpenValue={-75}
         />
       </Content>
     </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fondo:{
    backgroundColor:'#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
