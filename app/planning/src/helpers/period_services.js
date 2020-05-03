import AsyncStorage from '@react-native-community/async-storage';
const CONST = require('../constants/constants');

// ____________________________Async Storage Services________________________________________

  export async function ReadPeriod(idusers,idperiod){
    try{
      var parameters= `idusers/`+ idusers + `/idperiod/`+ idperiod +`/`;
      console.warn(parameters);
      var data = await fetchRequest("Periods/ReadPeriod",parameters);
        
      return data;
    } catch (error) {validateExistedUser
      //console.log("doLogin-error= "+error);
    }
  }


  // ____________________________Comunication Services____________________________________________

export async function fetchRequest(service,parameters){
    try {
      var data= await fetch(CONST.URL_REQUEST_PERIOD + service + '/' + parameters,{
        method: 'GET', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        }
    })
    .then((response) => response.json()) 
      return data;
    } catch (error) {
      // // for testing
      // if(error=='TypeError: Network request failed'){
      //   Alert.alert("Error de comunicacion ");
      // }else{
      //   Alert.alert("fetchRequest-error "+ error);
      // } 
      return new Promise(function(resolve, reject) {
        resolve('[]');
      }).then((response) => { return JSON.parse(response) });
    }
  }