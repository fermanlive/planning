//'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {TextInput,TouchableOpacity,ScrollView,Modal } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');

class AddExpense extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( 
        <View style={ [layout.MainContainer] }>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.activity_loading}>   
         
        <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
            <Text style={[text.GralText, text.Regular]}>
            Agregar un ingreso 
            </Text>
        </View>
         <ScrollView
          style = { layout.MainContainerSV }
          showsVerticalScrollIndicator = {false}
          >
        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Nombre del ingreso
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                    placeholder="Ingresar Nombre ingreso"
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Nombre no valido
                    </Text>
            </View>
        </View>
        <View style={layout.InputGroup}>
            <Text style={text.InputLabel}>
            Monto
            </Text>
            <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                <TextInput
                    style={forms.Input}
                    onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                    placeholder="Ingresar Monto"
                    keyboardType = "email-address"
                />
            </View>
            <View style={layout.textAlertCont}>
                <Text style={[layout.textAlertError, text.Regular]}>
                    Monto no valido
                </Text>
            </View>
        </View>

        <TouchableOpacity 
            onPress={() => this.validateMail()}
            style={[buttons.GralButton, buttons.BLightBlue]}>
            <Text style={[text.BText, text.TLight]}>
              Enviar
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.validateMail()}
            style={[buttons.GralButton, buttons.BLineLightBlue]}>
            <Text style={[text.BText, text.TFacebookColor]}>
              Cancelar
            </Text>
        </TouchableOpacity>
        </ScrollView>
        </Modal>
      </View>
    );
  }
}



export default AddExpense;