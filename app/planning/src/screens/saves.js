import React from 'react';
import { View, Text , FlatList, ScrollView,TouchableOpacity} from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';
import {Shapes} from "react-native-background-shapes";

class Profile extends React.Component {
    constructor(props) {
   
        super(props);
        const { navigation } = this.props;
        this.state = { 
          Editable:false,
          modalVisible:false,
          elements:[
            {
              id:"1"
            },
            {
              id:"2"
            }
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
               Relacion de gastos para Agosto
            </Text>
            <FlatList
            data = {this.state.elements}
            style={layout.MainContainerSV}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
            <TouchableOpacity>
              <View 
                style = {layout.CardContSaves}>
                <Text style={[text.TravelInfoSubtitle, text.Regular, text.TLight,]}>
                  2020/10/11 a  2020/10/12
                </Text>
                <View style={layout.TravelCardInfoCont}>
                  <View style={layout.TravelCardInfoColumn}>
                    <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                        Ingresos
                    </Text>
                    <View style={{flexDirection: 'row',}}>
                      <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                      $ 2.350.000,00
                      </Text>
                    </View>
                  </View>
                  <View style={layout.TravelCardInfoColumn}>
                    <Text style={[layout.TravelCardInfoTitle, text.Strong, text.TLight]}>
                        Egresos
                    </Text>
                    <View style={{flexDirection: 'row',}}>
                      <Text style={[layout.TravelCardInfoValue, text.Medium, text.TLight]}>
                      $ 2.000.000,00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>   
            }
            />  
        </View>
      );
    }
  }

  export default Profile;