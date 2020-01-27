import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Icon } from 'react-native-elements';

///Home simulator
import HomeScreen from './src/screens/home';
import HistoricScreen from './src/screens/history';
import SimulatorScreen from './src/screens/simulator';
import ProfileScreen from './src/screens/profile';


///Login Stack
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import ForgetPasswordScreen from './src/screens/forgetPassword';



const homeStack = createBottomTabNavigator({
//const homeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor, activeTintColor}) => (
         <Icon name="home" type='font-awesome' size={30} color={'#3b5998'} />
         )
    } 
  },  
  Simulator: {
    screen: SimulatorScreen,
    navigationOptions: {
      tabBarLabel: 'Simulador',
      tabBarIcon: ({tintColor, activeTintColor}) => (
         <Icon name="plane" type='font-awesome' size={30} color={'#3b5998'} />
         )
    }
  },
  Historic: {
    screen: HistoricScreen,
    navigationOptions: {
      tabBarLabel: 'Historial',
      tabBarIcon: ({tintColor, activeTintColor}) => (
         <Icon name="calendar" type='font-awesome' size={30} color={'#3b5998'} />
         )
    } 
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Historial',
      tabBarIcon: ({tintColor, activeTintColor}) => (
         <Icon name="user-circle" type='font-awesome' size={30} color={'#3b5998'} />
         )
    } 
  },
},{
  initialRouteName:'Home',
  tabBarOptions: {
    activeTintColor: '#000000',
    showIcon: true,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'transparent',
    },
  }
}
);

const loginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Registro'
    }
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      title: 'Olvidaste Contraseña?'
    }
  },
},{
  initialRouteName:'Login'
}
);

export default createAppContainer(createSwitchNavigator(
  {
    home: homeStack,
    login: loginStack,
  },
  {
    initialRouteName: 'login',
  }
));
