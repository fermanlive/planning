import React from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,ScrollView } from 'react-native';
const {layout, text, forms, buttons,login,colors} = require ('../styles/main');
import ModalSelector from 'react-native-modal-selector';
import Modal from "react-native-modal";
const images = require('./../components/CC');
import { Card, SimpleCard } from "@paraboly/react-native-card";

import {masterValidator} from '../helpers/validations';
import {ReadExpense,CreateCreditCard,ReadCreditCard,UpdateCreditCard} from '../helpers/expense_services';
import {getSession} from '../helpers/users_services';
import {SimpleAlert,TwoButtonsAlert} from '../components/modalAlert';

const {DEFINITION_INTEREST,DEFINITION_MANAGEMENT,DEFINITION_QUOTE} = require ('../facts/facts');


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
      management: { key: 1, label:"No" },
      action:1,
      CreditCardNameError:'',
      TypeCardError:'',
      InterestError:'',
      managementError:'',
      managementFeeError:'',
      SuccessModal:false,
      elements:[
        { key: 0, name: 'amex', label:"American Express" },
        { key: 1, name: 'dinners',label: "Dinners Club" },
        { key: 2, name: 'discover',label: "Discover" },
        { key: 3, name: 'mastercard',label:"MasterCard"},
        { key: 4, name: 'visa',label:"Visa" }
      ]
  };
}
  async componentDidMount(){
    let data = this.state.elements;
    data.forEach(element => {
      element.image = images[element.name];        
    });
    this.setState({elements : data});
    this.setState({TypeCard: data[0]})
    const onSession = await getSession();
    this.setState({onSession});
    let idUser = onSession.id;
    let Expense = await ReadExpense(idUser,this.state.id_expense,this.state.id_period);
    let creditcard = await ReadCreditCard(this.state.id_expense);

    if(creditcard.status){
      creditcard = creditcard.message[0];
      this.setState({action : 2}); //actualizar
      this.setState({CreditCardNameError : false}); 
      this.setState({TypeCardError : false}); 
      this.setState({InterestError : false}); 
      this.setState({managementError : false}); 
      this.setState({managementFeeError : false});
      this.setState({idcredit_card: creditcard.idcredit_card})
      this.setState({CreditCardName: creditcard.name})
      this.setState({TypeCard: data[creditcard.brand]})
      this.setState({Interest: creditcard.interest})
      let managementFee = parseFloat(creditcard.managementFee);
      if(managementFee>0){
        this.setState({management: { key: 0,label: "Si" }});
      }else{
        this.setState({management: { key: 1,label: "No" }});
      }
      this.setState({managementFee: creditcard.managementFee})
    }else{
      this.setState({action : 1}); //crear
    }
  }

  async ValidateSendCreditCard(action){
    var allGood = [0,0,0];//[0,0,0]; //legth equal to zero to remove ignore password fields
    if(this.state.CreditCardNameError === '' || this.state.CreditCardNameError === true) {this.setState({CreditCardNameError : true}); allGood[0]=0}else{allGood[0]=1};
    if(this.state.InterestError === '' || this.state.InterestError === true) {this.setState({InterestError : true}); allGood[1]=0}else{allGood[1]=1};
    let managementFee;
    if(this.state.management.key==0){
     if(this.state.managementFeeError === '' || this.state.managementFeeError === true) 
      {this.setState({managementFeeError : true});allGood[2]=0}else{allGood[2]=1;managementFee=this.state.managementFee};  
    }else{
      allGood[2]=1;
      managementFee = 0;
    }
    let brand  = this.state.TypeCard.key;

    
    if(allGood.reduce((a, b) => a + b, 0) === allGood.length){
      let saveResponse;
      if (action == 1) {
         saveResponse = await CreateCreditCard(this.state.CreditCardName,brand,this.state.Interest,managementFee,this.state.id_expense);
      }else{
         saveResponse = await UpdateCreditCard(this.state.CreditCardName,brand,this.state.Interest,managementFee,this.state.idcredit_card);
      }

      if(saveResponse.status){
        this.setState({SuccessModalLine1: saveResponse.message});
        this.setState({SuccesbuttonLabel: "ok, entendido"});
        this.setState({imageSuccessModal:2})
        this.setState({SuccessModal : true});
        this.setState({modalVisible  : false});
      }else{
        this.setState({SuccessModalLine1: saveResponse.message});
        this.setState({SuccesbuttonLabel: "ok, entendido"});
        this.setState({imageSuccessModal:1})
        this.setState({SuccessModal : true});
        this.setState({modalVisible  : false});
      }
    }
  }
  //////////////////////Validations////////////////////////
  validate(kind,state,type,input){
    this.setState({[state] : input});
    var verdict = masterValidator(kind,input);
    this.setState({[type] : verdict});
  }
    render() {
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
                        value={this.state.CreditCardName}
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
                    data={this.state.elements}
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
                Interes Mensual(%){"  "}<Text style={text.InputLabelQuestion}>¿Que es esto?</Text>
                </Text>
              </TouchableOpacity>
              <View style={[forms.InputCont, forms.LeftAlingment, this.state.InterestError ?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(Interest) => this.validate('num','Interest','InterestError',Interest)}
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
                  ¿Cuota de manejo? {"  "}<Text style={text.InputLabelQuestion}>¿Que es esto?</Text>
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
                  this.setState({concept: DEFINITION_QUOTE})
                }}>
                  <Text style={[text.InputLabel,forms.LeftAlingment]}>
                  Cuota de manejo{" "}<Text style={text.InputLabelQuestion}>Info</Text>
                  </Text>
                </TouchableOpacity>
                <View style={[forms.InputCont, forms.LeftAlingment, this.state.managementFeeError ?forms.AlertInput:null]}>
                    <TextInput
                        style={forms.Input}
                        onChangeText={(managementFee) => this.validate('num','managementFee','managementFeeError',managementFee)}
                        placeholder="Ingresar Cuota de manejo"
                        keyboardType = "numeric"
                        value={this.state.managementFee}
                    />
                </View>
                {this.state.managementFeeError? 
                  <View style={layout.textAlertCont}>
                      <Text style={[layout.textAlertError, text.Regular]}>
                          Cuota no valida
                      </Text>
                  </View>
                :null}
            </View>
          :null:null}
         {this.state.action == 1 ? 
            <TouchableOpacity 
                onPress={() => this.ValidateSendCreditCard(this.state.action)}
                style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                <Text style={[text.BText, text.TLight]}>
                  Enviar
                </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity 
                onPress={() => this.ValidateSendCreditCard(this.state.action)}
                style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                <Text style={[text.BText, text.TLight]}>
                  Actualizar
                </Text>
            </TouchableOpacity>
          }
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
                <SimpleAlert 
                isModalVisible = {this.state.SuccessModal} 
                imageType = {this.state.imageSuccessModal}
                line1 = {this.state.SuccessModalLine1}
                line2 = {this.state.SuccessModalLine2}
                buttonLabel = {this.state.SuccesbuttonLabel}
                closeModal={() => this.setState({SuccessModal: false})}
                />
        </View>
    );
  }
  }
  
  export default CreditCardView;