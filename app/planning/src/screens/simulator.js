import React from 'react';
import { View, Text,TextInput,TouchableOpacity } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');


class Simulator extends React.Component {
    render() {
      return (
        <View style={ [layout.MainContainer, layout.AlignCenter] }>

        </View>
      );
    }
  }
  
  export default Simulator;