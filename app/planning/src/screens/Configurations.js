import React from 'react';
import {     Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View, } from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import {Shapes} from "react-native-background-shapes";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import Modal from "react-native-modal";
import {SimpleAlert,TwoButtonsAlert} from '../components/modalAlert';


import {getCategoryIncomes,UpdateCategoryIncome,CreateIncomeCategory} from '../helpers/income_services';
import {getCategoryExpense,UpdateCategoryExpense,CreateCategoryExpense} from '../helpers/expense_services';
import {masterValidator} from '../helpers/validations';

import Loading from '../components/Loading';
import {getSession,clearCredentials} from '../helpers/users_services';


class Configurations extends React.Component {
    constructor(props) {
   
        super(props);
        const { navigation } = this.props;
        this.state = {
            categories:{ key: 1, name: 'income', label:"Categoria Ingresos" },
            modalCategorie:false,
            SuccessModal:false,
            actionModal:1,
      };
    }
    async componentDidMount(){
        this.setBusyIndicator(true, '');
        const onSession = await getSession();
        let idUser = onSession.id;
        let token = onSession.token;
        this.setState({idUser});
        this.setCategories(idUser,token);
        this.setBusyIndicator(false, '');
    }

    async setCategories(idUser,token) {
        let categoriesIncomes = await getCategoryIncomes(idUser,token);
        if(!categoriesIncomes.status){
          await clearCredentials;
          this.props.navigation.navigate('Login');
        }
        categoriesIncomes = categoriesIncomes.status ? categoriesIncomes.message: null;

        if(categoriesIncomes.length > 0){
          categoriesIncomes.forEach(categoriesIncome => {
            categoriesIncome.label = categoriesIncome.name;
            categoriesIncome.key=categoriesIncome.id_category_income;
          });
        } 
        this.setState({categoriesIncomes});
        this.setState({dataCategories: this.state.categoriesIncomes});
      
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

    setModal(id,label){
        this.setState({actionModal: 2});
        this.setState({label});
        this.setState({id_categorie: id});
        this.setState({modalCategorie: true});
    }
    async ValidateSendCategorie(action){
        var allGood = [0];//[0,0,0]; //legth equal to zero to remove ignore password fields
        if(this.state.labelError === '' || this.state.labelError === true) {this.setState({labelError : true}); allGood[0]=0}else{allGood[0]=1};
 
        let saveResponse;
        if(allGood.reduce((a, b) => a + b, 0) === allGood.length){
            if(this.state.actionModal==2){  /// actualizar
                if (action == 1) {
                    saveResponse = await UpdateCategoryIncome(this.state.label,this.state.id_categorie,this.state.idUser);
                }else{
                    saveResponse = await UpdateCategoryExpense(this.state.label,this.state.id_categorie,this.state.idUser);
                }
            }else{ /// Agregar
                if (action == 1) {
                    saveResponse = await CreateIncomeCategory(this.state.label,this.state.idUser);
                }else{
                    saveResponse = await CreateCategoryExpense(this.state.label,this.state.idUser);
                }
            }
        }
  
        if(saveResponse.status){
          this.setState({SuccessModalLine1: saveResponse.message});
          this.setState({SuccesbuttonLabel: "ok, entendido"});
          this.setState({SuccessModal : true});
          this.setState({modalCategorie  : false});
        }

        this.setBusyIndicator(true, '');
        const onSession = await getSession();
        let idUser = onSession.id;
        let token = onSession.token;
        this.setState({idUser});
        this.setCategories(idUser,token);
        this.setBusyIndicator(false, '');
        
    }
      
    changeData(select){
        this.setState({categories:select});
        console.warn(select);
        this.setBusyIndicator(true, '');        
        select.key==1? this.setState({dataCategories: this.state.categoriesIncomes}):this.setState({dataCategories: this.state.categoriesExpenses});
        this.setBusyIndicator(false, '');
    }

    setBusyIndicator = (activity_loading, activity_text) => {
        this.setState({activity_loading: activity_loading})
        this.setState({activity_text: activity_text})
    }
    //////////////////////Validations////////////////////////
    validate(kind,state,type,input){
        this.setState({[state] : input});
        var verdict = masterValidator(kind,input);
        this.setState({[type] : verdict});
    }
    render() {
        const data = [
            { key: 0, name: 'expense', label:"Categoria Egresos" },
            { key: 1, name: 'income',label: "Categoria Ingresos" }
        ];
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
            <Shapes
                primaryColor={colors.BackgroundColorDefault}
                secondaryColor={colors.main}
                height={1}
                borderRadius={20}
                figures={[
                {name: 'donut', position: 'flex-start', axis: 'top', size: 80},
                {name: 'circle', position: 'center', axis: 'right', size: 100},
                {name: 'donut', position: 'flex-end', axis: 'right', size: 80},
                {name: 'circle', position: 'flex-end', axis: 'left', size: 100},
                ]}
            />
            <Text style={[text.TravelInfoTitle, text.Regular, text.TAccentPurple]}>
                Configuraciones para categorias
            </Text>
            <View style={{marginBottom: 10,}}>
                <Text style={[text.InputLabel, {marginLeft: 15,}]}>
                    Tipo de ingreso 
                </Text>
                <ModalSelector
                    data={data}
                    initValue="Algo"
                    onChange={categories => this.changeData(categories)}
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
                        placeholder= "seleccionar tipo de categoria"
                        value={this.state.categories?this.state.categories.label:''} />
                    </View>
                </ModalSelector>
            </View>

            <TouchableOpacity
                onPress={()=>{this.setState({modalCategorie: true}),this.setState({actionModal: 1}),this.setState({label: ""})}}
            >
                <View  style={layout.itemConfigurations}>
                    <View style={layout.AdminItemTextCont}>
                    <Text style={[layout.AdminItemTextNormal, text.Medium, text.TLightBlue]}>
                    Agregar Categoria {this.state.categories.key == 1 ? "Ingreso":"Egreso" }
                    </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <SwipeListView
                data={this.state.dataCategories}
                renderItem={ (data, rowMap) => (
                <TouchableOpacity>
                    <View  style={layout.itemConfigurations}>
                      <View style={layout.AdminItemTextCont}>
                        <Text style={[layout.AdminItemTextNormal, text.Medium, text.TLightBlue]}>
                          {data.item.label}
                        </Text>
                        <Text style={[layout.BillItemText, text.Strong, text.TextOpacityMain,]}>
                        Categoria {this.state.categories.key==1? "de ingresos":"de egresos"}
                        </Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    data.item.id_user !=0 ? 
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() =>this.setModal(data.item.key,data.item.label)}
                            >
                                <View  style={layout.itemConfigurationsEdit}>
                                    <View style={layout.AdminItemTextCont}>
                                        <Text style={[layout.AdminItemTextNormal, text.Medium, text.TLight]}>
                                        Editar
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View  style={layout.itemConfigurationsDelete}>
                                    <View style={layout.AdminItemTextCont}>
                                        <Text style={[layout.AdminItemTextNormal, text.Medium, text.TLight]}>
                                    Eliminar
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    :null
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
            <Loading 
                activity_loading={this.state.activity_loading} 
                activity_text={this.state.activity_text} 
            />

            <Modal
                backdropColor = {colors.opacityMain}
                backdropOpacity = {0.9}
                style = { {padding: 0, margin: 0,} }
                isVisible={this.state.modalCategorie}>  
                 <View 
                    style={layout.ModalTrialInfoCont}
                  >
                    <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                        <Text style={[text.GralText, text.Regular]}>
                {this.state.actionModal == 1 ? "Agregar":"Editar"} Categoria {this.state.categories.key==1? "Ingreso" : "Egreso"}
                        </Text>
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Nombre de la categoria
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.labelError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(label) => this.validate('text','label','labelError',label)}
                                placeholder="Ingresar Nombre de la categoria"
                                keyboardType = "default"
                                value={this.state.label}
                            />
                        </View>
                        {this.state.labelError? 
                          <View style={layout.textAlertCont}>
                            <Text style={[layout.textAlertError, text.Regular]}>
                            Nombre de la categoria no valido
                            </Text>
                          </View>
                        :null}
                    </View>
                    <View style={[layout.GralTextCont, {marginTop:30}]}>
                        <TouchableOpacity 
                            onPress={() => this.ValidateSendCategorie(this.state.categories.key)}
                            style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                            <Text style={[text.BText, text.TLight]}>
                                categoria
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={[layout.GralTextCont, {marginBottom: 30}]}>
                        <TouchableOpacity 
                            onPress={() => this.setState({modalCategorie: false})}
                            style={[buttons.GralButton, buttons.BLineLightBlue]}>
                            <Text style={[text.BText, text.TAccentBlue]}>
                                Cerrar
                            </Text>
                        </TouchableOpacity>
                    </View>
                  </View>
              </Modal>
              <SimpleAlert 
                isModalVisible = {this.state.SuccessModal} 
                imageType = {2}
                line1 = {this.state.SuccessModalLine1}
                line2 = {this.state.SuccessModalLine2}
                buttonLabel = {this.state.SuccesbuttonLabel}
                closeModal={() => this.setState({SuccessModal: false})}
                />
          </View>
    );
  }
  }

  export default Configurations;