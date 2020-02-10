import React from 'react';
import { View, Text ,TouchableOpacity,Modal,TouchableHighlight,FlatList,TextInput,ScrollView,Picker} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Loading from '../components/Loading';
import AddExpense from '../components/AddExpense';
import { Card, SimpleCard } from "@paraboly/react-native-card";

import DateTimePicker from "react-native-modal-datetime-picker";

var {height, width} = Dimensions.get('window');

//////Estilos
const {layout, text, login, forms, buttons} = require ('../styles/main');

import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = { 
      modalVisible:false,
      showIcons:false,
      chosenDate: 'Seleccionar fecha' ,
      chosenDateShow: 'Seleccionar fecha',
      displayTab:true,
    };
}

_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

_handleDatePicked = (date) => {
  this.setState({
      chosenDate : moment(date).format('DD-MM-YYYY')
  });
this.setState({
      chosenDateShow : moment(date).format('DD/MM/YYYY')
  });
  this._hideDateTimePicker();
};

  _setBusyIndicator = (activity_loading, activity_text) => {
    this.setState({activity_loading: activity_loading})
    this.setState({activity_text: activity_text})
  }

  _toggleIcons = () => this.setState({ showIcons: !this.state.showIcons });
  
  static navigationOptions = ({ navigation }) => ({
    headerShown:false
  })
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[text.TravelInfoTitle, text.Regular, text.TBlack]}>
          Relacion de gastos para Agosto
          </Text>
          <View style={layout.MainTabsCont}>
            <TouchableHighlight
              style={[buttons.MainTabButton, !this.state.displayTab ? buttons.MiddleTab : buttons.MainTabButtonActive ]}
              onPress={() => this.setState({displayTab:true})}
              >
                <Text style={[buttons.MainTabText, 
                  !this.state.displayTab ? text.Regular : text.Strong,  
                  !this.state.displayTab ? text.TLightGray: text.TFacebookColor
                  ]}>
                  Resumen
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[buttons.MainTabButton, this.state.displayTab ? buttons.MiddleTab : buttons.MainTabButtonActive ]}
              onPress={() => this.setState({displayTab:false})}
              >
                <Text style={[buttons.MainTabText,
                  this.state.displayTab ? text.Regular : text.Strong,  
                  this.state.displayTab ? text.TLightGray: text.TFacebookColor
                  ]}>
                  Grafica
                </Text>
            </TouchableHighlight>


          </View>
          
          { this.state.displayTab  ?
          <LinearGradient 
            colors={['#00cc74', '#0058cc']}  
            style = {layout.TravelCardCont}>

            <Text style={[text.TravelInfoSubtitle, text.Regular, text.TLight,]}>
              2020/10/11 a  2020/10/12
            </Text>

            <View style={layout.TravelCardInfoCont}>

              <View style={layout.TravelCardInfoColumn}>

                <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                    Ingresos
                </Text>
                <View style={{flexDirection: 'row',}}>
                  <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                  $ 2.350.000,00
                  </Text>
                </View>
              </View>

              <View style={layout.TravelCardInfoColumn}>

                <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                    Egresos
                </Text>

                <View style={{flexDirection: 'row',}}>
                  <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                  $ 2.000.000,00
                  </Text>
                </View>

              </View>

            </View>

          </LinearGradient>
         : 
            <PieChart
              data={[
                {
                  name: 'Arriendo',
                  population: 30,
                  color: 'rgba(131, 167, 234, 0.7)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Servicios',
                  population: 20,
                  color: 'rgba(255,255,255,0.7)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Tarjetas',
                  population: 10,
                  color: 'rgba(0,255,0,0.7)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Ahorros',
                  population: 50,
                  color: 'rgba(0, 0, 255,0.7)',
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
          }
          <FlatList
            data = {[
              {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                title: 'Prima',
                categoria:'0', ///ingreso
                value:'100.000,00'
              },
              {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                title: 'Tarjeta de credito',
                categoria:'1', ///egreso
                value:'100.000,00'
              },
              {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                title: 'Salario',
                categoria:'0', ///ingreso
                value:'100.000,00'
              },

            ]}
            style={layout.MainContainerSV}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => item.categoria ==0 ? null : this.props.navigation.navigate('CreditCard')}
              >
                <View  style={layout.AdminItemCont}>
                  <View style={layout.AdminItemIconCont}>
                    {item.categoria==0 ?                       
                      <Icon
                        name='cash'
                        type='material-community'
                        color='green'
                        backgroundColor='#000000'
                        size={30}
                        
                        />
                      : 
                        <Icon
                        name='cash'
                        type='material-community'
                        color='red'
                        size={30}
                        backgroundColor='#000000'
                        
                        />
                    }
                  </View>
                  <View style={layout.AdminItemTextCont}>
                    <Text style={[layout.AdminItemTextNormal, text.Medium, text.TLightBlue]}>
                      {item.title}
                    </Text>
                    <Text style={[layout.BillItemText, text.Strong, text.TLightGray,]}>
                      {item.value}
                    </Text>
                    </View>
                </View>
              </TouchableOpacity>
            }
          />
            { this.state.showIcons ? 
              <View style={[layout.ButtonsSpends2]}>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  reverse
                  name='arrow-left'
                  type='material-community'
                  color='#f50'
                  backgroundColor='#000000'
                  onPress={() => {this._toggleIcons();} }
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLightGray,]}>Regresar</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='plus'
                  type='material-community'
                  color='#f50'
                  onPress={() => {this.setState({modalVisible : true})}}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLightGray,]}>Agregar {"\n"} Ingreso</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='minus'
                  type='material-community'
                  color='#f50'
                  onPress={() => {this.setState({modalVisible : true})}}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLightGray,]}>Agregar {"\n"} Egreso</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='book-open-variant'
                  type='material-community'
                  color='#f50'
                  backgroundColor='#000000'
                  onPress={() => this.props.navigation.navigate('DictionaryScreen')}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLightGray,]}>Diccionario</Text>
                </View>
              </View>
            :
              <View style={[layout.ButtonsSpends]}>
              <Icon
              reverse
              name='currency-usd'
              type='material-community'
              color='#f50'
              backgroundColor='#000000'
              onPress={() => {this._toggleIcons();} }
              />
              </View>
            }
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
                  Nombre del gasto
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
                  Tipo de gasto
                  </Text>
                  <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                        <Picker
                          selectedValue={this.state.language}
                          style={{height: 50, width: 100}}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                          }>
                          <Picker.Item label="Java" value="java" />
                          <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                  </View>
                  <View style={layout.textAlertCont}>
                          <Text style={[layout.textAlertError, text.Regular]}>
                              Error: Emails no conciden.
                          </Text>
                  </View>
              </View>
              <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                            Fecha
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, 
                         forms.AlertInput]}>
                            <View style={forms.InputInteraction}>
                                
                            </View>
                            <TouchableOpacity
                                style={forms.DatePickerCont}
                                onPress={this._showDateTimePicker}
                            >
                                <Text
                                style={forms.DatePickerText}>
                                    {this.state.chosenDateShow}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        />
                        <View style={layout.textAlertCont}>
                            <Text style={[layout.textAlertError, text.Regular]}>
                                Seleccionar fecha
                            </Text>
                        </View>
                    </View>

              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between',}}> 
                <TouchableOpacity 
                    // onPress={this.props.leftFunction}
                    onPress={() => {this.setState({modalVisible : false})}}
                    style={[buttons.GralButton, buttons.BLineLight, {marginBottom: 0, width: '47%',}]}
                    >
                    <Text style={[text.BText, text.TLightBlue]}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    // onPress={this.props.rightFunction}
                    style={[buttons.GralButton, buttons.BDarkBlue, {marginBottom: 0, width: '47%',}]}
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
        </View> 
      );
    }
  }
  
  export default Home;