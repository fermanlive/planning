import React from 'react';
import { View, Text,TextInput,TouchableOpacity } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');

class forgetPassword extends React.Component {
    render() {
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
            <View style={[layout.GralTextCont, {marginBottom: 60,}]}>
                <Text style={[text.GralText, text.Regular]}>
                 Recuperar Contraseña
                </Text>
            </View>

            <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Email
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment,forms.AlertInput]}>
                    <TextInput
                        style={forms.Input}
                        //onChangeText={(email) => this.validate('email','email','emailError',email)}
                        placeholder='Ingresar Email'
                        keyboardType = "email-address"
                    />
                </View>
                <View style={layout.textAlertCont}>
                        <Text style={[layout.textAlertError, text.Regular]}>
                          Ingresar Email de forma correcta
                        </Text>
                </View>
            </View>

            <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Confirmacion Email
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                        placeholder="Confirmar Email"
                        keyboardType = "email-address"
                    />
                </View>
                <View style={layout.textAlertCont}>
                        <Text style={[layout.textAlertError, text.Regular]}>
                            Error: Emails no conciden.
                        </Text>
                </View>
            </View>

            <TouchableOpacity 
                onPress={() => this.validateMail()}
                style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                <Text style={[text.BText, text.TLight]}>
                  Enviar
                </Text>
            </TouchableOpacity>
            </View>
    );
  }
  }
  
  export default forgetPassword;