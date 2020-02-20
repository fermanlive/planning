import React from 'react';
import { View, Text , Button,Image,TextInput,TouchableOpacity,StyleSheet,Modal} from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';
import {Shapes} from "react-native-background-shapes";

class Profile extends React.Component {
    constructor(props) {
   
        super(props);
        const { navigation } = this.props;
        this.state = { 
          Editable:false,
          modalVisible:false
        };
    }
  _toggleEdit = () => this.setState({ Editable: !this.state.Editable });

    render() {
      return (
        <View style={ [layout.MainContainer, layout.AlignCenter,{backgroundColor:'#66E49B'}] }>
            <Shapes
                primaryColor="#66E49B"
                secondaryColor="#0E9347"
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

  export default Profile;