//Modules
var querystring = require('querystring');
var xml2js      = require('xml2js');
var https       = require('https');
var inspect     = require('eyes').inspector({ stream: null });

var parser      = new xml2js.Parser();
var noAccess    = new RegExp(/Access denied/);
var config      = require('./config');

var pivotalnode = {
  token: null
};

pivotalnode.__requestOptions = function(options){
  var requestOptions    = options || {};
  requestOptions.host   = 'www.pivotaltracker.com';
  requestOptions.port   = config.PORT || 443;
  requestOptions.method = options.method || 'POST';

  return requestOptions;
};

pivotalnode.getToken = function(data, callback, flag){

  if(!data){ return callback('Missing credentials'); }

  var stringData = querystring.stringify(data); 
  var options    = new pivotalnode.__requestOptions({
    method: 'POST',
    path: '/services/v3/tokens/active',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',  
      'Content-Length': stringData.length  
    }
  });

  var request = https.request(options, function(res){ 
    res.on('data', function(data){

      if(noAccess.test(data.toString())){ return callback(data.toString()); }

      parser.parseString(data, function (error, result) {
        if(flag){ pivotalnode.token = result.token.guid[0]; }
        return callback(error, result);
      });
      
    });
  });

  request.write(stringData);
  request.end();

  request.on('error', function(error){
    return callback(error);
  });

};

module.exports = pivotalnode;
