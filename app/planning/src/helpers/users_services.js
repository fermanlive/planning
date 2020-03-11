import {AsyncStorage, Alert} from 'react-native';
const CONST = require('../constants/constants');

// ____________________________Async Storage Services________________________________________

export async function clearCredentials() {
    try {
      await AsyncStorage.clear();
      return  'Deleted!';
    } catch (error) {
      //console.log("setCredentials-error= "+error);
    }
  };
  
  export async function getSession() {
    try {
      const value = await AsyncStorage.getItem('session');
      if(value != null){
        const session = JSON.parse(value);
        return session;
      }
      return false;
    } catch (error) {
      //console.log("getSession-error= "+error);
    }
  };

  export async function RequestLogin(user,pass){
    try{
        user = 'fernandohalo2@hotmail.com';
        pass = 1;
      var parameters= `email/`+ user + `/password/`+pass;
      var data = await fetchRequest("users/Login",parameters);
      console.warn(data);
/*       if(data.idUsers){
        var session = {id:data.idUsers, token:data.session_hash, profiles:data.userTypes, email:data.userEmail, names:data.names, idType:data.userIdType, idNum:data.userIdNumber, phone:data.userPhone,companyId:data.Companies_idCompanies,language:data.language};
        var save = await setSession(session);
        return save;
      }else{
        return data;
      } */
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }

  // ____________________________Comunication Services____________________________________________

export async function fetchRequest(service,parameters){
    try {
      var data= await fetch(CONST.URL_REQUEST + service + '/' + parameters,{
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