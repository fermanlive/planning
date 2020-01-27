import React from 'react';
import { View, Text ,TouchableOpacity,Modal,TouchableHighlight,TextInput,ScrollView} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Loading from '../components/Loading';
import AddExpense from '../components/AddExpense';


var {height, width} = Dimensions.get('window');

//////Estilos
const {layout, text, login, forms, buttons} = require ('../styles/main');

import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';

class Home extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = { 
      modalVisible:false
    };
}

  _setBusyIndicator = (activity_loading, activity_text) => {
    this.setState({activity_loading: activity_loading})
    this.setState({activity_text: activity_text})
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView
          style = { layout.MainContainerSV }
          showsVerticalScrollIndicator = {false}
          >
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
          <LinearGradient 
            colors={['#c4302b', '#c4302b']}  
            style = {layout.TravelCardCont}>

            <Text style={[text.TravelInfoTitle, text.Regular, text.TLight]}>
              Soy una Alerta
            </Text>
            <Text style={[text.TravelInfoSubtitle, text.Regular, text.TLight,]}>
              2020/10/11 a  2020/10/12
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
          <Text style={[text.TravelInfoTitle, text.Regular, text.TBlack]}>
              Grafica para el mes Agust
            </Text>

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
            <View style={[layout.ButtonsSpends]}>
              <Icon
              reverse
              name='arrow-left'
              type='font-awesome'
              color='#f50'
              backgroundColor='#000000'
              onPress={() => {this.setState({modalVisible : true})}}
              />
              <Icon
              raised
              name='plus'
              type='font-awesome'
              color='#f50'
              onPress={() => {this.setState({modalVisible : true})}}
              />
              <Icon
              raised
              name='minus'
              type='font-awesome'
              color='#f50'
              onPress={() => {this.setState({modalVisible : true})}}
              />
            </View>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>  
                        <View style={[layout.GralTextCont, {marginBottom: 60,}]}>
                  <Text style={[text.GralText, text.Regular]}>
                  Recuperar Contraseña
                  </Text>
              </View>

              <View style={layout.InputGroup}>
                  <Text style={text.InputLabel}>
                  Email
                  </Text>
                  <View style={[forms.InputCont, forms.LeftAlingment,forms.AlertInput]}>
                      <TextInput
                          style={forms.Input}
                          //onChangeText={(email) => this.validate('email','email','emailError',email)}
                          placeholder='Ingresar Email'
                          keyboardType = "email-address"
                      />
                  </View>
                  <View style={layout.textAlertCont}>
                          <Text style={[layout.textAlertError, text.Regular]}>
                            Ingresar Email de forma correcta
                          </Text>
                  </View>
              </View>

              <View style={layout.InputGroup}>
                  <Text style={text.InputLabel}>
                  Confirmacion Email
                  </Text>
                  <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                      <TextInput
                          style={forms.Input}
                          onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                          placeholder="Confirmar Email"
                          keyboardType = "email-address"
                      />
                  </View>
                  <View style={layout.textAlertCont}>
                          <Text style={[layout.textAlertError, text.Regular]}>
                              Error: Emails no conciden.
                          </Text>
                  </View>
              </View>

              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}> 
                <TouchableOpacity 
                    // onPress={this.props.leftFunction}
                    onPress={() => {this.setState({modalVisible : false})}}
                    style={[buttons.GralButton, buttons.BLineLightBlue, {marginBottom: 0, width: '47%',}]}
                    >
                    <Text style={[text.BText, text.TLightBlue]}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    // onPress={this.props.rightFunction}
                    style={[buttons.GralButton, buttons.BLightBlue, {marginBottom: 0, width: '47%',}]}
                    >
                    <Text style={[text.BText, text.TLight]}>
                      Guardar
                    </Text>
                </TouchableOpacity>
                </View>
            </Modal>
            <Loading 
            activity_loading={this.state.activity_loading} 
            activity_text={this.state.activity_text} 
            />
          </ScrollView>
        </View> 
      );
    }
  }
  
  export default Home;