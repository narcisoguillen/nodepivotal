//Modules
var xml2js      = require('xml2js');
var inspect     = require('eyes').inspector({ stream: null });
var parser      = new xml2js.Parser();

//Configuration file
var config      = require('./config');

var pivotalnode = {

  //Token
  token: null,

  //Request optins
  requestOptions: function(options){
    return {
      host: 'www.pivotaltracker.com',
      port: config.PORT || 443,
      method: 'GET'
    };
  },

  //Local Modules
  querystring: require('querystring'),
  https:       require('https')
};

pivotalnode.__responseParser = function(callb){
  return function(res){
    res.on('data', function(data){
      parser.parseString(data, function (error, result) {
        return callb(error, result);
      });
    });
  };
};

pivotalnode.set = function(name){
  pivotalnode[name] = require('./lib/'+name);
};

//Public methods
pivotalnode.set('getToken');
pivotalnode.set('activityFeed');
pivotalnode.set('getProject');

module.exports = pivotalnode;
