import React from 'react';
import { View, Text , FlatList, ScrollView,TouchableOpacity,TextInput} from 'react-native';

import numeral from 'numeral';

const {layout, text, forms, buttons,colors} = require ('../styles/main');
import {Shapes} from "react-native-background-shapes";
import ProgressCircle from 'react-native-progress-circle';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements';

import {getSession} from '../helpers/users_services';
import {ShowSaves,CreateSave,EditSave,DeleteSave} from '../helpers/save_services';
import {masterValidator} from '../helpers/validations';
import {SimpleAlert,TwoButtonsAlert} from '../components/modalAlert';

class Saves extends React.Component {
    constructor(props) {
   
        super(props);
        // const { navigation } = this.props;
        this.state = { 
          Editable:false,
          modalVisible:false,
          saves:[],
          goal: null,
          name:null,
          action: 1,
          current_value:null,
          confirmationModal: false,
          goalError:'',
          nameError:'',
          current_valueError:'',
          imageSuccessModal:2,
          elements:[
            {
              id:"1",
              value:30,
            },
            {
              id:"2",
              value:2,
            },
            {
              id:"3",
              value:70,
            },
            {
              id:"4",
              value:0,
            },
            
          ]
        };
    }
  _toggleEdit = () => this.setState({ Editable: !this.state.Editable });
    async componentDidMount(){
      const onSession = await getSession();
      let Iduser = onSession.id;
      this.setState({Iduser});
      let saves = await ShowSaves(null,Iduser);
      saves = saves.status ? saves.message:null;
      for (let index = 0; index < saves.length; index++) {
          saves[index].id=index;
          saves[index].percent=Math.floor((saves[index].current_value/saves[index].goal)*100);
      }
      this.setState({saves});
    }
    setEmptySave(){
      this.setState({goal: null});
      this.setState({current_value: null});
      this.setState({name: ""});
      this.setState({action: 1});
      this.setState({modalVisible: true});
      this.setState({nameError: ''});
      this.setState({current_valueError: ''});
      this.setState({goalError: ''});
    }
   async ValidateSendSave(action){
      var allGood = [0,0,0];//[0,0,0]; //legth equal to zero to remove ignore password fields
      if(this.state.nameError === '' || this.state.nameError === true) {this.setState({nameError : true}); allGood[0]=0}else{allGood[0]=1};
      if(this.state.goalError === '' || this.state.goalError === true) {this.setState({goalError : true}); allGood[1]=0}else{allGood[1]=1};
      if(this.state.current_valueError === '' || this.state.current_valueError === true) {this.setState({current_valueError : true}); allGood[2]=0}else{allGood[2]=1};  
      let saveResponse;

      if(parseFloat(this.state.current_value)>parseFloat(this.state.goal)){
        
        this.setState({SuccessModalLine1: "La meta no puede ser menor que el valor actual."});
        this.setState({SuccesbuttonLabel: "ok, entendido"});
        this.setState({imageSuccessModal:1})
        this.setState({SuccessModal : true});
        return;
      }
      if(allGood.reduce((a, b) => a + b, 0) === allGood.length){
        if (action == 1) {
           saveResponse = await CreateSave(this.state.current_value,this.state.name,this.state.goal,this.state.Iduser);
        }else{
          saveResponse = await EditSave(this.state.current_value,this.state.name,this.state.goal,this.state.Iduser,this.state.id_saves);
        }
        if(saveResponse.status){
          this.setState({SuccessModalLine1: saveResponse.message});
          this.setState({SuccesbuttonLabel: "ok, entendido"});
          this.setState({imageSuccessModal:2})
          this.setState({SuccessModal : true});
          this.setState({modalVisible  : false});
        }else{
          this.setState({SuccessModalLine1: saveResponse.message});
          this.setState({SuccesbuttonLabel: "ok, entendido"});
          this.setState({imageSuccessModal:1})
          this.setState({SuccessModal : true});
          this.setState({modalVisible  : false});
        }
        this.updateSaves();
      }
    }

    async updateSaves(){
      let saves = await ShowSaves(null,this.state.Iduser);
      saves = saves.status ? saves.message:[];
      for (let index = 0; index < saves.length; index++) {
          saves[index].id=index;
          saves[index].percent=Math.floor((saves[index].current_value/saves[index].goal)*100);
      }

      this.setState({saves});
    }
    async deleteSave(id_saves){

       let DeleteSaveResponse = await DeleteSave(this.state.Iduser,id_saves);

        if(DeleteSaveResponse.status){
          this.setState({SuccessModalLine1: DeleteSaveResponse.message});
          this.setState({SuccesbuttonLabel: "ok, entendido"});
          this.setState({SuccessModal : true});
          this.setState({modalVisible  : false});
        }
        this.setState({confirmationModal: false});
        this.updateSaves();
    }
      //////////////////////Validations////////////////////////
    validate(kind,state,type,input){
      this.setState({[state] : input});
      var verdict = masterValidator(kind,input);
      this.setState({[type] : verdict});
    }
    render() {
      return (
        <View style={ [layout.MainContainer, layout.AlignCenter,{backgroundColor:'#66E49B'}] }>
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
            <Text style={[text.TitleView, text.Strong, text.TLight]}>
               Listado de tus ahorros
            </Text>
            <TouchableOpacity 
              style={[buttons.GralButton, buttons.ButtonRegisterLoginAccentBlue,{marginTop:10}]}
              onPress={() => this.setEmptySave()}    
            >
                <Text style={[text.BText, text.TAccentBlue]}>
                    ¿Deseas agregar un nuevo ahorro?
                </Text>
            </TouchableOpacity>
            <FlatList
            data = {this.state.saves}
            style={layout.MainContainerSV}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
            <TouchableOpacity
            onPress={() => {
              this.setState({modalVisible : true})
              this.setState({name : item.name})
              this.setState({goal : item.goal})
              this.setState({current_value : item.current_value})
              this.setState({id_saves : item.id_saves})
              this.setState({action : 2})
              this.setState({nameError:false})
              this.setState({goalError:false})
              this.setState({current_valueError:false})

            }}
            >
              <View 
                style = {[layout.CardContSaves,{borderColor:colors.AccentBlue}]}>
                <Text style={[text.TravelInfoSubtitle, text.Strong, text.TAccentBlue,]}>
                {item.name} 
                </Text>
                <View style={layout.TravelCardInfoCont}>
                  <ProgressCircle
                        percent={item.percent}
                        radius={40}
                        borderWidth={10}
                        color={colors.AccentBlue}
                        shadowColor={'white'}
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{item.percent+'%'}</Text>
                    </ProgressCircle>
                  <View style={layout.TravelCardInfoColumn}>
                    <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TAccentPurple]}>
                      Meta
                    </Text>
                    <View style={{flexDirection: 'row',}}>
                      <Text style={[layout.TravelCardInfoValue, text.Medium, text.TAccentPurple]}>
                      {numeral(item.goal).format('$0,0')}
                      </Text>
                    </View>
                    <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TAccentBlue]}>
                        Actual
                    </Text>
                    <View style={{flexDirection: 'row',}}>
                      <Text style={[layout.TravelCardInfoValue, text.Medium, text.TAccentBlue]}>
                      {numeral(item.current_value).format('$0,0')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>   
            }
            />  
              <Modal
                backdropColor = {colors.opacityMain}
                backdropOpacity = {0.9}
                style = { {padding: 0, margin: 0,} }
                isVisible={this.state.modalVisible}>  
                 <View 
                    style={layout.ModalTrialInfoCont}
                  >
                    <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                        <Text style={[text.GralText, text.Regular]}>
                          {this.state.action == 1? "Agregar":"Editar" } Ahorro {":"+this.state.name?this.state.name:""}
                        </Text>
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Nombre del ahorro
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.nameError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(name) => this.validate('text','name','nameError',name)}
                                placeholder="Ingresar Nombre del ahorro"
                                keyboardType = "default"
                                value={this.state.name}
                            />
                        </View>
                        {this.state.nameError? 
                          <View style={layout.textAlertCont}>
                                  <Text style={[layout.textAlertError, text.Regular]}>
                                  Nombre del ahorro no valido
                                  </Text>
                          </View>
                        :null}
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Ahorro Actual
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.current_valueError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(current_value) => this.validate('num','current_value','current_valueError',current_value)}
                                placeholder="Ingresar Monto"
                                keyboardType = "numeric"
                                value={this.state.current_value}
                            />
                        </View>
                        {this.state.current_valueError? 
                          <View style={layout.textAlertCont}>
                                  <Text style={[layout.textAlertError, text.Regular]}>
                                  Ahorro Actual no valido
                                  </Text>
                          </View>
                        :null}
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Meta del ahorro
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.goalError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(goal) => this.validate('num','goal','goalError',goal)}
                                placeholder="Ingresar Monto"
                                keyboardType = "numeric"
                                value={this.state.goal}
                            />
                        </View>
                        {this.state.goalError? 
                          <View style={layout.textAlertCont}>
                                  <Text style={[layout.textAlertError, text.Regular]}>
                                      Monto no valido
                                  </Text>
                          </View>
                        :null}
                    </View>
                    {this.state.action==1? 
                      <View style={[layout.GralTextCont, {marginTop:30}]}>
                          <TouchableOpacity 
                              onPress={() => this.ValidateSendSave(1)}
                              style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                              <Text style={[text.BText, text.TLight]}>
                                  Agregar ahorro
                              </Text>
                          </TouchableOpacity>
                      </View>:
                      <View style={[layout.GralTextCont, {marginTop:30}]}>
                          <TouchableOpacity 
                              onPress={() => this.ValidateSendSave(2)}
                              style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                              <Text style={[text.BText, text.TLight]}>
                                  Actualizar ahorro
                              </Text>
                          </TouchableOpacity>
                          <TouchableOpacity 
                          onPress={() => this.setState({confirmationModal: true})}
                          style={[buttons.GralButton, buttons.ButtonAccentRed]}>
                          <Text style={[text.BText, text.TLight]}>
                              Eliminar ahorro
                          </Text>
                      </TouchableOpacity>
                      </View>
                    }
                    <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                        <TouchableOpacity 
                            onPress={() => this.setState({modalVisible: false})}
                            style={[buttons.GralButton, buttons.BLineLightBlue]}>
                            <Text style={[text.BText, text.TAccentBlue]}>
                                Cerrar
                            </Text>
                        </TouchableOpacity>
                    </View>
                  </View>
              </Modal>
              <TwoButtonsAlert 
                isModalVisible = {this.state.confirmationModal} 
                imageType = {1}
                line1 = {"Esta seguro de Eliminar el ahorro : "+ this.state.name}
                line2 = {""}
                leftButton = {"No"}
                rightButton = {"Si"}
                leftFunction={() => this.setState({confirmationModal:false})}
                rightFunction={() => this.deleteSave(this.state.id_saves)}
              />
              <SimpleAlert 
                isModalVisible = {this.state.SuccessModal} 
                imageType = {this.state.imageSuccessModal}
                line1 = {this.state.SuccessModalLine1}
                line2 = {this.state.SuccessModalLine2}
                buttonLabel = {this.state.SuccesbuttonLabel}
                closeModal={() => this.setState({SuccessModal: false})}
                />
        </View>
      );
    }
  }

  export default Saves;