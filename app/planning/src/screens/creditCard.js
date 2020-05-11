import React from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,ScrollView } from 'react-native';
const {layout, text, forms, buttons,login,colors} = require ('../styles/main');
import ModalSelector from 'react-native-modal-selector';
import Modal from "react-native-modal";
const images = require('./../components/CC');
import { Card, SimpleCard } from "@paraboly/react-native-card";

import {masterValidator} from '../helpers/validations';
import {ReadExpense} from '../helpers/expense_services';
import {getSession} from '../helpers/users_services';

const {DEFINITION_INTEREST,DEFINITION_MANAGEMENT} = require ('../facts/facts');


class CreditCardView extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      textInputValue: '',
      id_expense: navigation.getParam('id_expense', null),
      id_period: navigation.getParam('id_period', null),
      onSession:{name: null, surname:null},
      CreditCardName:null,
      modalInstructor:false,
      management:false

  };
}
async componentDidMount(){
  const onSession = await getSession();
  this.setState({onSession});
  let idUser = onSession.id;
  let Expense = await ReadExpense(idUser,this.state.id_expense,this.state.id_period);

}
  //////////////////////Validations////////////////////////
  validate(kind,state,type,input){
    this.setState({[state] : input});
    var verdict = masterValidator(kind,input);
    this.setState({[type] : verdict});
  }
    render() {
      let index = 0;
      const data = [
          { key: index++, name: 'amex', label:"American Express" },
          { key: index++, name: 'dinners',label: "Dinners Club" },
          { key: index++, name: 'discover',label: "Discover" },
          { key: index++, name: 'mastercard',label:"MasterCard"},
          { key: index++, name: 'visa',label:"Visa" }
      ];
      data.forEach(element => {
        element.image = images[element.name];        
      });
      return(
        <View style={[layout.MainContainer]}>
            <ScrollView
              style = { layout.MainContainerSV }
              showsVerticalScrollIndicator = {true}
            >  
            <View style={layout.PhotoPreviewContSml}>
            <Image
              style={{
                height: 35,
                width: 57,
                position: 'absolute',
                top: 20,
                right: 40,
                zIndex:99  
              }}
              source={{uri: this.state.TypeCard? this.state.TypeCard.image: images['dinners']}}
            />
            <Text style={[text.AlertText],{
                position: 'absolute',
                zIndex:99,
                color:'white',
                fontSize:25,
                top:'40%'
              }}
            >{this.state.CreditCardName}</Text>
              <Text style={[text.AlertText],{
                position: 'absolute',
                zIndex:99,
                color:'white',
                fontSize:21,
                top:'60%'
              }}
            >{this.state.onSession.name} {this.state.onSession.surname}</Text>
              <Text style={[text.AlertText],{
                position: 'absolute',
                zIndex:99,
                color:'white',
                fontSize:21,
                top:'80%'
              }}
              >Nombre</Text>
              <Image
              style={layout.PhotoPreviewImg}
              source={ require('./../../images/card-front.png') }/>
              
            </View>
            <View style={[layout.GralTextCont, {marginBottom: 10,}]}>
                <Text style={[text.GralText, text.Regular]}>
                 Simulación de credito
                </Text>
            </View>

              <View style={layout.InputGroup}>
                <Text style={text.InputLabel}>
                Nombre Tarjeta de Credito
                </Text>
                <View style={[forms.InputCont, forms.LeftAlingment, this.state.CreditCardNameError?forms.AlertInput:null]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(CreditCardName) => this.validate('text','CreditCardName','CreditCardNameError',CreditCardName)}
                        placeholder="Nombre Tarjeta de Credito"
                        keyboardType = "default"
                        value={this.state.name}
                    />
                </View>
                {this.state.CreditCardNameError? 
                  <View style={layout.textAlertCont}>
                      <Text style={[layout.textAlertError, text.Regular]}>
                          Nombre no valido
                      </Text>
                  </View>
                :null}
              </View>

              <View style={layout.InputGroup}>
                <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                    Marca tarjeta 
                </Text>
                <ModalSelector
                    data={data}
                    initValue="Algo"
                    onChange={TypeCard => this.validate('','TypeCard','TypeCardError',TypeCard)}
                    cancelText = "Cancelar"
                    overlayStyle = {forms.PickerOverlay}
                    optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                    optionStyle ={forms.PickerOptionCont}
                    optionTextStyle = {forms.PickerOptionText}
                    selectedItemTextStyle = {[text.Regular, text.TLightBlue]}
                    cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                    cancelTextStyle = {[text.BText, text.TLightBlue]}
                    >                            

                    <View style={[forms.InputCont, forms.LeftAlingment]}>
                        <TextInput
                        style={forms.Picker}
                        editable={false}
                        placeholder= "Seleccionar Tarjeta"
                        value={this.state.TypeCard?this.state.TypeCard.label:''} />
                    </View>
                </ModalSelector>
            </View>
            <View style={[layout.InputGroup]}>
              <TouchableOpacity style={[layout.InputGroup]} 
              onPress={() => {
                this.setState({modalInstructor:true}),
                this.setState({conceptTitle: "Interes Anual"}),
                this.setState({concept: DEFINITION_INTEREST})
              }}>
                <Text style={[text.InputLabel,forms.LeftAlingment]}>
                Intereses Anual(%)<Text style={text.InputLabelQuestion}>¿Que es esto?</Text>
                </Text>
              </TouchableOpacity>
              <View style={[forms.InputCont, forms.LeftAlingment, this.state.InterestError ?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(Interest) => this.validate('numNull','Interest','InterestError',Interest)}
                      placeholder="Ingresar Intereses"
                      keyboardType = "numeric"
                      value={this.state.Interest}
                  />
              </View>
              {this.state.InterestError? 
                <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Interes no valido
                    </Text>
                </View>
              :null}
          </View>
          <View style={layout.InputGroup}>
             <TouchableOpacity style={[layout.InputGroup]} 
                onPress={() => {
                this.setState({modalInstructor:true}),
                this.setState({conceptTitle: "Cuota de Manejo"}),
                this.setState({concept: DEFINITION_MANAGEMENT})
              }}>
                  <Text style={[text.InputLabel,forms.LeftAlingment]}>
                  ¿Cuota de manejo?<Text style={text.InputLabelQuestion}>¿Que es esto?</Text>
                  </Text>
              </TouchableOpacity>
            <ModalSelector
                data={[
                  { key: 0, label:"Si" },
                  { key: 1,label: "No" },
              ]}
                initValue="Algo"
                onChange={management => this.validate('','management','managementError',management)}
                cancelText = "Cancelar"
                overlayStyle = {forms.PickerOverlay}
                optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                optionStyle ={forms.PickerOptionCont}
                optionTextStyle = {forms.PickerOptionText}
                selectedItemTextStyle = {[text.Regular, text.TLightBlue]}
                cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                cancelTextStyle = {[text.BText, text.TLightBlue]}
                >                            
                <View style={[forms.InputCont, forms.LeftAlingment]}>
                    <TextInput
                    style={forms.Picker}
                    editable={false}
                    placeholder= "Seleccionar si tiene cuota de manejo"
                    value={this.state.management?this.state.management.label:''} />
                </View>
            </ModalSelector>
            </View>
            {this.state.management? this.state.management.key == 0 ? 
              <View style={[layout.InputGroup]}>
                <TouchableOpacity style={[layout.InputGroup]} 
                onPress={() => {
                  this.setState({modalInstructor:true}),
                  this.setState({conceptTitle: "Consejo Cuota de manejo"}),
                  this.setState({concept: DEFINITION_INTEREST})
                }}>
                  <Text style={[text.InputLabel,forms.LeftAlingment]}>
                  Cuota de manejo<Text style={text.InputLabelQuestion}>Consejo</Text>
                  </Text>
                </TouchableOpacity>
                <View style={[forms.InputCont, forms.LeftAlingment, this.state.InterestError ?forms.AlertInput:null]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(Interest) => this.validate('numNull','Interest','InterestError',Interest)}
                        placeholder="Ingresar Intereses"
                        keyboardType = "numeric"
                        value={this.state.Interest}
                    />
                </View>
                {this.state.InterestError? 
                  <View style={layout.textAlertCont}>
                      <Text style={[layout.textAlertError, text.Regular]}>
                          Interes no valido
                      </Text>
                  </View>
                :null}
            </View>
          :null:null}

          <TouchableOpacity 
              onPress={() => this.validateMail()}
              style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
              <Text style={[text.BText, text.TLight]}>
                Enviar
              </Text>
          </TouchableOpacity>
        <Modal
          backdropColor = {colors.opacityMain}
          backdropOpacity = {0.9}
          style = { { margin: 0} }
          isVisible={this.state.modalInstructor}
          useNativeDriver={true}
        >  
            <View 
              style={layout.ModalTrialInfoCont}
            >
              <Text style={[text.TravelInfoTitle, text.Regular, text.TAccentPurple]}>
              {this.state.conceptTitle}
              </Text>
              <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
              <SimpleCard
                  titleFontSize = {16}
                  title={this.state.concept}
                />
              </View>
              <View style={[layout.GralTextCont]}>
                  <TouchableOpacity 
                      onPress={() =>{this.setState({modalInstructor: false}),this.props.navigation.navigate('DictionaryScreen') }}
                      style={[buttons.GralButton, buttons.BLinePurple]}>
                      <Text style={[text.BText, text.TAccentPurple]}>
                          Mas información 
                      </Text>
                  </TouchableOpacity>
              </View>
              <View style={[layout.GralTextCont]}>
                  <TouchableOpacity 
                      onPress={() => this.setState({modalInstructor: false})}
                      style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                      <Text style={[text.BText, text.TLight]}>
                          Cerrar 
                      </Text>
                  </TouchableOpacity>
              </View>
            </View>
        </Modal>
        </ScrollView>
        </View>
    );
  }
  }
  
  export default CreditCardView;