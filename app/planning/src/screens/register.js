import React from 'react';
import { View, Text,TextInput,TouchableOpacity,ScrollView } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import LinearGradient from 'react-native-linear-gradient';
import {masterValidator} from '../helpers/validations';

class Register extends React.Component {
    constructor(props) {
   
        super(props);        
        this.state = { 
            emailError: false,
            nameError:false,
            surnameError:false,
            passwordError:false,
            confirmPasswordError:false,
            confirmEmailError:false,
            passwordHidden:false,
            name:'',
            surname:'',
            email:'',
            confirmEmail:'',
            password:'',
            confirmPassword:'',
        };
    }
    handlePress = () => {
        this.props.navigation.navigate('Home')
    }
    validate(kind,state,type,input){
        console.warn(kind);
        this.setState({[state] : input});
        var verdict = masterValidator(kind,input);
        this.setState({[type] : verdict});
        console.warn(type,verdict);
    }
    
    async validateSend(){
        var allGood = [0,0,0,0];//[0,0,0,0]; //legth equal to zero to remove ignore password fields

        if(this.state.nameError === '' || this.state.nameError === true) {this.setState({nameError : true}); allGood[0]=0}else{allGood[0]=1};
        if(this.state.surnameError === '' || this.state.surnameError === true) {this.setState({surnameError : true}); allGood[1]=0}else{allGood[1]=1};  
        if(this.state.emailError === '' || this.state.emailError === true) {this.setState({emailError : true}); allGood[2]=0}else{allGood[2]=1};
        if(this.state.passwordError === '' || this.state.passwordError === true) {this.setState({passwordError : true}); allGood[3]=0}else{allGood[3]=1};
        if(this.state.confirmEmailError === '' || this.state.confirmEmailError === true) {this.setState({confirmEmailError : true}); allGood[2]=0}else{allGood[3]=1};
        if(this.state.confirmPasswordError === '' || this.state.confirmPasswordError === true) {this.setState({confirmPasswordError : true}); allGood[3]=0}else{allGood[3]=1};

        // validate password
        var PASS_MIN_LEN = 5;
        if (this.state.password.length>=PASS_MIN_LEN) {

            if (this.state.password!=this.state.confirmPassword) {
                this.setState({confirmPasswordError: true})
                return;
            }
        }

        if(allGood.reduce((a, b) => a + b, 0) === allGood.length){

            const userExist = await validateExistedUser(this.state.email);
            var aux = userExist;
            if(userExist == false){

            }else{

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
              Confirmacion Email
              </Text>
              <View style={[forms.InputCont, forms.LeftAlingment,this.state.confirmEmailError?forms.AlertInput:null]}>
                  <TextInput
                      style={forms.Input}
                      onChangeText={(confirmEmail) => this.validate('email','confirmEmail','confirmEmailError',confirmEmail)}
                      placeholder="Confirmar Email"
                      keyboardType = "email-address"
                  />
              </View>
                {this.state.confirmEmailError?
                    <View style={layout.textAlertCont}>
                            <Text style={[layout.textAlertError, text.Regular]}>
                                Error: Emails no conciden.
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
                      secureTextEntry={this.state.passwordHidden}
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
                      secureTextEntry={this.state.passwordHidden}
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
          <TouchableOpacity 
              onPress={() => this.validateSend()}
              style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
              <Text style={[text.BText, text.TLight]}>
                Enviar
              </Text>
          </TouchableOpacity>
          </ScrollView>
          </LinearGradient>
        </View>
      );
    }
  }
  
  export default Register;