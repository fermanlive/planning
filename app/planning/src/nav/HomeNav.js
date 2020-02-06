import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './../screens/home';
import CreditCardScreen from './../screens/creditCard';


export default createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
    },    
    CreditCardScreen,
});