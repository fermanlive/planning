import React from 'react';
import { View, Text , Button,Image,TextInput,TouchableOpacity,StyleSheet,Modal} from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';


class Profile extends React.Component {
    constructor(props) {
   
        super(props);
        const { navigation } = this.props;
        this.state = { 
          Editable:false,
          modalVisible:false
        };
    }
  _toggleEdit = () => this.setState({ Editable: !this.state.Editable });

    render() {
      return (
        <View style={ [layout.MainContainer, layout.AlignCenter] }>
            { this.state.Editable ? 
                null
            :
                <View style={{backgroundColor: 'yellow', width:'100%',alignItems:'center' }}>
                    <Image
                    style={{width:'50%',height:'50%' ,resizeMode:'contain'}}
                    source={{uri: 'https://cdn0.iconfinder.com/data/icons/bold-purple-free-samples/32/User_Avatar_Human_Profile_Face_Circle-512.png'}}
                    />
                    <Text>
                        Brandon Cooper
                    </Text>
                    <Text>
                        CTO Marvel App
                    </Text>
                    <Text>
                        Currently Bogota DC
                    </Text>
                </View> 
            }
            { this.state.Editable ? 
                <View style = { layout.MainContainerSV } >
                    <View style={layout.PhotoPreviewContSml}>
                        <TouchableOpacity
                            //onPress={this._OpenImagePicker}
                            style={buttons.PhotoPreviewFloatButton}>
                                <Icon raised name='account-edit'type='material-community' color='green' backgroundColor='#000000'
                                size={30}
                                />
                        </TouchableOpacity>
                        <Image
                        style={layout.PhotoPreviewImg}
                        source={{uri: 'https://media-exp1.licdn.com/dms/image/C4E03AQFrtpWFZao51w/profile-displayphoto-shrink_200_200/0?e=1585785600&v=beta&t=36nMalQP4F9X4BXeB_A1ZhgLmowqwIQm5qWfCAaKFbA'}}
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
            : null }
            <View style = { layout.MainContainerSV } >
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
                    style={[buttons.GralButton, buttons.BLightBlue]}>
                    <Text style={[text.BText, text.TLight]}>
                        Actualizar
                    </Text>
                </TouchableOpacity>

            }      
            <TouchableOpacity 
                onPress={() => this.setState({modalVisible: true})}
                style={[buttons.GralButton, buttons.BLineLightRed]}>
                <Text style={[text.BText, text.TLight]}>
                    Abrir Modal
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Login')}
                style={[buttons.GralButton, buttons.BLightBlue]}>
                <Text style={[text.BText, text.TLight]}>
                    Cerrar Sesión
                </Text>
            </TouchableOpacity>
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
                        Nombre del gasto
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
                style={[buttons.GralButton, buttons.BLineLightRed]}>
                    <Text style={[text.BText, text.TLight]}>
                        Cerrar Modal
                    </Text>
                </TouchableOpacity>
            </Modal>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    myStarStyle: {
      color: 'yellow',
      backgroundColor: 'transparent',
      textShadowColor: 'black',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 2,
      height:100,
      width:100,
    },
    myEmptyStarStyle: {
      color: 'white',
    }
  });
  export default Profile;