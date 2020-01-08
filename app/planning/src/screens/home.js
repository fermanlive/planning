import React from 'react';
import { View, Text , Button} from 'react-native';


class Home extends React.Component {
    handlePress = () => {
        console.log(this.props.navigation);
        this.props.navigation.navigate('Login')
    }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home</Text>
          <Button 
            title="Go Login"
            onPress={this.handlePress}
          />
        </View>
      );
    }
  }
  
  export default Home;