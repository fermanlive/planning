

var _PROD_URL  = 'https://viatics.com/';          // PROD
var _STAGE_URL = 'https://viatic.code-labs.com/'; // STAGE
var _LOCAL_URL = 'http://192.168.1.104/';          // LOCAL

var _BASE_URL  = _LOCAL_URL; /* ONLY CHANGE THIS LINE !!! */

module.exports = {

  ///////Environments
  PROD_URL:  _PROD_URL,
  STAGE_URL: _STAGE_URL,
  LOCAL_URL: _LOCAL_URL,

  ///////Requests origin
  BASE_URL:   _BASE_URL,
  URL_REQUEST: _BASE_URL + 'planning/www/Users/index.php/',
  URL_REQUEST_PERIOD: _BASE_URL + 'planning/www/Periods/index.php/',
  URL_REQUEST_INCOME: _BASE_URL + 'planning/www/Income/index.php/',
  FAQ_URL:    _BASE_URL + 'faq',
  TYC_URL:    _BASE_URL + 'tyc',

  ///////Requests origin
  ORIGIN: 'MV',

  
};
