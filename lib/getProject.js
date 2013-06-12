module.exports = function(data, cb){
  var callback = typeof data === 'function' ? data : typeof cb === 'function' ? cb : function(){ };
  var options  = new this.requestOptions();

  if(!this.token){ return callback('Token is missing'); }

  options.path    = '/services/v3/projects';
  options.headers = { 'X-TrackerToken': this.token };
  options.path+= data.project ? '/' + data.project : '';

  var request = this.https.request(options, new this.__responseParser(function(error, result){
    return callback(error, result);
  }));

  request.end();

  request.on('error', function(error){
    return callback(error);
  });
};
