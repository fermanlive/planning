export function masterValidator(kind,input){
  switch(kind) {

    case 'alphaNum':
      if(validateAlphaNumeric(input)){
          return false;
      }else{
          return true;
      }
    case 'companyName':
      if(validateCompanyName(input)){
          return false;
      }else{
          return true;
      }
      case 'cellPhone':
      if(validateCellphone(input)){
          return false;
      }else{
          return true;
      }
    case 'date':
      if(validateDate(input)){
          return false;
      }else{
          return true;
      }
    case 'email':
      if(validateEmail(input)){
          return false;
      }else{
          return true;
      }

    case 'nit':
      if(validateNit(input)){
          return false;
      }else{
          return true;
      }
      case 'text':
      if(validateText(input)){
        return false;
      }else{
        return true;
      }
    case 'num':
      if(validateNumeric(input)){
          return false;
      }else{
          return true;
      }
      case 'numNull':
      if(validateNumericNull(input)){
          return false;
      }else{
          return true;
      }
    case 'password':
      return validatePassword(input);
    case 'isEmpty':
      if(validateIsEmpty(input)){
          return false;
      }else{
          return true;
      }
    default:
  }
}

function validateEmail(email) {
    var alph = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return alph.test(email);
  };

  function validateDate(Date) {
    var alph = /^[\d]{2}\u002d[\d]{2}\u002d[\d]{4}$/; 
    return alph.test(Date);
  };  

function validateNumeric(value) {
    var alph = /^[0-9.]+$/;
    return alph.test(value);
  }

  function validateNumericNull(value) {
    var alph = /^[0-9]*$/;
    return   alph.test(value);;
  }

function validateNit(value) {
  
  //var alph = /^[\d]{9}\u002d[\d]{1}$/; Validacion que el tuviera la forma 123456789-1
  //return alph.test(value);
  return true;
}

function validateAlphaNumeric(value) {
  var alph = /^[A-Za-z0-9]+$/;
  return alph.test(value);
}

function validateCompanyName(value) {
  var alph = /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1" "]+$/g;
  return alph.test(value);
}

function validateText(text) {
  var alph = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1" "]+$/g;
  return alph.test(text); 
}

function validateCellphone(value) {
  var alph = /^[\d]{1,10}$/;
  return alph.test(value); 
}

function validateVerify(input,input2) {
  if(input === ''){
    return false;
  }else{
    return true;
  }
}

function validateIsEmpty(input) {
  if(input === ''){
    return false;
  }else{
    return true;
  }
}

function validatePassword(input) {
  var level;  
  if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/.test(input)){
    level = 3;
  }else if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{4,}$/.test(input)){
    level = 2;
  }else if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(input)){
    level = 1;
  }else{
    level= 0;
  }
  return level; 
}
