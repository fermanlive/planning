import React from 'react';
import { View, Text, TextInput, Image,TouchableOpacity, Platform  } from 'react-native';
const {layout, text, login, forms, buttons} = require ('../styles/main');
const CONST = require('../constants/constants');

import { Icon, colors } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import {RequestLogin,getSession,clearCredentials} from '../helpers/users_services';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import {SimpleAlert} from '../components/modalAlert';
import Loading from '../components/Loading';
import { AccessToken,GraphRequest, GraphRequestManager  } from 'react-native-fbsdk';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
        count: 0, 
        user: null,
        password:null,
        isErrorModalVisible:false,
        buttonLabel:'ok, entendido',
        modalLine1:'',
        passwordHidden:true,

    }
  }

  async login(){
    this.setBusyIndicator(true, '');
    var loginResponse = await RequestLogin(this.state.user,this.state.password);
    
    if(loginResponse.status){
        this.setBusyIndicator(false, '');
        this.props.navigation.navigate('Home');
    }else{
        this.setState({modalLine1: loginResponse.message});
        this.setState({isErrorModalVisible: true});
        this.setBusyIndicator(false, '');
    }
   }

   setBusyIndicator = (activity_loading, activity_text) => {
    this.setState({activity_loading: activity_loading})
    this.setState({activity_text: activity_text})
    }

    async componentDidMount(){

      NetInfo.fetch().then(state => {
        if(!state.isConnected){
          this.props.navigation.navigate('Simulator',{online:false});
        }
      });
      const onSession = await getSession();
      if (typeof onSession.id !== 'undefined') {
        this.props.navigation.navigate('Home');
      }
    }

    handleFacebookLogin = async () => {
        this.setBusyIndicator(true, '')
        LoginManager.logInWithPermissions(['public_profile', 'email']).then( (result, error) => {
          if (error) {
            alert('Login fail with error: ' + error);
          }
          else if (result) {
            if (result.isCancelled) {
            }
            else {
              AccessToken.getCurrentAccessToken().then( async (data) => {
                let accessToken = data.accessToken
                const responseInfoCallback = async (error, result) => {
                  if (error) {
                      alert('Error fetching data: ' + error.toString());
                  } else {
                    const parameters = [result.id,result.first_name,result.last_name,result.picture.data.url,result.email,accessToken];
                    if (!result.email || result.email == null || result.email == "") {
                      Alert.alert('Error de inicio de sesión con Facebook', 'Tu cuenta de Facebook no tiene asociada un correo electrónico público. Regístrate usando tu correo electrónico y contraseña.',
                      [
                        {text: 'Cancelar', onPress: () => {}},
                        {text: 'Registrar con correo', onPress: () => this.navigator.navigate('Register', {})},
                      ])
                    }
                    else {
                        var ValidateEmailparametros= `email/`+ result.email;
                        var validateExistedUser=  fetch(CONST.URL_REQUEST + "users/validateExistedUser/"+ ValidateEmailparametros,{
                            method: 'GET', 
                            headers: { 'Accept': 'application/json', 
                            'Content-Type': 'application/json', 
                            }
                        })
                        .then((response) => response.json()) 
                        .then((validateExistedUserResponse)=> {
                            if(validateExistedUserResponse.status){
                                var parametros= `email/`+ result.email + `/password/`+"default"+ `/name/`+result.first_name+ `/surname/`+result.last_name;
                                var data=  fetch(CONST.URL_REQUEST + "users/CreateUser/"+ parametros,{
                                    method: 'GET', 
                                    headers: { 'Accept': 'application/json', 
                                    'Content-Type': 'application/json', 
                                    }
                                })
                                .then((response) => response.json()) 
                                .then((CreateUser)=> {
                                let parametrosLogin= `email/`+ result.email + `/password/`+"default";
                                var data=  fetch(CONST.URL_REQUEST + "users/Login/"+ parametrosLogin,{
                                    method: 'GET', 
                                    headers: { 'Accept': 'application/json', 
                                    'Content-Type': 'application/json', 
                                    }
                                })
                                .then((response) => response.json()) 
                                .then((loginResponse)=> {
                                    if(loginResponse.status){
                                        var session = {id:loginResponse.Userinfo.idusers, name:loginResponse.Userinfo.name, surname:loginResponse.Userinfo.surname, email:loginResponse.Userinfo.email};
                                        AsyncStorage.setItem('session', JSON.stringify(session));
                                        this.props.navigation.navigate('Home');
                                    }
                                })
                            })

                            }else{
                                let parametrosLogin= `email/`+ result.email + `/password/`+"default";
                                var data=  fetch(CONST.URL_REQUEST + "users/Login/"+ parametrosLogin,{
                                    method: 'GET', 
                                    headers: { 'Accept': 'application/json', 
                                    'Content-Type': 'application/json', 
                                    }
                                })
                                .then((response) => response.json()) 
                                .then((loginResponse)=> {
                                    if(loginResponse.status){
                                        var session = {id:loginResponse.Userinfo.idusers, name:loginResponse.Userinfo.name, surname:loginResponse.Userinfo.surname, email:loginResponse.Userinfo.email};
                                        AsyncStorage.setItem('session', JSON.stringify(session));
                                        this.setBusyIndicator(false, '');
                                        this.props.navigation.navigate('Home');
                                    }
                                })
                            }
                        })
                    }
                  }
                }
                const infoRequest = new GraphRequest( '/me', {
                    accessToken: accessToken,
                    parameters: {
                      fields: {
                        string: 'first_name,middle_name,last_name,picture,email'
                      }
                    }
                  },
                  responseInfoCallback
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start()
              })
            }
          }
        })
      }
    
    render() {

        
      return (
              <View style = {{ flex: 1, }}>
                    <LinearGradient 
                    colors={['#89C763', '#0E9347']}
                    style={{ height: '100%' }}
                    >
                    <View style={[login.LoginFormCont]}>
                        <Image
                            style={login.LoginLogo}
                            source={require('./../../images/planning_logo.png')}
                        />
                        <Text style={[text.StrongI, text.TLight]}>
                            Planning 
                        </Text>
                        <View style={forms.InputContentLogin}>
                            <TextInput
                                style={[forms.InputLogin, forms.CenterAlingment]}
                                onChangeText={(user) => this.setState({user})}
                                placeholder= "Usuario"
                                keyboardType = "email-address"
                                autoCapitalize = 'none'
                                onBlur = {()=>{
                                    this.setState({user: this.state.user.toLowerCase().trim()})
                                }}
                            />
                        </View>
                        <View style={forms.InputContentLogin}>
                            <TextInput
                                style={[forms.InputLogin, forms.CenterAlingment]}
                                onChangeText={(password) => this.setState({password})}
                                placeholder="Contraseña"
                                secureTextEntry={this.state.passwordHidden}
                            />
                            <TouchableOpacity 
                                onPress={() => this.changePass()}
                                style={forms.InputInteraction}>
                               
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ForgetPassword')}
                            style={text.GralLink}>
                            <Text style={[text.StrongI, text.TLight]}>
                            Olvidaste Contraseña 
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.login()}
                            disabled={this.state.isDisable}
                            style={[buttons.LoginButtons, buttons.ButtonAccentPurple]}>
                            <Text style={[text.BText, text.TLight]}>
                                Iniciar Sesión
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.handleFacebookLogin()}
                            style={[buttons.LoginButtons, buttons.ButtonFacebook]}>
                            <Text style={[text.BText, text.TLight,{paddingRight:20}]}>
                                Iniciar Facebook 
                            </Text>
                            <Icon
                              name='facebook'
                              type='font-awesome'
                              color='#FFFFFF'
                               />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.loginNav()}
                            disabled
                            style={[buttons.LoginButtons, buttons.ButtonGmail]}>
                            <Text style={[text.BText, text.TLight,{paddingRight:20}]}>
                                Registro Gmail
                            </Text>
                            <Icon
                              name='google'
                              type='font-awesome'
                              color='#FFFFFF'
                               />
                        </TouchableOpacity>
                        <View style={layout.GralTextCont,{marginTop:'20%'}}>
                        <Text style={[text.GralText, text.Strong, text.TLight]}>
                            Registro
                            </Text>
                        </View>

                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Register')}
                            style={[buttons.LoginButtons, buttons.ButtonRegisterLogin]}>
                            <Text style={[text.BText],{color:'#7C0E93'}}>
                            Registrarse Aqui
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </LinearGradient>
                    <SimpleAlert 
                        isModalVisible = {this.state.isErrorModalVisible} 
                        imageType = {1}
                        line1 = {this.state.modalLine1}
                        line2 = ""
                        buttonLabel = {this.state.buttonLabel}
                        closeModal={() => this.setState({isErrorModalVisible: false})}
                    />
                    <Loading 
                    activity_loading={this.state.activity_loading} 
                    activity_text={this.state.activity_text} 
                    />
           </View>
      );
    }
  }
  
  export default Login;