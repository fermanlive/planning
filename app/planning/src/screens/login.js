import React from 'react';
import { View, Text, Button, TextInput, Image,TouchableOpacity  } from 'react-native';


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{width:'100%',height:'25%',alignItems: 'center', justifyContent: 'center' }}>
            <Image
            style={{width:'25%',height:'25%'}}
            source={{uri: 'https://i.pinimg.com/236x/5c/7b/53/5c7b53a7be1dd267f24f7559584d1345.jpg'}}
            />
          </View>
          <View>
            <TextInput 
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              // onChangeText={text => onChangeText(text)}
              value=""
              placeholder="Ingresar Usuario"
            />
            <TextInput 
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              // onChangeText={text => onChangeText(text)}
              value=""
              placeholder="Ingresar Contraseña"
            />
            <Button 
              title="Iniciar Sesión"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
          <View>
              <Button 
                title="Olvidaste Contraseña?"
                onPress={() => this.props.navigation.navigate('ForgetPassword')}
              />
              <Button 
                title="Registrarse"
                onPress={() => this.props.navigation.navigate('Register')}
              />
              <TouchableOpacity  
                style={{ height: 40, backgroundColor: '#3b5998', borderWidth: 1 }}
                title="Iniciar Sesion Facebook"
                onPress={() => this.props.navigation.navigate('ForgetPassword')}
              >
                <Text> Iniciar Sesion Facebook </Text>
              </TouchableOpacity>
              <TouchableOpacity  
                style={{ height: 40, backgroundColor: '#FFFFFF', borderWidth: 1 }}
                onPress={() => this.props.navigation.navigate('ForgetPassword')}
              >
                <Text> Iniciar Sesion Google </Text>
              </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  
  export default Login;