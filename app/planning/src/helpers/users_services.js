import AsyncStorage from '@react-native-community/async-storage';
const CONST = require('../constants/constants');

// ____________________________Async Storage Services________________________________________

export async function clearCredentials() {
    try {
      await AsyncStorage.clear();
      return  'Deleted!';
    } catch (error) {
      //console.log("setCredentials-error= "+error);
    }
  }
  
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
  }
  
  export async function setSession(data) {
    try {
      var saveSession = await AsyncStorage.setItem('session', JSON.stringify(data));
      return  true;
    } catch (error) {
      //console.log("setSession-error= "+error);
    }
  }

  export async function RequestLogin(user,pass){
    try{
      var parameters= `email/`+ user + `/password/`+pass;
      var data = await fetchRequest("users/Login",parameters);
      console.warn(data);
      if(data.status){
        var session = {id:data.idusers, name:data.name, surname:data.surname, email:data.email};
        var save = await setSession(session);
        return save;
      }else{
        return data;
      }
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }
  export async function CreateUser(email,password,name,surname){
    try{
      var parameters= `email/`+ email + `/password/`+password+ `/name/`+name+ `/surname/`+surname;
      var data = await fetchRequest("users/CreateUser",parameters);
      console.warn(data);
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }
  export async function ChangePassword(user,pass){
    try{
      var parameters= `email/`+ user + `/password/`+pass;
      var data = await fetchRequest("users/Login",parameters);
      console.warn(data);
      if(data.status){
        var session = {id:data.idusers, name:data.name, surname:data.surname, email:data.email};
        var save = await setSession(session);
        return save;
      }else{
        return data;
      }
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