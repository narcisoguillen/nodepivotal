module.exports = function(data, cb){
  var callback = typeof data === 'function' ? data : typeof cb === 'function' ? cb : function(){ };
  var options  = new this.requestOptions();
  var project;

  if(!this.token){ return callback('Token is missing'); }

  if(data.project){
    project = data.project; delete data.project; 
  }

  var stringData = this.querystring.stringify(data);
  var params     = stringData ? ('?' + stringData) : '';

  options.headers = { 'X-TrackerToken': this.token };
  options.path    = project ? '/services/v3/projects/'+project+'/activities' : '/services/v3/activities';
  options.path+=params;

  var request = this.https.request(options, new this.__responseParser(function(error, result){
    return callback(error, result);
  }));

  request.end();

  request.on('error', function(error){
    return callback(error);
  });

};
