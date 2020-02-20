import React from 'react';
import { View, Text,TextInput,TouchableOpacity } from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import {Shapes} from "react-native-background-shapes";

class Dictionary extends React.Component {
    render() {
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
            <Shapes
                primaryColor={colors.BackgroundColorDefault}
                secondaryColor={colors.main}
                height={1}
                borderRadius={20}
                figures={[
                {name: 'circle', position: 'center', size: 60},
                {name: 'donut', position: 'flex-start', axis: 'top', size: 80},
                {name: 'circle', position: 'center', axis: 'right', size: 100},
                {name: 'donut', position: 'flex-end', axis: 'right', size: 80},
                {name: 'circle', position: 'flex-end', axis: 'left', size: 100},
                ]}
            />
          </View>
    );
  }
  }
  
  export default Dictionary;