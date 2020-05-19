import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { View, Text,TextInput,TouchableOpacity,ScrollView } from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import LinearGradient from 'react-native-linear-gradient';
import {masterValidator} from '../helpers/validations';
import {validateExistedUser,CreateUser} from '../helpers/users_services';
import Modal from "react-native-modal";
import { Card, SimpleCard } from "@paraboly/react-native-card";

import {SimpleAlert} from '../components/modalAlert';
import Loading from '../components/Loading';

class Register extends React.Component {
    constructor(props) {
   
        super(props);        
        this.state = { 
            emailError: '',
            nameError:'',
            surnameError:'',
            passwordError:'',
            confirmPasswordError:'',
            confirmEmailError:'',
            passwordHidden:'',
            name:'',
            surname:'',
            email:'',
            confirmEmail:'',
            password:'',
            confirmPassword:'',
            terms:true,
            termsModal:false,
            optin:false,
            optinError:false,
            isModalVisible:false,
            isErrorModalVisible:false,
            buttonLabel:'ok, entendido'

        };
    }
    handlePress = () => {
        this.props.navigation.navigate('Home')
    }
    validate(kind,state,type,input){
        this.setState({[state] : input});
        var verdict = masterValidator(kind,input);
        this.setState({[type] : verdict});
    }
    closeModal(){
        this.toggleModal();
        this.props.navigation.pop();
    }
    toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    setBusyIndicator = (activity_loading, activity_text) => {
        this.setState({activity_loading: activity_loading})
        this.setState({activity_text: activity_text})
    }
    
    async validateSend(){
        var allGood = [0,0,0,0];//[0,0,0,0]; //legth equal to zero to remove ignore password fields

        if(this.state.nameError === '' || this.state.nameError === true) {this.setState({nameError : true}); allGood[0]=0}else{allGood[0]=1};
        if(this.state.surnameError === '' || this.state.surnameError === true) {this.setState({surnameError : true}); allGood[1]=0}else{allGood[1]=1};  
        if(this.state.emailError === '' || this.state.emailError === true) {this.setState({emailError : true}); allGood[2]=0}else{allGood[2]=1};
        if(this.state.passwordError === '' || this.state.passwordError === true) {this.setState({passwordError : true}); allGood[3]=0}else{allGood[3]=1};
        if(this.state.confirmPasswordError === '' || this.state.confirmPasswordError === true) {this.setState({confirmPasswordError : true}); allGood[3]=0}else{allGood[3]=1};

        // if(!this.state.optin){
        //     this.setState({optinError: true});
        //     return;
        // }else{
        //     this.setState({optinError: false});
        // }
        // validate password
        var PASS_MIN_LEN = 5;
        if (this.state.password.length>=PASS_MIN_LEN) {
            if (this.state.password!=this.state.confirmPassword) {
                this.setState({confirmPasswordError: true})
                return;
            }
        }

        if(!this.state.terms){
            return;
        }

        if(allGood.reduce((a, b) => a + b, 0) === allGood.length){
            this.setBusyIndicator(true, '');
            var userExist = await validateExistedUser(this.state.email);
            if(!userExist.status){
                this.setBusyIndicator(false, '');
                this.setState({isErrorModalVisible: true});
                this.setState({modalLine1: 'El email '+this.state.email+', ya fue registrado anteriormente'});
            }else{
                this.setBusyIndicator(false, '');
                var CreateUserResponse = await CreateUser(this.state.email,this.state.password,this.state.name,this.state.surname);
                this.setState({modalLine1: CreateUserResponse.message});
                this.setState({isModalVisible: true});
            }
        }

    }

    render() {
      return (
        <View style = {{ flex: 1, }}>
        <LinearGradient 
        colors={['#89C763', '#0E9347']}
        style={{ height: '100%', width:'100%' }}
        >
          <View style={[layout.GralTextCont, {marginBottom: 60,marginTop:30}]}>
              <Text style={[text.GralText, text.Regular]}>
              Registro 
              </Text>
          </View>
          <ScrollView
            style = { layout.MainContainerSV }
            showsVerticalScrollIndicator = {false}
            >
          <View style={layout.InputGroup}>
              <Text style={text.InputLabel}>
              Nombres
              </Text>
              <View style={[forms.InputCont, forms.LeftAlingment, this.state.nameError?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(name) => this.validate('text','name','nameError',name)}
                      placeholder="Ingresar Nombres"
                      keyboardType = "email-address"
                  />
              </View>
                {this.state.nameError? 
                    <View style={layout.textAlertCont}>
                            <Text style={[layout.textAlertError, text.Regular]}>
                                Nombres no validos
                            </Text>
                    </View>
                :null}
          </View>
          <View style={layout.InputGroup}>
              <Text style={text.InputLabel}>
              Apellidos
              </Text>
              <View style={[forms.InputCont, forms.LeftAlingment, this.state.surnameError?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(surname) => this.validate('text','surname','surnameError',surname)}
                      placeholder="Apellido"
                      keyboardType = "email-address"
                  />
              </View>
              {this.state.surnameError? 
                <View style={layout.textAlertCont}>
                        <Text style={[layout.textAlertError, text.Regular]}>
                            Apellido no valido
                        </Text>
                </View>
              :null}   
          </View>

          <View style={layout.InputGroup}>
              <Text style={text.InputLabel}>
              Email
              </Text>
              <View style={[forms.InputCont, forms.LeftAlingment,this.state.emailError?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(email) => this.validate('email','email','emailError',email)}
                      placeholder='Ingresar Email'
                      keyboardType = "email-address"
                  />
              </View>
              {this.state.emailError?
              <View style={layout.textAlertCont}>
                      <Text style={[layout.textAlertError, text.Regular]}>
                        Ingresar Email de forma correcta
                      </Text>
              </View>
             :null}
          </View>

          <View style={layout.InputGroup}>
              <Text style={text.InputLabel}>
              Contraseña
              </Text>
              <View style={[forms.InputCont, forms.LeftAlingment, this.state.confirmPasswordError?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(password) => this.validate('nit','password','passwordError',password)}
                      placeholder="Ingresar contraseña"
                      secureTextEntry={true}
                  />
              </View>
                {this.state.confirmPasswordError?
                    <View style={layout.textAlertCont}>
                            <Text style={[layout.textAlertError, text.Regular]}>
                                Contraseña no valida debe ser mayor a 5 caracteres
                            </Text>
                    </View>
                :null}
          </View>
          <View style={layout.InputGroup}>
              <Text style={text.InputLabel}>
              Confimar Contraseña
              </Text>
              <View style={[forms.InputCont, forms.LeftAlingment, this.state.confirmPasswordError?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(confirmPassword) => this.validate('nit','confirmPassword','confirmPasswordError',confirmPassword)}
                      placeholder="Confirmar contraseña"
                      secureTextEntry={true}
                  />
              </View>
              {this.state.confirmPasswordError?
                <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Contraseña no conciden
                    </Text>
                </View>
              :null}
          </View>
          <View style={layout.InputGroup}>
            <CheckBox
                disabled={false}
                value={this.state.terms}
                onValueChange={()=>{this.setState({terms: !this.state.terms})}}
            />
            <TouchableOpacity
                onPress={()=>this.setState({termsConditions: true})}
            >
              <Text style={text.InputLabel}>
                Aceptar terminos y condiciones.
              </Text>       
            </TouchableOpacity>    
              {!this.state.terms?
                <View style={layout.textAlertCont}>
                    <Text style={[layout.textAlertError, text.Regular]}>
                        Se debe aceptar terminos y condiciones para continuar.
                    </Text>
                </View>
              :null}
          </View>
          <TouchableOpacity 
              onPress={() => this.validateSend()}
              style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
              <Text style={[text.BText, text.TLight]}>
                Enviar
              </Text>
          </TouchableOpacity>
          </ScrollView>
          </LinearGradient>
            <SimpleAlert 
                isModalVisible = {this.state.isModalVisible} 
                imageType = {2}
                line1 = {this.state.modalLine1}
                line2 = {this.state.modalLine2}
                buttonLabel = {this.state.buttonLabel}
                closeModal={() => this.closeModal()}
            />
            <SimpleAlert 
                isModalVisible = {this.state.isErrorModalVisible} 
                imageType = {1}
                line1 = {this.state.modalLine1}
                line2 = {this.state.modalLine2}
                buttonLabel = {this.state.buttonLabel}
                closeModal={() => this.setState({isErrorModalVisible: !this.state.isErrorModalVisible})}
            />
            <Loading 
            activity_loading={this.state.activity_loading} 
            activity_text={this.state.activity_text} 
            />
            <Modal
                backdropColor = {colors.opacityMain}
                backdropOpacity = {0.9}
                style = { { margin: 0} }
                isVisible={this.state.termsModal}
                useNativeDriver={true}
                >  
                    <View 
                    style={layout.ModalTrialInfoCont}
                    >
                    <Text style={[text.TravelInfoTitle, text.Regular, text.TAccentPurple]}>
                     Terminos y Condiciones
                    </Text>
                    <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                    <SimpleCard
                        titleFontSize = {16}
                        title={"Autorizo a Daniel Fernando Murcia Perdom y Luis Edwin Rodriguez, para que, de manera libre, expresa, voluntaria, y debidamente informada, le puedan dar tratamiento a los datos que he suministrado en este formulario. "}
                        />
                    </View>
                    <View style={[layout.GralTextCont]}>
                        <TouchableOpacity 
                            onPress={() => this.setState({termsModal: false})}
                            style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                            <Text style={[text.BText, text.TLight]}>
                                Cerrar 
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
        </View>
      );
    }
  }
  
  export default Register;