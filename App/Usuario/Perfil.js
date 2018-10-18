'use strict'
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

type Props = {};
export default class Perfil extends Component <Props> {
    render(){
        return(
            <View>
                <Text>Soy el Perfil :)</Text>
            </View>
        );
    }
}
