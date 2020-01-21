import React from 'react';
import { View, Text , Button} from 'react-native';
import {
  PieChart
} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
var {height, width} = Dimensions.get('window');


class Home extends React.Component {
    handlePress = () => {
        this.props.navigation.navigate('Login')
    }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home</Text>
          <Button 
            title="Go Login"
            onPress={this.handlePress}
          />
         <Text>Perfil</Text>
          <Button 
            title="Profile"
            onPress={() => this.props.navigation.navigate('Profile')}
          />
          <PieChart
            data={[
              {
                name: 'Arriendo',
                population: 30,
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Servicios',
                population: 20,
                color: '#F00',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Tarjetas',
                population: 10,
                color: 'green',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Ahorros',
                population: 50,
                color: 'rgb(0, 0, 255)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
            ]}
            width={width}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="20"
            //absolute //for the absolute number remove if you want percentage
          />
        </View>
      );
    }
  }
  
  export default Home;