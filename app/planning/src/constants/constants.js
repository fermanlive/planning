

var _PROD_URL  = 'http://planning.fermanlive.me/';          // PROD
var _LOCAL_URL = 'http://192.168.1.104/';          // LOCAL

var _BASE_URL  = _LOCAL_URL; /* ONLY CHANGE THIS LINE !!! */

module.exports = {

  ///////Environments
  PROD_URL:  _PROD_URL,
  LOCAL_URL: _LOCAL_URL,

  ///////Requests origin
  BASE_URL:   _BASE_URL,
  URL_REQUEST: _BASE_URL + 'planning/www/Users/index.php/',
  URL_REQUEST_PERIOD: _BASE_URL + 'planning/www/Periods/index.php/',
  URL_REQUEST_INCOME: _BASE_URL + 'planning/www/Income/index.php/',
  URL_REQUEST_EXPENSE: _BASE_URL + 'planning/www/Expense/index.php/',
  // URL_REQUEST: _BASE_URL + 'Users/index.php/',
  // URL_REQUEST_PERIOD: _BASE_URL + 'Periods/index.php/',
  // URL_REQUEST_INCOME: _BASE_URL + 'Income/index.php/',
  // URL_REQUEST_EXPENSE: _BASE_URL + 'Expense/index.php/',
  FAQ_URL:    _BASE_URL + 'faq',
  TYC_URL:    _BASE_URL + 'tyc',

  ///////Requests origin
  ORIGIN: 'MV',

  
};
