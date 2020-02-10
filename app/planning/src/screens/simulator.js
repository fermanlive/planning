import React from 'react';
import { View, Text,TextInput,TouchableOpacity,ScrollView } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import ModalSelector from 'react-native-modal-selector';

class Simulator extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = {
      textInputValue: '',
      typeCredit:'',
      typeTransaction:''
  };
}
    render() {
      let index = 0;
      const data = [
          { key: index++,  label: 'Tarjeta de credito', value: 0 },
          { key: index++, label: 'Credito Libre Inversión', value:1 },
          { key: index++, label: 'Credito Inmobiliario', value:2 },
          { key: index++, label: 'Credito Educativo', value:3 },
      ];
      const data2 = [
        { key: index++,  label: 'Avances', value: 0 },
        { key: index++, label: 'Compras', value:1 },
    ];
      return(
        <View style={ [layout.MainContainer] }>
          <View style={[layout.GralTextCont, {marginBottom: 60,marginTop:30}]}>
              <Text style={[text.GralText, text.Regular]}>
              Simulacion de credito 
              </Text>
          </View>
          <ScrollView
            style = { layout.MainContainerSV2 }
            showsVerticalScrollIndicator = {false}
            >
            <View style={{marginBottom: 10,}}>
                <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                Tipo de gasto
              </Text>
              <ModalSelector
                  data={data}
                  initValue="Algo"
                  onChange={(option)=>{ this.setState({typeCredit:option})}}
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
                      placeholder= 'Tipo de Credito'
                      value={this.state.typeCredit?this.state.typeCredit.label:''} />
                  </View>
              </ModalSelector>
              {/* <View style={layout.textAlertCont}>
                  <Text style={[layout.textAlertError, text.Regular]}>
                      Error
                  </Text>
              </View> */}
            </View>

            {this.state.typeCredit.value == 0 ? 
            <View style={{marginBottom: 10,}}>
                <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                Tipo de Transacción
              </Text>
              <ModalSelector
                  data={data2}
                  initValue="Algo"
                  onChange={(option)=>{ this.setState({typeTransaction:option})}}
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
                      placeholder= 'Tipo de Transacciones'
                      value={this.state.typeTransaction?this.state.typeTransaction.label:''} />
                  </View>
              </ModalSelector>
              {/* <View style={layout.textAlertCont}>
                  <Text style={[layout.textAlertError, text.Regular]}>
                      Error
                  </Text>
              </View> */}
              </View>
            :null}
            {this.state.typeCredit.value == 0 ? 
            <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Numero de cuotas
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                        placeholder="Ingresar numero de cuotas"
                        keyboardType = "email-address"
                    />
                </View>
                {/* <View style={layout.textAlertCont}>
                        <Text style={[layout.textAlertError, text.Regular]}>
                        Error: valor no Numerico
                        </Text>
                </View> */}
            </View>
            :null}
            {this.state.typeCredit.value==0 ?
            <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Precio
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                        placeholder="Ingresar valor de la compra"
                        keyboardType = "email-address"
                    />
                </View>
                {/* <View style={layout.textAlertCont}>
                        <Text style={[layout.textAlertError, text.Regular]}>
                        Error: valor no Numerico
                        </Text>
                </View> */}
            </View>
            :null}
            {this.state.typeCredit.value==0 ?
            <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Intereses % Efectivo Mensual
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                        placeholder="Confirmar Intereses"
                        keyboardType = "email-address"
                    />
                </View>
                {/* <View style={layout.textAlertCont}>
                        <Text style={[layout.textAlertError, text.Regular]}>
                            Error: valor no Numerico
                        </Text>
                </View> */}
            </View> 
            :null}
              <TouchableOpacity 
                  onPress={() => this.validateMail()}
                  style={[buttons.GralButton, buttons.BLightBlue]}>
                  <Text style={[text.BText, text.TLight]}>
                    Calcular
                  </Text>
              </TouchableOpacity>
            </ScrollView>
            </View>
    );
  }
  }
  
  export default Simulator;