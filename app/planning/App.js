import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
      title: 'Home'
    }
  },  
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Perfil'
    }
  },
  Historic: {
    screen: HistoricScreen,
    navigationOptions: {
      title: 'Historial'
    }
  },
  Simulator: {
    screen: SimulatorScreen,
    navigationOptions: {
      title: 'Simulador'
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
