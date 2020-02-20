import React from 'react';
import { View, Text , FlatList, ScrollView,TouchableOpacity,TextInput} from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import {Shapes} from "react-native-background-shapes";
import ProgressCircle from 'react-native-progress-circle';
import Modal from "react-native-modal";

class Profile extends React.Component {
    constructor(props) {
   
        super(props);
        const { navigation } = this.props;
        this.state = { 
          Editable:false,
          modalVisible:false,
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
               Listado de tus ahorrros
            </Text>
            <FlatList
            data = {this.state.elements}
            style={layout.MainContainerSV}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
            <TouchableOpacity
            onPress={() => this.setState({modalVisible : true})}
            >
              <View 
                style = {[layout.CardContSaves,{borderColor:colors.AccentBlue}]}>
                <Text style={[text.TravelInfoSubtitle, text.Strong, text.TAccentBlue,]}>
                  Meta 
                </Text>
                <View style={layout.TravelCardInfoCont}>
                  <ProgressCircle
                        percent={item.value}
                        radius={40}
                        borderWidth={10}
                        color={colors.AccentBlue}
                        shadowColor={'white'}
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{item.value+'%'}</Text>
                    </ProgressCircle>
                  <View style={layout.TravelCardInfoColumn}>
                    <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TAccentPurple]}>
                        Meta
                    </Text>
                    <View style={{flexDirection: 'row',}}>
                      <Text style={[layout.TravelCardInfoValue, text.Medium, text.TAccentPurple]}>
                      $ 2.350.000,00
                      </Text>
                    </View>
                    <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TAccentBlue]}>
                        Actual
                    </Text>
                    <View style={{flexDirection: 'row',}}>
                      <Text style={[layout.TravelCardInfoValue, text.Medium, text.TAccentBlue]}>
                      $ 500.000,00
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
                        Meta: Viaje a Cartagena 
                        </Text>
                    </View>
                    <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                        <TouchableOpacity 
                            onPress={() => this.setState({modalVisible: false})}
                            style={[buttons.GralButton, buttons.ButtonAccentBlue]}>
                            <Text style={[text.BText, text.TLight]}>
                                Cerrar Sesión
                            </Text>
                        </TouchableOpacity>
                    </View>
                  </View>
              </Modal>
        </View>
      );
    }
  }

  export default Profile;