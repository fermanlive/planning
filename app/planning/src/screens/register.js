import React from 'react';
import { View, Text, Button } from 'react-native';


class Register extends React.Component {
    handlePress = () => {
        console.log(this.props.navigation);
        this.props.navigation.navigate('Home')
    }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Register</Text>
          <Button 
            title="Go Back"
            onPress={this.handlePress}
          />
        </View>
      );
    }
  }
  
  export default Register;