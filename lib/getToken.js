module.exports = function(data, cb){
  var pivotalnode = this;

  var callback = typeof cb === 'function' ? cb : function(){ };
  var options  = new this.requestOptions();

  if(!data || typeof data !== 'object'){ return callback('Missing credentials'); }

  var stringData = this.querystring.stringify(data);

  options.path    = '/services/v3/tokens/active';
  options.method  = 'POST';
  options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',  
      'Content-Length': stringData.length
  };

  var request = this.https.request(options, new this.__responseParser(function(error, result){
    pivotalnode.token = result ? result.token.guid[0] : null;
    return callback(error, result);
  }));

  request.write(stringData);
  request.end();

  request.on('error', function(error){
    return callback(error);
  });

};
