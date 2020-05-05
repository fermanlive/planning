import AsyncStorage from '@react-native-community/async-storage';
const CONST = require('../constants/constants');

// ____________________________Async Storage Services________________________________________

  export async function ReadExpense(iduser,idexpense,IdPeriod){
    try{
      var parameters= `iduser/`+ iduser + `/idexpense/`+ idexpense + `/IdPeriod/`+ IdPeriod +`/`;
      var data = await fetchRequest("Expenses/ReadExpense",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }
  export async function getCategoryExpense(){
    try{
      var parameters=  `/` ;
      var data = await fetchRequest("Expenses/getCategoryExpense",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }

  // ____________________________Comunication Services____________________________________________

export async function fetchRequest(service,parameters){
    try {
      var data= await fetch(CONST.URL_REQUEST_EXPENSE + service + '/' + parameters,{
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