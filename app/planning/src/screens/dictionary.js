import React from 'react';
import { View, Text,TextInput,TouchableOpacity } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');

class Dictionary extends React.Component {
    render() {
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('home')}
                style={[buttons.GralButton, buttons.BLightBlue]}>
                <Text style={[text.BText, text.TLight]}>
                    Regresar al home
                </Text>
            </TouchableOpacity>
          </View>
    );
  }
  }
  
  export default Dictionary;