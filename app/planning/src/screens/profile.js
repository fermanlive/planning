import React from 'react';
import { View, Text , Button,Image,TextInput,TouchableOpacity,ScrollView} from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';


class Profile extends React.Component {
    constructor(props) {
   
        super(props);
        const { navigation } = this.props;
        this.state = { 
          Editable:false,
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
                onPress={() => this.validateMail()}
                style={[buttons.GralButton, buttons.BLightBlue]}>
                <Text style={[text.BText, text.TLight]}>
                    Cerrar Sesión
                </Text>
            </TouchableOpacity>
            </View>
        </View>
      );
    }
  }
  
  export default Profile;