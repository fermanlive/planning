import React from 'react';
import { View, Text ,TouchableOpacity,Modal,TouchableHighlight} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Loading from '../components/Loading';
var {height, width} = Dimensions.get('window');
const {layout, text, login, forms, buttons} = require ('../styles/main');

import LinearGradient from 'react-native-linear-gradient';


class Home extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _setBusyIndicator = (activity_loading, activity_text) => {
    this.setState({activity_loading: activity_loading})
    this.setState({activity_text: activity_text})
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient 
          colors={['#00cc74', '#0058cc']}  
          style = {layout.TravelCardCont}>

          <Text style={[text.TravelInfoTitle, text.Regular, text.TLight]}>
            Usuario con nombre
          </Text>
          <Text style={[text.TravelInfoSubtitle, text.Regular, text.TLight,]}>
             2020/10/11 a  2020/10/12 }
          </Text>

          <View style={layout.TravelCardInfoCont}>

            <View style={layout.TravelCardInfoColumn}>

              <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                   Facturas
              </Text>

            
              <View style={{flexDirection: 'row',}}>
                <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                 112312312
                </Text>
                <View style={layout.CurrencyIndDetail}>
                  <Text style={[layout.CurrencyIndText, text.Medium, text.TTurquoise]}>
                 usd
                  </Text>
                </View>
              </View>
            </View>

            <View style={layout.TravelCardInfoColumn}>

              <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                  912312
              </Text>

              <View style={{flexDirection: 'row',}}>
                <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                  123123
                </Text>
                <View style={layout.CurrencyIndDetail}>
                  <Text style={[layout.CurrencyIndText, text.Medium, text.TTurquoise]}>
                  usd
                  </Text>
                </View>
              </View>

            </View>

          </View>

          <TouchableOpacity 
              onPress={() => {this.haveBills()}}
              style={[buttons.GralButton, buttons.SmlButton, buttons.BLight, {marginTop: 10, width: '100%',}]}>
              <Text style={[text.BText, text.TLightBlue]}>
                enviar
              </Text>
          </TouchableOpacity>

        </LinearGradient>
    
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
          <TouchableHighlight
            onPress={() => {
              this._setBusyIndicator(true, '');
            }}>
            <Text>Mostrar Loading</Text>
          </TouchableHighlight>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>   
          </Modal>
          <Loading 
          activity_loading={this.state.activity_loading} 
          activity_text={this.state.activity_text} 
        />
        </View>
      );
    }
  }
  
  export default Home;