//Modules
var querystring = require('querystring');
var xml2js      = require('xml2js');
var https       = require('https');
var inspect     = require('eyes').inspector({ stream: null });

var parser      = new xml2js.Parser();
var noAccess    = new RegExp(/Access denied/);
var config      = require('./config');

var pivotalnode = {
  token: null,
  requestOptions: function(options){
    return {
      host: 'www.pivotaltracker.com',
      port: config.PORT || 443,
      method: 'GET'
    };
  }
};

pivotalnode.responseParser = function(callb){
  return function(res){
    res.on('data', function(data){
      parser.parseString(data, function (error, result) {
        return callb(error, result);
      });
    });
  };
};

pivotalnode.getToken = function(data, cb){
  var callback = typeof cb === 'function' ? cb : function(){ };
  var options  = new this.requestOptions();

  if(!data || typeof data !== 'object'){ return callback('Missing credentials'); }

  var stringData = querystring.stringify(data);

  options.path    = '/services/v3/tokens/active';
  options.method  = 'POST';
  options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',  
      'Content-Length': stringData.length
  };

  var request = https.request(options, new this.responseParser(function(error, result){
    pivotalnode.token = result ? result.token.guid[0] : null;
    return callback(error, result);
  }));

  request.write(stringData);
  request.end();

  request.on('error', function(error){
    return callback(error);
  });

};

pivotalnode.activityFeed = function(data, cb){
  var callback = typeof data === 'function' ? data : typeof cb === 'function' ? cb : function(){ };
  var options  = new this.requestOptions();
  var project;

  if(!this.token){ return callback('Token is missing'); }

  if(data.project){
    project = data.project; delete data.project; 
  }

  var stringData = querystring.stringify(data);
  var params     = stringData ? ('?' + stringData) : '';

  options.headers = { 'X-TrackerToken': this.token };
  options.path    = project ? '/services/v3/projects/'+project+'/activities' : '/services/v3/activities';
  options.path+=params;

  var request = https.request(options, new this.responseParser(function(error, result){
    return callback(error, result);
  }));

  request.end();

  request.on('error', function(error){
    return callback(error);
  });

};

pivotalnode.getProject = function(data, cb){
  var callback = typeof data === 'function' ? data : typeof cb === 'function' ? cb : function(){ };
  var options  = new this.requestOptions();

  if(!this.token){ return callback('Token is missing'); }

  options.path    = '/services/v3/projects';
  options.headers = { 'X-TrackerToken': this.token };
  options.path+= data.project ? '/' + data.project : '';

  var request = https.request(options, new this.responseParser(function(error, result){
    return callback(error, result);
  }));

  request.end();

  request.on('error', function(error){
    return callback(error);
  });
};

module.exports = pivotalnode;
