import React from 'react';
import { View, Text, Button, TextInput, Image,TouchableOpacity  } from 'react-native';
const {layout, text, login, forms, buttons} = require ('../styles/main');

import { Icon, colors } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
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
                                value={this.state.user}
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
                                onChangeText={(pass) => this.setState({pass})}
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
                            onPress={() => this.props.navigation.navigate('Home')}
                            disabled={this.state.isDisable}
                            style={[buttons.LoginButtons, buttons.ButtonAccentPurple]}>
                            <Text style={[text.BText, text.TLight]}>
                                Iniciar Sesión
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.loginNav()}
                            disabled
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
           </View>
      );
    }
  }
  
  export default Login;