import React from 'react';
import { View, Text ,TouchableOpacity,Modal,TouchableHighlight} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
var {height, width} = Dimensions.get('window');
const {layout, text, login, forms, buttons} = require ('../styles/main');

class Home extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Login')}
            style={[buttons.GralButton, buttons.BLightBlue]}>
            <Text style={[text.LText, text.TBlack]}>
             Volver Login 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Profile')}
            style={[buttons.GralButton, buttons.BLightBlue]}>
            <Text style={[text.LText, text.TBlack]}>
             Perfil 
            </Text>
          </TouchableOpacity>
          <PieChart
            data={[
              {
                name: 'Arriendo',
                population: 30,
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Servicios',
                population: 20,
                color: '#F00',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Tarjetas',
                population: 10,
                color: 'green',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Ahorros',
                population: 50,
                color: 'rgb(0, 0, 255)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
            ]}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="20"
            //absolute //for the absolute number remove if you want percentage
          />
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>   
          </Modal>
        </View>
      );
    }
  }
  
  export default Home;