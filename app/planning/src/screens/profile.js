import React from 'react';
import { View, Text ,Image,TextInput,TouchableOpacity,StyleSheet,Modal,ScrollView} from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';
import {Shapes} from "react-native-background-shapes";
import {masterValidator} from '../helpers/validations';
import {clearCredentials,UpdateUser,getSession,setSession} from '../helpers/users_services';

import {SimpleAlert} from '../components/modalAlert';


class Profile extends React.Component { 
    constructor(props) {
   
        super(props);
        // const { navigation } = this.props;
        this.state = { 
          Editable:false,
          modalVisible:false,
          iduser:0,
          name:"",
          surname:"",
        };
    }
    _toggleEdit = () => this.setState({ Editable: !this.state.Editable });

    async closeSession() {
        await clearCredentials;
        this.props.navigation.navigate('Login');
    };

    async componentDidMount(){
        const onSession = await getSession();
        
        this.setState({iduser : onSession?onSession.id:0});
        this.setState({name: onSession?onSession.name:""});
        this.setState({surname: onSession?onSession.surname:""});
        this.setState({email: onSession?onSession.email:""});
    }
    async sendInfoUpdate(){
        let UpdateUserResponse= await UpdateUser(this.state.iduser,this.state.name,this.state.surname);
        this.setState({isModalVisible: true});
        this.setState({imageResponse: UpdateUserResponse.status?2:1});
        this.setState({modalLine1: UpdateUserResponse.message});
        this.setState({buttonLabel: "ok, Entendido"});
        this._toggleEdit();
        if(UpdateUserResponse.status){
            const onSession = await getSession();
        
            var session = {id:onSession.id, name:this.state.name, surname:this.state.surname, email:onSession.email};
            var save = await setSession(session);
        }
    }

    validate(kind,state,type,input){
        this.setState({[state] : input});
        var verdict = masterValidator(kind,input);
        this.setState({[type] : verdict});
    }

    render() { 
      return (
        <View style={ [layout.MainContainerProfile, layout.AlignCenter] }>
            <ScrollView>
            <Text style={[text.TitleView, text.Strong, text.TTurquoise]}>
               Perfil
            </Text>
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
            { this.state.Editable ? 
                <View style = { layout.MainContainerProfileDetails } >
                    <View style={layout.PhotoPreviewContSml}>
                        <Image
                        style={{width:'50%',height:'50%' ,resizeMode:'contain'}}
                        source={{uri: 'https://cdn0.iconfinder.com/data/icons/bold-purple-free-samples/32/User_Avatar_Human_Profile_Face_Circle-512.png'}}
                        />
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Nombres
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.nameError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(name) => this.validate('text','name','nameError',name)}
                                placeholder="Ingresar Nombres"
                                keyboardType = "email-address"
                            />
                        </View>
                        {this.state.nameError?
                          <View style={layout.textAlertCont}>
                                    <Text style={[layout.textAlertError, text.Regular]}>
                                        Nombres no validos
                                    </Text>
                            </View>
                        :null}
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Apellidos
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, this.state.surnameError?forms.AlertInput:null]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(surname) => this.validate('text','surname','surnameError',surname)}
                                placeholder="Apellidos"
                                keyboardType = "email-address"
                            />
                        </View>
                        {this.state.surnameError?
                            <View style={layout.textAlertCont}>
                                    <Text style={[layout.textAlertError, text.Regular]}>
                                        Apellidos no validos
                                    </Text>
                            </View>
                        :null}
                    </View>
                </View>
            : 
            <View style = { layout.MainContainerProfileDetails } >
                <View style={layout.PhotoPreviewContSml}>
                    <Image
                    style={{width:'50%',height:'50%' ,resizeMode:'contain'}}
                    source={{uri: 'https://cdn0.iconfinder.com/data/icons/bold-purple-free-samples/32/User_Avatar_Human_Profile_Face_Circle-512.png'}}
                    />
                </View>
                <View style={layout.InputGroup}>
                    <Text style={text.InputLabel,{alignContent:"center"}}>
                    {this.state.name+" "+this.state.surname}
                    </Text>
                </View>
                <View style={layout.InputGroup}>
                    <Text style={text.InputLabel,{alignContent:"center"}}>
                    {this.state.email}
                    </Text>
                </View> 
            </View>
            }

            { this.state.Editable ? 
                <TouchableOpacity 
                    onPress={() => {this.sendInfoUpdate();} }
                    style={[buttons.GralButton, buttons.BDarkBlue]}>
                    <Text style={[text.BText, text.TLight]}>
                        Guardar
                    </Text>
                </TouchableOpacity>
            :
                <TouchableOpacity 
                    onPress={() => {this._toggleEdit()} }
                    style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                    <Text style={[text.BText, text.TLight]}>
                        Actualizar
                    </Text>
                </TouchableOpacity>

            }      
            <TouchableOpacity 
                onPress={() => this.setState({modalVisible: true})}
                style={[buttons.GralButton, buttons.ButtonRegisterLogin]}>
                <Text style={[text.BText, text.TAccentPurple]}>
                    Configuraciones
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => this.closeSession()}
                style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                <Text style={[text.BText, text.TLight]}>
                    Cerrar Sesión
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => this.setState({modalVisible: true})}
                style={[buttons.GralButton, buttons.ButtonRegisterLogin]}>
                <Text style={[text.BText, text.TAccentPurple]}>
                    ¿Deseas ayudarnos con una encuesta?
                </Text>
            </TouchableOpacity>
            <SimpleAlert 
                isModalVisible = {this.state.isModalVisible} 
                imageType = {this.state.imageResponse}
                line1 = {this.state.modalLine1}
                line2 = {this.state.modalLine2}
                buttonLabel = {this.state.buttonLabel}
                closeModal={() => this.setState({isModalVisible: false})}
            />
             </ScrollView>   
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}> 
             <View style={ [layout.MainContainer, layout.AlignCenter],{backgroundColor: 'white'} }>
                <View style={[layout.GralTextCont, {marginBottom: 60,}]}>
                    <Text style={[text.GralText, text.Regular]}>
                    Recuperar Contraseña
                    </Text>
                </View>

                <View style={layout.InputGroup}>
                    <Text style={text.InputLabel}>
                    Nombre del gasto
                    </Text>
                    <View style={[forms.InputCont, forms.LeftAlingment,forms.GreenInput]}>
                        <TextInput
                            style={forms.Input}
                            //onChangeText={(email) => this.validate('email','email','emailError',email)}
                            placeholder='Ingresar Email'
                            keyboardType = "email-address"
                        />
                    </View>
                </View>
                <View style={layout.InputGroup}>
                    <Text style={text.InputLabel}>
                        Califica el desempeño de la app
                    </Text>
                    <View style={{height: 100}}>
                    <Stars
                        half={true}
                        default={4}
                        update={(val)=>{this.setState({stars: val})}}
                        spacing={4}
                        starSize={30}
                        count={5}
                        fullStar={require('./../../images/starFilled.png')}
                        emptyStar={require('./../../images/starEmpty.png')}
                        halfStar={require('./../../images/starHalf.png')}/>
                    </View>
                </View>
                <TouchableOpacity 
                onPress={() => this.setState({modalVisible: false})}
                style={[buttons.GralButton, buttons.BLightBlue]}>
                    <Text style={[text.BText, text.TLight]}>
                        Cerrar Modal
                    </Text>
                </TouchableOpacity>
             </View>
            </Modal>
        </View>
      );
    }
  }

  export default Profile;