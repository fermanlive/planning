import React from 'react';
import { View, Text , Button,Image,TextInput,TouchableOpacity} from 'react-native';
const {layout, text, forms, buttons} = require ('../styles/main');
import { Dimensions } from 'react-native';


class Home extends React.Component {
    render() {
      return (
        <View style={ [layout.MainContainer, layout.AlignCenter] }>
                <View style={{backgroundColor: '#F0F3F5', width:'100%',alignItems:'center',height:'25%' }}>
                    <Image
                    style={{width:'40%',height:'60%' , marginTop:'-20%',resizeMode:'contain'}}
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
                <TouchableOpacity 
                    onPress={() => this.validateMail()}
                    style={[buttons.GralButton, buttons.BLightBlue]}>
                    <Text style={[text.BText, text.TLight]}>
                        Cerrar Sesión
                    </Text>
                </TouchableOpacity>

        </View>
      );
    }
  }
  
  export default Home;