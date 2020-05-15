import React from 'react';
import {     Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, } from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import {Shapes} from "react-native-background-shapes";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-elements';

class Configurations extends React.Component {
    constructor(props) {
   
        super(props);
        const { navigation } = this.props;
        this.state = {
            data : [
                { key: 0,  label: 'Tarjeta de credito', value: 0 },
                { key: 1, label: 'Credito Libre Inversión', value:1 },
                { key: 2, label: 'Credito Inmobiliario', value:2 },
                { key: 3, label: 'Credito Educativo', value:3 },
            ]
      };
    }
    render() {
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
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

            <SwipeListView
                data={this.state.data}
                renderItem={ (data, rowMap) => (
                <TouchableOpacity>
                    <View  style={layout.AdminItemCont}>
                      <View style={layout.AdminItemIconCont}>
                        <Icon
                        name='cash'
                        type='material-community'
                        color='red'
                        size={30}
                        backgroundColor='#000000'
                        />
                      </View>
                      <View style={layout.AdminItemTextCont}>
                        <Text style={[layout.AdminItemTextNormal, text.Medium, text.TLightBlue]}>
                          {data.item.label}
                        </Text>
                        <Text style={[layout.BillItemText, text.Strong, text.TextOpacityMain,]}>
                        {data.item.label}
                        </Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={() => closeRow(rowMap, data.item.key)}
                    >
                        <Text style={styles.backTextWhite}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={() => deleteRow(rowMap, data.item.key)}
                    >
                        <Text style={styles.backTextWhite}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
          </View>
    );
  }
  }
  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
  export default Configurations;