
#PivotalNode

##Get a token

    var userData = { username: 'o3704923@rtrtr.com', password: 'taquitos' };
    var useAsDefault = false; // use access token as default

    pivotalnode.getToken(userData, callbackHandler, [useAsDefault]);

    pivotalnode.getToken({username: 'o3704923@rtrtr.com', password: 'taquitos'}, function(error, PToken){
      //error: if something went wrong
      //PToken: PivotalTracker api response
    });
