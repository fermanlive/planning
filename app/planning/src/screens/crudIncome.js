import React from 'react';
import { View } from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import {Shapes} from "react-native-background-shapes";

class Dictionary extends React.Component {
    render() {
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
              <Modal
                backdropColor = {colors.opacityMain}
                backdropOpacity = {0.9}
                style = { {padding: 0, margin: 0,} }
                isVisible={this.state.ModalIncome}
                transparent={false}
                >  
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
                                    Monto no valido
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
  
  export default Dictionary;