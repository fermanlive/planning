
const CONST = require('../constants/constants');

// ____________________________Async Storage Services________________________________________


  export async function ShowSaves(IdSave,Iduser){
    try{
      var parameters= `IdSave/`+ IdSave + `/Iduser/`+Iduser+ `/`;
      var data = await fetchRequest("saves/ShowSaves",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }

  export async function CreateSave(current_value,name,goal,Iduser){
    try{
      var parameters= `current_value/`+ current_value + `/name/`+name+`/goal/`+ goal + `/Iduser/`+Iduser+ `/`;
      var data = await fetchRequest("saves/CreateSave",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }
  export async function EditSave(current_value,name,goal,Iduser,IdSave){
    try{
      var parameters= `current_value/`+ current_value + `/name/`+name+`/goal/`+ goal + `/Iduser/`+Iduser+ `/IdSave/`+IdSave+ `/`;
      var data = await fetchRequest("saves/EditSave",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }
  export async function DeleteSave(Iduser,IdSave){
    try{
      var parameters= `/Iduser/`+Iduser+ `/IdSave/`+IdSave+ `/`;
      var data = await fetchRequest("saves/DeleteSave",parameters);
      return data;
    } catch (error) {
      //console.log("doLogin-error= "+error);
    }
  }


  // ____________________________Comunication Services____________________________________________

export async function fetchRequest(service,parameters){
    try {
      var data= await fetch(CONST.URL_REQUEST_SAVE + service + '/' + parameters,{
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