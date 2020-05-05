import React from 'react';
import { View, Text ,Image,TextInput,TouchableOpacity,StyleSheet,Modal} from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';
import {Shapes} from "react-native-background-shapes";
import {clearCredentials} from '../helpers/users_services';


class Profile extends React.Component {
    constructor(props) {
   
        super(props);
        // const { navigation } = this.props;
        this.state = { 
          Editable:false,
          modalVisible:false
        };
    }
    _toggleEdit = () => this.setState({ Editable: !this.state.Editable });

    async closeSession() {
        await clearCredentials;
        this.props.navigation.navigate('Login');
    };
    render() { 
      return (
        <View style={ [layout.MainContainerProfile, layout.AlignCenter] }>
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
                        <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                                placeholder="Ingresar Nombres"
                                keyboardType = "email-address"
                            />
                        </View>
                        <View style={layout.textAlertCont}>
                                <Text style={[layout.textAlertError, text.Regular]}>
                                    Nombres no validos
                                </Text>
                        </View>
                    </View>
                    <View style={layout.InputGroup}>
                        <Text style={text.InputLabel}>
                        Apellidos
                        </Text>
                        <View style={[forms.InputCont, forms.LeftAlingment, forms.AlertInput]}>
                            <TextInput
                                style={forms.Input}
                                onChangeText={(emailVerification) => this.validate('email','emailVerification','emailVerificationError',emailVerification)}
                                placeholder="Apellido"
                                keyboardType = "email-address"
                            />
                        </View>
                        <View style={layout.textAlertCont}>
                                <Text style={[layout.textAlertError, text.Regular]}>
                                    Apellido no valido
                                </Text>
                        </View>
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
                    Brandon Cooper 
                    </Text>
                </View>
            </View>
            }

            { this.state.Editable ? 
                <TouchableOpacity 
                    onPress={() => {this._toggleEdit();} }
                    style={[buttons.GralButton, buttons.BDarkBlue]}>
                    <Text style={[text.BText, text.TLight]}>
                        Guardar
                    </Text>
                </TouchableOpacity>
            :
                <TouchableOpacity 
                    onPress={() => {this._toggleEdit();} }
                    style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                    <Text style={[text.BText, text.TLight]}>
                        Actualizar
                    </Text>
                </TouchableOpacity>

            }      
            <TouchableOpacity 
                onPress={() => this._closeSession()}
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