import React from 'react';
import { View, Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,Modal } from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import ModalSelector from 'react-native-modal-selector';
import { Table, Row, Rows } from 'react-native-table-component';
import {Shapes} from "react-native-background-shapes";

class Simulator extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = {
      textInputValue: '',
      typeCredit:'',
      modalVisible:false,
      typeTransaction:'',
      tableHead: ['Mes','Pago Minimo', 'Interes', 'Pago Total'],
      tableData: [
        ['1','$30,780.50', '$0.00', '$123,122.00'],
        ['2','$35,348.33', '$4,567.83', '$96,909.33'],
        ['3','$32,085.59', '$1,305.09', '$62,866.09'],
        ['4','$31,433.05', '$652.55', '$31,433.05'],
        ['5','$35,348.33', '$4,567.83', '$96,909.33'],
        ['6','$32,085.59', '$1,305.09', '$62,866.09'],
        ['7','$31,433.05', '$652.55', '$31,433.05'],
        ['8','$35,348.33', '$4,567.83', '$96,909.33'],
        ['9','$32,085.59', '$1,305.09', '$62,866.09'],
        ['10','$31,433.05', '$652.55', '$31,433.05'],
        ['11','$35,348.33', '$4,567.83', '$96,909.33'],
        ['12','$32,085.59', '$1,305.09', '$62,866.09'],
        ['13','$31,433.05', '$652.55', '$31,433.05'],
        ['14','$35,348.33', '$4,567.83', '$96,909.33'],
        ['15','$32,085.59', '$1,305.09', '$62,866.09'],
        ['16','$31,433.05', '$652.55', '$31,433.05'],
        ['17','$35,348.33', '$4,567.83', '$96,909.33'],
        ['18','$32,085.59', '$1,305.09', '$62,866.09'],
        ['19','$31,433.05', '$652.55', '$31,433.05']
      ]
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
          <Shapes
            primaryColor={colors.BackgroundColorDefault}
            secondaryColor={colors.main}
            height={1}
            borderRadius={20}
            figures={[
            {name: 'circle', position: 'center', size: 60},
            {name: 'donut', position: 'flex-start', axis: 'top', size: 80},
            {name: 'circle', position: 'center', axis: 'right', size: 100},
            {name: 'donut', position: 'flex-end', axis: 'right', size: 80},
            {name: 'circle', position: 'flex-end', axis: 'left', size: 100},
            ]}
          />
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
                  onPress={() => this.setState({modalVisible:true})}
                  style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                  <Text style={[text.BText, text.TLight]}>
                    Calcular
                  </Text>
              </TouchableOpacity>
            </ScrollView>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>  
             <ScrollView style={{margin:20}}>
                <Text style={[text.TravelInfoTitle, text.Regular, text.TBlack]}>
                  Calculo de intereses
                </Text>
                <Table borderStyle={{borderWidth: 5, borderColor: colors.main}}
                >
                  <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                  <Rows data={this.state.tableData} textStyle={styles.text}/>
                </Table>
                <Text style={{color:'red',textAlign:'justify',paddingTop:'5%'}}>
                  No ingreso el tipo de intereses, conoce el interes que maneja su cuota de credito? 
                </Text>
                <Text style={{textAlign:'justify'}}>
                  Este simualdor ofrece un estimativo de como serian las cuotas mas no 
                  una herramienta oficial del banco.
                </Text>
              </ScrollView>
              <TouchableOpacity 
                onPress={() => this.setState({modalVisible:false})}
                style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                <Text style={[text.BText, text.TLight]}>
                  Cerrar
                </Text>
            </TouchableOpacity>
            </Modal>
            </View>
    );
  }
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: colors.opacityMain },
    text: { margin: 6 }
  });
  export default Simulator;