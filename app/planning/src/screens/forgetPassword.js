import React from 'react';
import { View, Text, Button } from 'react-native';


class forgetPassword extends React.Component {
    handlePress = () => {
        console.log(this.props.navigation);
        this.props.navigation.navigate('Home')
    }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>forgetPassword</Text>
          <Button 
            title="Go Back"
            onPress={this.handlePress}
          />
        </View>
      );
    }
  }
  
  export default forgetPassword;