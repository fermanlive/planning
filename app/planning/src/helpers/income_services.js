import AsyncStorage from '@react-native-community/async-storage';
const CONST = require('../constants/constants');

// ____________________________Async Storage Services________________________________________

  export async function ReadIncome(iduser,idincome,IdPeriod){
    try{
      var parameters= `iduser/`+ iduser + `/idincome/`+ idincome + `/IdPeriod/`+ IdPeriod +`/`;
      var data = await fetchRequest("Incomes/ReadIncome",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }


  // ____________________________Comunication Services____________________________________________

export async function fetchRequest(service,parameters){
    try {
      var data= await fetch(CONST.URL_REQUEST_INCOME + service + '/' + parameters,{
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