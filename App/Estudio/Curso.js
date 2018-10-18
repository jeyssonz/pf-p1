'use strict'
import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View,ListView,Alert,TouchableHighlight} from 'react-native';
import {Container,Content,Header,Form,Input,Item,Button,Label, Icon, List,ListItem} from 'native-base';
import firebase from 'firebase';


var datas =[]

type Props = {};
export default class Curso extends Component <Props> {

    constructor(props){
        super(props);
         this.ds =new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2 })
        this.state ={
          listViewData: datas,
          newContact:""
        }
      }
      componentDidMount(){

        var that = this

        firebase.database().ref('/'+this.props.title).on('child_added',function(datas) {
    
          var newData = [...that.state.listViewData]
          newData.push(datas)
          that.setState({listViewData : newData})
          
        })
    
      }
    
    
      addRow(datas){
    
        var key = firebase.database().ref('/'+this.props.title).push().key

        firebase.database().ref('/'+this.props.title).child(key).set({name: datas})
      }
    
      async deleteRow(datas,secId,rowId,rowMap){
    
        await firebase.database().ref(this.props.title+'/'+datas.key).set(null)
        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1)
        this.setState({listViewData: newData});
      }

render(){
return(
<Container style={styles.container}>
    <Header  style={styles.fondo}>
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
    renderRow={(datas)=>
    <ListItem >
            <Text>{datas.val().name}</Text>
    </ListItem>
    }
    renderRightHiddenRow={(datas,secId,rowId,rowMap) =>
    <Button full danger onPress={()=>this.deleteRow(datas,secId,rowId,rowMap)}>
        <Icon name="trash"></Icon>
    </Button>
    }
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