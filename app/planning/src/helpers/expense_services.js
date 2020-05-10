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
  export async function CreateExpense(name,idcategory,dateexpense,value,idperiod){
    try{
      var parameters= `name/`+ name + `/idcategory/`+ idcategory + `/dateexpense/`+ dateexpense + `/value/`+ value + `/idperiod/`+ idperiod + `/`;
      var data = await fetchRequest("Expenses/CreateExpense",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }
  export async function UpdateExpense(name,idcategory,dateexpense,idperiod,value,IdUser,idexpense){
    try{
      var parameters= `name/`+ name + `/idcategory/`+ idcategory + `/dateexpense/`+ dateexpense + `/value/`+ value +`/iduser/`+ IdUser + `/idexpense/`+ idexpense ;
      var data = await fetchRequest("Expenses/UpdateExpense",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }
  export async function DeleteExpense(idexpense,iduser){
    try{
      var parameters= `idexpense/`+ idexpense + `/iduser/`+ iduser + `/` ;
      var data = await fetchRequest("Expenses/DeleteExpense",parameters);
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