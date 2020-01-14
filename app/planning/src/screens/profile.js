import React from 'react';
import { View, Text , Button,Image,TextInput} from 'react-native';

import { Dimensions } from 'react-native';


class Home extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'gray' }}>
                <View style={{backgroundColor: '#FFFFFF', width:'100%',alignItems:'center',height:'25%' }}>
                    <Image
                    style={{width:'25%',height:'25%' , marginTop:'-2%',borderRadius:600/ 2}}
                    source={{uri: 'https://bigbangtheoryla.files.wordpress.com/2009/05/jim_parsons.jpg'}}
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
                <View style={{backgroundColor: '#B1CAF6',width:'100%'  }}>
                    <Text>
                        Contraseña
                    </Text>
                    <TextInput secureTextEntry={true} value="" />
                </View>

        </View>
      );
    }
  }
  
  export default Home;