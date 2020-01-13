import React from 'react';
import { View, Text, Button } from 'react-native';


class Login extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Login</Text>
          <Button 
            title="Go Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button 
            title="Olvidaste Contraseña?"
            onPress={() => this.props.navigation.navigate('ForgetPassword')}
          />
          <Button 
            title="Registrarse"
            onPress={() => this.props.navigation.navigate('Register')}
          />
          
        </View>
      );
    }
  }
  
  export default Login;