import React from 'react';
import { View, Text,TextInput,TouchableOpacity } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import ModalSelector from 'react-native-modal-selector';

class Simulator extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = {
      textInputValue: ''
  };
}
    render() {
      let index = 0;
      const data = [
          { key: index++, section: true, label: 'Fruits' },
          { key: index++, label: 'Red Apples' },
          { key: index++, label: 'Cherries' },
          { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
          // etc...
          // Can also add additional custom keys which are passed to the onChange callback
          { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
      ];
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
            <View style={[layout.GralTextCont, {marginBottom: 60,}]}>
                <Text style={[text.GralText, text.Regular]}>
                 Simulación de credito
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

                      <View style={{marginBottom: 10,}}>
                          <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                          Tipo de gasto
                        </Text>
                        <ModalSelector
                            data={data}
                            initValue="Algo"
                            onChange={(option)=>{ this.setState({textInputValue:option.label})}}
                            cancelText = 'Cancelar'
                            overlayStyle = {forms.PickerOverlay}
                            optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                            optionStyle ={forms.PickerOptionCont}
                            optionTextStyle = {forms.PickerOptionText}
                            selectedItemTextStyle = {[text.Regular, text.TLightBlue]}
                            cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                            cancelTextStyle = {[text.BText, text.TLightBlue]}
                            >                            

                            <View style={[forms.InputCont, forms.LeftAlingment, 
                            this.state.currencyTypeError ? forms.AlertInput:null]}>
                                <TextInput
                                style={forms.Picker}
                                editable={false}
                                placeholder= 'Tipo de gasto'
                                value={this.state.currencyType?this.state.currencyType.label:''} />
                            </View>

                        </ModalSelector>
                        <View style={layout.textAlertCont}>
                            <Text style={[layout.textAlertError, text.Regular]}>
                                Error
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
            </View>
    );
  }
  }
  
  export default Simulator;