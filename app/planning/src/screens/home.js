import React from 'react';
import numeral from 'numeral';
import { View, Text ,TouchableOpacity,TouchableHighlight,FlatList,ScrollView,SafeAreaView ,TextInput} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Loading from '../components/Loading';
import {SimpleAlert,TwoButtonsAlert} from '../components/modalAlert';
import Modal from "react-native-modal";
import { Card, SimpleCard } from "@paraboly/react-native-card";
// import {Shapes} from "react-native-background-shapes";
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalSelector from 'react-native-modal-selector';

import {getSession} from '../helpers/users_services';
import {getDefaultPeriod,ReadPeriod} from '../helpers/period_services';
import {masterValidator} from '../helpers/validations';
import {ReadIncome,getCategoryIncomes,CreateIncome,DeleteIncome,UpdateIncome} from '../helpers/income_services';
import {ReadExpense,getCategoryExpense,CreateExpense,DeleteExpense,UpdateExpense} from '../helpers/expense_services';
const {DETAILS_CREDIT_CARD} = require ('../facts/facts');

var {height, width} = Dimensions.get('window');

//////Estilos
const {layout, text, login, forms, buttons,colors} = require ('../styles/main');

import { Icon } from 'react-native-elements';
import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = { 
      modalVisible:false,
      showIcons:false,
      chosenDate: 0 ,
      chosenDateShow: 'Seleccionar fecha',
      displayTab:true,
      ModalIncome:false,
      ModalExpense:false,
      warningDeleteModal:false,
      numericBalance:2,
      namePeriod:'',
      filterTab:2,
      TotalIncomes:0,
      elements:[],
      balance:[],
      Expenses:[],
      nameError:'',
      amountError:'',
      nameExpenseError:'',
      amountExpenseError:'',
      SuccessModal:false,
      idUser:0,
      IncomeAction:0,
      ExpenseAction:0,
      

    };
}
async componentDidMount(){
  this.setBusyIndicator(true, '');
  const onSession = await getSession();
  let idUser = onSession.id;
  this.setState({idUser});
  let IdPeriod = await getDefaultPeriod(idUser);
  IdPeriod=IdPeriod.message;
  this.setPeriod(idUser,IdPeriod);
  this.setBalance(idUser,IdPeriod);
  this.setCategories(idUser);
  this.setBusyIndicator(false, '');
}
async setPeriod(idUser,IdPeriod){
  let period = await ReadPeriod(idUser,IdPeriod);
  period = period.status != undefined ? period.message: null;
  let namePeriod = period.status != undefined  ? period.name: null;
  this.setState({IdPeriod});
  this.setState({namePeriod});
  this.setState({periodStart: period.date_start});
  this.setState({periodEnd: period.date_end}); 
}
async setBalance(idUser,IdPeriod){
  let incomes = await ReadIncome(idUser,0,IdPeriod);
  incomes = incomes.status ? incomes.message: [];
  let TotalIncomes=0;
  let balance = [];
  let id = 0;
  if(incomes.length > 0){
    incomes.forEach(income => {
      TotalIncomes = parseFloat(income.value) + parseFloat(TotalIncomes);
      income.title = income.name;
      income.categoria=0;
      balance.push(income);
    });
  } 
  
  this.setState({TotalIncomes});

  let Expenses = await ReadExpense(idUser,0,IdPeriod);
  Expenses = Expenses.status ? Expenses.message: [];
  let TotalExpenses=0;
  if(Expenses.length > 0){
    Expenses.forEach(Expense => {
      TotalExpenses = parseFloat(Expense.value) + parseFloat(TotalExpenses);
      Expense.title = Expense.name;
      Expense.categoria=1;
      balance.push(Expense);
    });
    Expenses.forEach(Expense => {
      Expense.porcentaje= (parseFloat(Expense.value)/TotalExpenses)*100;
      Expense.color = this.random_rgba();
      Expense.legendFontColor = '#7F7F7F';
      Expense.legendFontSize = 15;
    });
  }
  this.setState({Expenses})
  this.setState({TotalExpenses});
  this.setState({balance});
  let numericBalance = this.state.TotalIncomes - this.state.TotalExpenses;
  if( numericBalance > 0){
    this.setState({numericBalance : 2});
  }
  if(this.state.TotalIncomes*0.7 < this.state.TotalExpenses){
    this.setState({numericBalance : 1});
  }
  if(this.state.TotalIncomes < this.state.TotalExpenses){
    this.setState({numericBalance : 0});
  }
  this._filterTab(2);

}

async  setCategories(idUser) {
  let categoriesIncomes = await getCategoryIncomes(idUser);
  categoriesIncomes = categoriesIncomes.status ? categoriesIncomes.message: null;


  if(categoriesIncomes.length > 0){
    categoriesIncomes.forEach(categoriesIncome => {
      categoriesIncome.label = categoriesIncome.name;
      categoriesIncome.key=categoriesIncome.id_category_income;
    });
  } 
  this.setState({categoriesIncomes});

  let categoriesExpenses = await getCategoryExpense(idUser);
  categoriesExpenses = categoriesExpenses.status  ? categoriesExpenses.message: null;

  if(categoriesExpenses.length > 0){
    categoriesExpenses.forEach(categoriesExpense => {
      categoriesExpense.label = categoriesExpense.name;
      categoriesExpense.key=categoriesExpense.id_category_expense;
    });
  }  
  this.setState({categoriesExpenses});
}

random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}


_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

_handleDatePicked = (date) => {
  this.setState({
      chosenDate : moment(date).format('YYYY-MM-DD')
  });
this.setState({
      chosenDateShow : moment(date).format('DD/MM/YYYY')
  });
  this._hideDateTimePicker();
};

  setBusyIndicator = (activity_loading, activity_text) => {
    this.setState({activity_loading: activity_loading})
    this.setState({activity_text: activity_text})
  }

  _toggleIcons = () => this.setState({ showIcons: !this.state.showIcons });
  
  _filterTab = (filter) => {
    this.setState({filterTab: filter});
    this.setState({elements: []});
    if(filter==2){
      this.setState({elements: this.state.balance});
    }else{
      var arreglo = [];
      for (let i = 0; i < this.state.balance.length; i++) {
        if(filter==this.state.balance[i].categoria){
            arreglo.push(this.state.balance[i]);
        }
      }
      this.setState({elements: arreglo});
    }
    
  }
  
  setCategorieIncome (id_category_income){

    let categoriesIncomes = this.state.categoriesIncomes;
    var CategoryInfo ;
    categoriesIncomes.forEach(element => {
      
        if(id_category_income == element.id_category_income ){
          CategoryInfo = element;
        }
    });    
    this.setState({categoriesIncome : CategoryInfo});
  }
  setCategorieExpense (id_category_expense){

    let categoriesExpense = this.state.categoriesExpenses;
    var CategoryInfo ;
    categoriesExpense.forEach(element => {
      
        if(id_category_expense == element.id_category_expense ){
          CategoryInfo = element;
        }
    });    
    this.setState({categoriesExpense : CategoryInfo});
  }
  async DeleteIncome(){
    this.setBusyIndicator(true, '');
    if(this.state.id_income !== undefined){
     let DeleteIncomeResponse = await DeleteIncome(this.state.id_income,this.state.idUser);
     this.setBusyIndicator(false, '');
     if(DeleteIncomeResponse.status){
        this.setState({SuccessModalLine1: DeleteIncomeResponse.message});
        this.setState({SuccesbuttonLabel: "ok, entendido"});
        this.setState({SuccessModal : true});
        this.setState({ModalIncome : false});
        this.setBalance(this.state.idUser,this.state.IdPeriod);
     }
    }
  }

  async DeleteExpense(){
    this.setBusyIndicator(true, '');
    
    if(this.state.id_expense !== undefined){
     let DeleteExpenseResponse = await DeleteExpense(this.state.id_expense,this.state.idUser);
     this.setBusyIndicator(false, '');
     if(DeleteExpenseResponse.status){
        this.setState({SuccessModalLine1: DeleteExpenseResponse.message});
        this.setState({SuccesbuttonLabel: "ok, entendido"});
        this.setState({SuccessModal : true});
        this.setState({ModalExpense : false});
        this.setBalance(this.state.idUser,this.state.IdPeriod);
     }
    }
  }

  async selectDelete(selectDelete){
    this.setState({warningDeleteModal: false});
    selectDelete==2 ? this.DeleteIncome():this.DeleteExpense() ;
  }


  //////////////////////Validations////////////////////////
  validate(kind,state,type,input){
    this.setState({[state] : input});
    var verdict = masterValidator(kind,input);
    this.setState({[type] : verdict});
  }

  async validateSendIncome(IncomeAction){
    var allGood = [0,0];//[0,0]; //legth equal to zero to remove ignore password fields
    if(this.state.nameError === '' || this.state.nameError === true) {this.setState({nameError : true}); allGood[0]=0}else{allGood[0]=1};
    if(this.state.amountError === '' || this.state.amountError === true) {this.setState({amountError : true}); allGood[1]=0}else{allGood[1]=1};  

    let id_categoryincome= typeof this.state.categoriesIncome !== 'undefined' ? this.state.categoriesIncome.id_category_income: 4 ;
    let chosenDate= this.state.chosenDate ? this.state.chosenDate : 0 ;
    if(allGood.reduce((a, b) => a + b, 0) === allGood.length){
      let IncomeResponse;
      if (IncomeAction == 0) {
         IncomeResponse = await UpdateIncome(this.state.name,id_categoryincome,chosenDate,this.state.IdPeriod,this.state.amount,this.state.idUser,this.state.id_income);
      }else{
         IncomeResponse = await CreateIncome(this.state.name,id_categoryincome,chosenDate,this.state.IdPeriod,this.state.amount);
      }
      if(IncomeResponse.status){
        this.setState({SuccessModalLine1: IncomeResponse.message});
        this.setState({SuccesbuttonLabel: "ok, entendido"});
        this.setState({SuccessModal : true});
        this.setState({ModalIncome : false});
        this.setBalance(this.state.idUser,this.state.IdPeriod);
      }
    }
  }
  OpenIncome(categoria,value,name,date_income,id_category_income,id_income){
    this.setState({nameError: false});
    this.setState({amountError: false});
    this.setState({IncomeAction: 0});
    this._handleDatePicked(date_income);
    this.setCategorieIncome(id_category_income);
    this.setState({name});
    this.setState({categoria});
    this.setState({amount: value});
    this.setState({id_income});
    this.setState({ModalIncome: true});
    // this.setEmptyIncome();
  }

  async validateSendExpense(ExpenseAction){
    var allGood = [0,0];//[0,0]; //legth equal to zero to remove ignore password fields
    if(this.state.nameExpenseError === '' || this.state.nameExpenseError === true) {this.setState({nameExpenseError : true}); allGood[0]=0}else{allGood[0]=1};
    if(this.state.amountExpenseError === '' || this.state.amountExpenseError === true) {this.setState({amountExpenseError : true}); allGood[1]=0}else{allGood[1]=1};  

    let id_categoryexpense= typeof this.state.categoriesExpense !== 'undefined' ? this.state.categoriesExpense.id_category_expense: 5;
    let chosenDate= this.state.chosenDate ? this.state.chosenDate : 0 ;
    if(allGood.reduce((a, b) => a + b, 0) === allGood.length){
      console.warn('oli');
      let ExpenseResponse;
      if (ExpenseAction == 0) {
         ExpenseResponse = await UpdateExpense(this.state.nameExpense,id_categoryexpense,chosenDate,this.state.IdPeriod,this.state.amountExpense,this.state.idUser,this.state.id_expense);
      }else{
        ExpenseResponse = await CreateExpense(this.state.nameExpense,id_categoryexpense,chosenDate,this.state.amountExpense,this.state.IdPeriod);
      }
      if(ExpenseResponse.status){
        this.setState({SuccessModalLine1: ExpenseResponse.message});
        this.setState({SuccesbuttonLabel: "ok, entendido"});
        this.setState({SuccessModal : true});
        this.setState({ModalExpense : false});
        this.setBalance(this.state.idUser,this.state.IdPeriod);
      }
    }
  }
  OpenExpense(categoria,value,nameExpense,date_income,id_category_expense,id_expense){
    this.setState({nameExpenseError: false});
    this.setState({amountExpenseError: false});
    this.setState({ExpenseAction: 0});
    this._handleDatePicked(date_income);
    this.setCategorieExpense(id_category_expense);
    this.setState({nameExpense});
    this.setState({categoria});
    this.setState({amountExpense: value});
    this.setState({id_expense});
    this.setState({ModalExpense: true});
    // this.setEmptyIncome();

  }
  setEmptyIncome(){
    this.setState({name: ''});
    this.setState({nameError: ''});
    this.setState({amountError: ''});
    this.setState({categoriesIncome: ''});
    this.setState({chosenDate: ''});
    this.setState({amount: ''});
  }

  setEmptyExpense(){
    this.setState({nameExpense: ''});
    this.setState({nameExpenseError: ''});
    this.setState({amountExpense: ''});
    this.setState({amountExpenseError: ''});
    this.setState({categoriesIncome: ''});
    this.setState({chosenDate: ''});
  }

  static navigationOptions = ({ navigation }) => ({
    headerShown:false
  })
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'#66E49B' }}>
          <View style={{backgroundColor:'white' ,width:width, height:height*3/7,alignItems: 'center',borderBottomWidth:5,borderColor:colors.AccentPurple}}>
          <Text style={[text.TravelInfoTitle, text.Regular, text.TAccentPurple]}>
          Relacion de gastos para {this.state.namePeriod}
          </Text>
          <View style={layout.MainTabsCont}>
            <TouchableHighlight
              style={[buttons.MainTabButton, !this.state.displayTab ? buttons.MiddleTab : buttons.MainTabButtonActive ]}
              onPress={() => this.setState({displayTab:true})}
              >
                <Text style={[buttons.MainTabText, 
                  !this.state.displayTab ? text.Regular : text.Strong,  
                  !this.state.displayTab ? text.TextOpacityMain: text.TAccentPurple
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
                  this.state.displayTab ? text.TextOpacityMain: text.TAccentPurple
                  ]}>
                  Grafica
                </Text>
            </TouchableHighlight>
          </View>
          
            { this.state.displayTab  ?
            <View 
              style = {[layout.TravelCardCont,
                this.state.numericBalance==0 ?
                {backgroundColor: colors.AccentRed} :
                this.state.numericBalance==1 ?
                {backgroundColor:colors.AccentBlue} :
                this.state.numericBalance==2 ?
                {backgroundColor: colors.main} : 
                null
              ]}>
              <Text style={[text.TravelInfoSubtitle, text.Regular, text.TLight,]}>
               {moment(this.state.periodStart).format('DD/MM/YYYY')} a {moment(this.state.periodEnd).format('DD/MM/YYYY')}
              </Text>

              <View style={layout.TravelCardInfoCont}>

                <View style={layout.TravelCardInfoColumn}>

                  <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                      Ingresos
                  </Text>
                  <View style={{flexDirection: 'row',}}>
                    <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                    {numeral(this.state.TotalIncomes).format('$0,0')}
                    </Text>
                  </View>
                </View>

                <View style={layout.TravelCardInfoColumn}>

                  <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                      Egresos
                  </Text>

                  <View style={{flexDirection: 'row',}}>
                    <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                    {numeral(this.state.TotalExpenses).format('$0,0')}
                    </Text>
                  </View>

                </View>

              </View>

            </View>
          : 
              <PieChart
                data={this.state.Expenses}
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
                accessor="porcentaje"
                backgroundColor="transparent"
                paddingLeft="20"
                //absolute //for the absolute number remove if you want percentage
              />
            }
          </View>
          <View style={layout.MainTabsCont}>
            <TouchableHighlight
              style={[buttons.MainTabButton, 
                this.state.filterTab == 2 ? buttons.MainTabButtonActive : buttons.MiddleTab ]}
              onPress={() => this._filterTab(2)}
              //onPress={() => this.setState({displayTab:true})}
              >
                <Text style={[buttons.MainTabText,
                  this.state.filterTab == 2 ? text.Strong : text.Regular,  
                  this.state.filterTab == 2 ? text.TAccentPurple: text.TLight
                  ]}>
                  Todas
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[buttons.MainTabButton,
                this.state.filterTab == 0 ? buttons.MainTabButtonActive : buttons.MiddleTab ]}
              onPress={() => this._filterTab(0)}
              >
                <Text style={[buttons.MainTabText,
                  this.state.filterTab == 0 ? text.Strong : text.Regular,  
                  this.state.filterTab == 0 ? text.TAccentPurple: text.TLight
                  ]}>
                  Ingresos
                </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[buttons.MainTabButton,
                this.state.filterTab == 1 ? buttons.MainTabButtonActive : buttons.MiddleTab ]}
              onPress={() => this._filterTab(1)}
              >
                <Text style={[buttons.MainTabText,
                  this.state.filterTab == 1 ? text.Strong : text.Regular,  
                  this.state.filterTab == 1 ? text.TAccentPurple: text.TLight
                  ]}>
                  Egresos
                </Text>
            </TouchableHighlight>
          </View>
          <SafeAreaView style={{flex: 1}}>
          <FlatList
            data = {this.state.elements}
            style={layout.MainContainerSVFlatlist}
            numColumns={2}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => item.categoria ==0 ? 
                  this.OpenIncome(item.categoria,item.value,item.name,item.date_income,item.category_income_id_category_income,item.id_income) : 
                  this.OpenExpense(item.categoria,item.value,item.name,item.date_expense,item.category_expense_id_category_expense,item.id_expense)}
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
                    <Text style={[layout.BillItemText, text.Strong, text.TextOpacityMain,]}>
                      {numeral(item.value).format('$0,0')}
                    </Text>
                    </View>
                </View>
              </TouchableOpacity>
            }
          />
          </SafeAreaView>
            { this.state.showIcons ? 
              <View style={[layout.ButtonsSpends2]}>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  reverse
                  name='arrow-left'
                  type='material-community'
                  color={colors.main}
                  backgroundColor='#000000'
                  onPress={() => {this._toggleIcons();} }
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Regresar</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='plus'
                  type='material-community'
                  color={colors.main}
                  onPress={() => {this.setState({ModalIncome : true}),this.setEmptyIncome(), this.setState({IncomeAction: 1})}}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Agregar {"\n"} Ingreso</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='minus'
                  type='material-community'
                  color={colors.main}
                  onPress={() => {this.setState({ModalExpense : true}),this.setEmptyExpense(), this.setState({ExpenseAction: 1}) }}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Agregar {"\n"} Egreso</Text>
                </View>
                <View style={[layout.ButtonsSpends3]}>
                  <Icon
                  raised
                  name='book-open-variant'
                  type='material-community'
                  color={colors.main}
                  backgroundColor='#000000'
                  onPress={() => this.props.navigation.navigate('DictionaryScreen')}
                  />
                  <Text style={[layout.BillItemText2, text.Strong, text.TLight,]}>Diccionario</Text>
                </View>
              </View>
            :
              <View style={[layout.ButtonsSpends]}>
              <Icon
              reverse
              name='currency-usd'
              type='material-community'
              color={colors.main}
              backgroundColor='#000000'
              onPress={() => {this._toggleIcons();} }
              />
              </View>
            }
              <Modal
                backdropColor = {colors.AccentRedOpacity}
                backdropOpacity = {0.9}
                style = { {padding: 0, margin: 0,} }
                isVisible={this.state.ModalExpense}
                transparent={false}
                >  
                    <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                        <Text style={[text.GralText, text.Regular]}>
                          {this.state.ExpenseAction == 1 ? "Agregar":"Editar" } un Egreso 
                        </Text>
                    </View>
                    <ScrollView
                      style = { layout.MainContainerSV }
                      showsVerticalScrollIndicator = {false}
                      >
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Nombre del Egreso
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.nameExpenseError?forms.AlertInput:null]}>
                          <TextInput
                              style={forms.Input}
                              onChangeText={(nameExpense) => this.validate('text','nameExpense','nameExpenseError',nameExpense)}
                              placeholder="Ingresar Nombre Egreso"
                              keyboardType = "default"
                              value={this.state.nameExpense}
                          />
                        </View>
                        {this.state.nameExpenseError? 
                          <View style={layout.textAlertCont}>
                                  <Text style={[layout.textAlertError, text.Regular]}>
                                      Nombre no valido
                                  </Text>
                          </View>
                        :null}
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Monto del Egreso
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.amountExpenseError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(amountExpense) => this.validate('num','amountExpense','amountExpenseError',amountExpense)}
                                placeholder="Ingresar Monto"
                                keyboardType = "numeric"
                                value={this.state.amountExpense}
                            />
                        </View>
                        {this.state.amountExpenseError? 
                          <View style={layout.textAlertCont}>
                              <Text style={[layout.textAlertError, text.Regular]}>
                                  Monto no valido
                              </Text>
                          </View>
                        :null}
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                            Fecha del egreso
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment]}>
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
                            initValue={this.state.chosenDate}
                        />
                    </View>
                    <View style={{marginBottom: 10,}}>
                        <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                           Tipo de Egreso 
                        </Text>
                        <ModalSelector
                            data={this.state.categoriesExpenses}
                            initValue="Algo"
                            onChange={categoriesExpense => this.validate('','categoriesExpense','categoriesExpenseError',categoriesExpense)}
                            cancelText = "Cancelar"
                            overlayStyle = {forms.PickerOverlay}
                            optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                            optionStyle ={forms.PickerOptionCont}
                            optionTextStyle = {forms.PickerOptionText}
                            selectedItemTextStyle = {[text.Regular, text.TLightBlue]}
                            cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                            cancelTextStyle = {[text.BText, text.TLightBlue]}
                            >                            

                            <View style={[forms.InputCont, forms.LeftAlingment]}>
                                <TextInput
                                style={forms.Picker}
                                editable={false}
                                placeholder= "seleccionar tipo de ingreso"
                                value={this.state.categoriesExpense?this.state.categoriesExpense.label:''} />
                            </View>
                        </ModalSelector>
                    </View>
                    {this.state.ExpenseAction == 1 ///Agregar Egreso
                     ? 
                    <TouchableOpacity 
                        onPress={() => this.validateSendExpense(this.state.ExpenseAction)}
                        style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                        <Text style={[text.BText, text.TLight]}>
                          Enviar
                        </Text>
                    </TouchableOpacity>
                      :        
                      <TouchableOpacity 
                          onPress={() => this.validateSendExpense(this.state.ExpenseAction)}
                          style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                          <Text style={[text.BText, text.TLight]}>
                            Actualizar
                          </Text>
                      </TouchableOpacity>
                      }
                    {this.state.ExpenseAction == 1 ///Agregar Egreso
                     ? null:
                      <TouchableOpacity 
                        onPress={() => {this.setState({warningDeleteModal: true}),
                        this.setState({warningDeleteLine1: "Esta seguro de Eliminar este Egreso"}),
                        this.setState({leftButtonText: "Cancelar"}),
                        this.setState({rightButtonText: "Eliminar"}),
                        this.setState({selectDelete: 1})}}
                        style={[buttons.GralButton, buttons.ButtonAccentRed]}>
                        <Text style={[text.BText, text.TLight]}>
                          Eliminar Egreso
                        </Text>
                     </TouchableOpacity>
                      }  
                      {this.state.categoriesExpense? this.state.categoriesExpense?this.state.categoriesExpense.id_category_expense == 2 && this.state.ExpenseAction == 0  ///Detalles tarjeta de credito
                     ? 
                      <SimpleCard title={DETAILS_CREDIT_CARD} 
                        styles={{ paddingBottom:10 }}
                      />
                      :null:null:null}
                      
                    {this.state.categoriesExpense? this.state.categoriesExpense?this.state.categoriesExpense.id_category_expense == 2 && this.state.ExpenseAction == 0  ///Detalles tarjeta de credito
                     ? 
                      
                      <TouchableOpacity 
                        onPress={() => {this.setState({ModalExpense: false}),this.props.navigation.navigate('CreditCard',{id_expense: this.state.id_expense,id_period: this.state.IdPeriod})}}
                        style={[buttons.GralButton, buttons.BLinePurple]}>
                        <Text style={[text.BText, text.TAccentPurple]}>
                        Detalles Tarjeta de Credito
                        </Text>
                     </TouchableOpacity>
                      :null:null:null}            
                    <TouchableOpacity 
                        onPress={() => this.setState({ModalExpense: false})}
                        style={[buttons.GralButton, buttons.ButtonRegisterLoginAccentBlue]}>
                        <Text style={[text.BText, text.TFacebookColor]}>
                          Cancelar
                        </Text>
                    </TouchableOpacity>
                    </ScrollView>
              </Modal>
              <Modal
                backdropColor = {colors.opacityMain}
                backdropOpacity = {0.9}
                style = { {padding: 0, margin: 0,} }
                isVisible={this.state.ModalIncome}
                transparent={false}
                >  
                    <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                        <Text style={[text.GralText, text.Regular]}>
                        Agregar un ingreso 
                        </Text>
                    </View>
                    <ScrollView
                      style = { layout.MainContainerSV }
                      showsVerticalScrollIndicator = {false}
                      >
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Nombre del ingreso
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.nameError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(name) => this.validate('text','name','nameError',name)}
                                placeholder="Ingresar Nombre ingreso"
                                keyboardType = "default"
                                value={this.state.name}
                            />
                        </View>
                        {this.state.nameError? 
                          <View style={layout.textAlertCont}>
                                  <Text style={[layout.textAlertError, text.Regular]}>
                                      Nombre no valido
                                  </Text>
                          </View>
                        :null}
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Monto
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.amountError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(amount) => this.validate('num','amount','amountError',amount)}
                                placeholder="Ingresar Monto"
                                keyboardType = "numeric"
                                value={this.state.amount}
                            />
                        </View>
                        {this.state.amountError? 
                          <View style={layout.textAlertCont}>
                                  <Text style={[layout.textAlertError, text.Regular]}>
                                      Monto no valido
                                  </Text>
                          </View>
                        :null}
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                            Fecha
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment]}>
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
                            initValue={this.state.chosenDate}
                            // minimumDate = {new Date(this.state.sTrip.tripStartDateformat)}
                        />
                    </View>
                    <View style={{marginBottom: 10,}}>
                        <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                           Tipo de ingreso 
                        </Text>
                        <ModalSelector
                            data={this.state.categoriesIncomes}
                            initValue="Algo"
                            onChange={categoriesIncome => this.validate('','categoriesIncome','categoriesIncomeError',categoriesIncome)}
                            cancelText = "Cancelar"
                            overlayStyle = {forms.PickerOverlay}
                            optionContainerStyle = {[forms.PickerOptionCont, {margin: 0, padding: 0,}]}
                            optionStyle ={forms.PickerOptionCont}
                            optionTextStyle = {forms.PickerOptionText}
                            selectedItemTextStyle = {[text.Regular, text.TLightBlue]}
                            cancelStyle = {[buttons.GralButton, buttons.BLight, {marginTop: 15,}]}
                            cancelTextStyle = {[text.BText, text.TLightBlue]}
                            >                            

                            <View style={[forms.InputCont, forms.LeftAlingment]}>
                                <TextInput
                                style={forms.Picker}
                                editable={false}
                                placeholder= "seleccionar tipo de ingreso"
                                value={this.state.categoriesIncome?this.state.categoriesIncome.label:''} />
                            </View>
                        </ModalSelector>
                    </View>
                    {this.state.IncomeAction == 1 ///Agregar igreso
                     ? 
                    <TouchableOpacity 
                        onPress={() => this.validateSendIncome(this.state.IncomeAction)}
                        style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                        <Text style={[text.BText, text.TLight]}>
                          Enviar
                        </Text>
                    </TouchableOpacity>
                      :        
                      <TouchableOpacity 
                          onPress={() => this.validateSendIncome(this.state.IncomeAction)}
                          style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                          <Text style={[text.BText, text.TLight]}>
                            Actualizar
                          </Text>
                      </TouchableOpacity>
                      }
                    {this.state.IncomeAction == 1 ///Agregar ingreso
                     ? null:
                      <TouchableOpacity 
                        onPress={() => {this.setState({warningDeleteModal: true}),
                        this.setState({warningDeleteLine1: "Esta seguro de Eliminar este Ingreso"}),
                        this.setState({leftButtonText: "Cancelar"}),
                        this.setState({rightButtonText: "Eliminar"}),
                        this.setState({selectDelete: 2})}}
                        style={[buttons.GralButton, buttons.ButtonAccentRed]}>
                        <Text style={[text.BText, text.TLight]}>
                          Eliminar
                        </Text>
                     </TouchableOpacity>
                      }                 
                    <TouchableOpacity 
                        onPress={() => this.setState({ModalIncome: false})}
                        style={[buttons.GralButton, buttons.ButtonRegisterLoginAccentBlue]}>
                        <Text style={[text.BText, text.TFacebookColor]}>
                          Cancelar
                        </Text>
                    </TouchableOpacity>
                    </ScrollView>
              </Modal>
        <Loading 
        activity_loading={this.state.activity_loading} 
        activity_text={this.state.activity_text} 
        />
        <SimpleAlert 
        isModalVisible = {this.state.SuccessModal} 
        imageType = {2}
        line1 = {this.state.SuccessModalLine1}
        line2 = {this.state.SuccessModalLine2}
        buttonLabel = {this.state.SuccesbuttonLabel}
        closeModal={() => this.setState({SuccessModal: false})}
        />
        <TwoButtonsAlert 
          isModalVisible = {this.state.warningDeleteModal} 
          imageType = {1}
          line1 = {this.state.warningDeleteLine1}
          line2 = {this.state.warningDeleteLine2}
          leftButton = {this.state.leftButtonText}
          rightButton = {this.state.rightButtonText}
          leftFunction={() => this.setState({warningDeleteModal:false})}
          rightFunction={() => this.selectDelete(this.state.selectDelete)}
        />
        </View> 
      );
    }
  }
  
  export default Home;