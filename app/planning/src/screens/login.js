import React from 'react';
import { View, Text, Button, TextInput, Image,TouchableOpacity  } from 'react-native';
const {layout, text, login, forms, buttons} = require ('../styles/main');

import { Icon } from 'react-native-elements';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }
    render() {
      return (
              <View style = {{ flex: 1, }}>
                    <Image
                        style={login.LoginLogo}
                        source={{uri: 'https://i.pinimg.com/236x/5c/7b/53/5c7b53a7be1dd267f24f7559584d1345.jpg'}}
                    />

                    <View style={[login.LoginFormCont]}>
                        <View style={forms.InputCont}>
                            <TextInput
                                value={this.state.user}
                                style={[forms.Input, forms.CenterAlingment]}
                                onChangeText={(user) => this.setState({user})}
                                placeholder= "usuario"
                                keyboardType = "email-address"
                                autoCapitalize = 'none'
                                onBlur = {()=>{
                                    this.setState({user: this.state.user.toLowerCase().trim()})
                                }}
                            />
                        </View>
                        <View style={forms.InputCont}>
                            <TextInput
                                style={[forms.Input, forms.CenterAlingment]}
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
                            onPress={() => this.props.navigation.navigate('ForgotPassword')}
                            style={text.GralLink}>
                            <Text style={[text.LText, text.TLight]}>
                            Olvidaste Contraseña 
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.loginNav()}
                            disabled={this.state.isDisable}
                            style={[buttons.GralButton, buttons.BLightBlue]}>
                            <Text style={[text.BText, text.TLight]}>
                                Iniciar Sesión
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.loginNav()}
                            disabled={this.state.isDisable}
                            style={[buttons.GralButton, buttons.BLight]}>
                            <Text style={[text.BText, text.TLight,{paddingRight:20}]}>
                                Iniciar Facebook 
                            </Text>
                            <Icon
                              name='facebook'
                              type='font-awesome'
                              color='#3b5998'
                              onPress={() => console.log('hello')}
                               />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.loginNav()}
                            disabled={this.state.isDisable}
                            style={[buttons.GralButton, buttons.BLightBlue]}>
                            <Text style={[text.BText, text.TLight,{paddingRight:20}]}>
                                Registro Gmail
                            </Text>
                            <Icon
                              name='google'
                              type='font-awesome'
                              color='#3b5998'
                              onPress={() => console.log('hello')}
                               />
                        </TouchableOpacity>
                    </View>

                    <View style={layout.GralTextCont}>
                        <Text style={[text.GralText, text.Strong, text.TLight]}>
                        Compañia
                        </Text>
                    </View>

                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('CompanyRegistration_1')}
                        style={[buttons.GralButton, buttons.BLight]}>
                        <Text style={[text.BText, text.TLightBlue]}>
                        Registrar Compañia
                        </Text>
                    </TouchableOpacity>
                    
           </View>
      );
    }
  }
  
  export default Login;