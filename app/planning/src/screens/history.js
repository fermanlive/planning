import React from 'react';
import { View, Text ,TouchableOpacity,Modal,TouchableHighlight,FlatList,TextInput,ScrollView,Picker} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Loading from '../components/Loading';
import AddExpense from '../components/AddExpense';

import DateTimePicker from "react-native-modal-datetime-picker";

var {height, width} = Dimensions.get('window');

//////Estilos
const {layout, text, login, forms, buttons} = require ('../styles/main');

import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import moment from 'moment';

class History extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = { 
      modalVisible:false,
      showIcons:false,
      chosenDate: 'Seleccionar fecha' ,
      chosenDateShow: 'Seleccionar fecha',
      Monthlabel:'',
      language:'',
      ViewDisable:false
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
  
  _loadMonth = () => { this._setBusyIndicator(true, ''), setTimeout( () => {this._setBusyIndicator(false, ''),this.setState({ViewDisable: true})}, 200)};


    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[text.TravelInfoTitle, text.Regular, text.TBlack]}>
           Seleccione un de los mes anteriores
          </Text>
          <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: '50%'}}
            onValueChange={(itemValue, itemIndex) =>{
              this.setState({language: itemValue}),
              this._loadMonth()
            }}>
            <Picker.Item label="Enero del 2020" value="Enero del 2020" />
            <Picker.Item label="Febrero del 2020" value="Febrero del 2020" />
          </Picker>
          {this.state.ViewDisable ?  
          <View style={{width:'100%'}}>
            <Text style={[text.TravelInfoTitle, text.Regular, text.TBlack]}>
                Grafica para el mes {this.state.language}
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
            <FlatList
              data = {[
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  title: 'Prima',
                  categoria:'0', ///ingreso
                  value:'100.000,00'
                },
                {
                  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                  title: 'Salario',
                  categoria:'0', ///ingreso
                  value:'100.000,00'
                },
                {
                  id: '58694a0f-3da1-471f-bd96-145571e29d72',
                  title: 'Tarjeta de credito',
                  categoria:'1', ///egreso
                  value:'100.000,00'
                },
              ]}
              style={layout.MainContainerSV,{backgroundColor:'gray'} }
              keyExtractor={item => item.id}
              renderItem={({item}) =>
                <TouchableOpacity>
                  <View  style={layout.AdminItemCont}>
                    <View style={layout.AdminItemIconCont}>
                      {item.categoria==0 ?                       
                        <Icon
                          name='cash'
                          type='material-community'
                          color='green'
                          backgroundColor='#000000'
                          size={30}
                          onPress={() => {this._toggleIcons();} }
                          />
                        : 
                          <Icon
                          name='cash'
                          type='material-community'
                          color='red'
                          size={30}
                          backgroundColor='#000000'
                          onPress={() => {this._toggleIcons();} }
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
                    onPress={() => this.props.navigation.navigate('Index')}
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
            </View>
            :null}
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
  
  export default History;