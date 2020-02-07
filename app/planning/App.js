import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

///Home simulator
import HistoricScreen from './src/screens/history';
import SimulatorScreen from './src/screens/simulator';
import ProfileScreen from './src/screens/profile';

import HomeScreen from './src/screens/home';
import CreditCardScreen from './src/screens/creditCard';
import DictionaryScreen from './src/screens/dictionary'


///Login Stack
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import ForgetPasswordScreen from './src/screens/forgetPassword';


////Index Stack
//import HomeNav from './src/nav/HomeNav';
const FeedStack = createStackNavigator({
  Home: HomeScreen,
  CreditCard: CreditCardScreen,
  DictionaryScreen,
});

FeedStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const homeStack = createBottomTabNavigator({
  //const homeStack = createStackNavigator({
    Hogar: {
      screen:FeedStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="home" type='material-community' size={30} color={'#3b5998'} />
           )
      } 
    },  
    Simulator: {
      screen: SimulatorScreen,
      navigationOptions: {
        tabBarLabel: 'Simulador',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="calculator" type='material-community' size={30} color={'#3b5998'} />
           )
      }
    },
    Historic: {
      screen: HistoricScreen,
      navigationOptions: {
        tabBarLabel: 'Historial',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="calendar-month-outline" type='material-community' size={30} color={'#3b5998'} />
           )
      } 
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Perfil',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="account-circle" type='material-community' size={30} color={'#3b5998'} />
           )
      } 
    },
    },{
    initialRouteName:'Hogar',
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


export default createAppContainer(createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
        headerShown:false,
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
    Home: {
      screen: homeStack,
      navigationOptions: {
        headerShown:false,
      }
    }
  },
  {
    initialRouteName: 'Login',
  }
));
