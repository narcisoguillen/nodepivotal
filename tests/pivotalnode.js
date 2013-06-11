var vows        = require('vows');
var assert      = require('assert');
var pivotalnode = require('../index');

var register = function(callback){

  var userData = {
    username: 'o3704923@rtrtr.com',
    password: 'taquitos'
  };

  pivotalnode.getToken(userData, callback);

};

vows.describe('PivotalNode').addBatch({

  'Ask for access token on PivotalTracker with correct data' : {
    topic: function(){

      var userData = {
        username: 'o3704923@rtrtr.com',
        password: 'taquitos'
      };

      pivotalnode.getToken(userData, this.callback);
    },
    "and returns da access token" : function(err, PToken){
      assert.isNull(err);
      assert.isNotNull(PToken);
    }
  },

  'Ask for access token on PivotalTracker with incorrect data' : {
    topic: function(){

      var userData = {
        username: 'o3704923@rtrtr.com',
        password: 'burritos'
      };

      pivotalnode.getToken(userData, this.callback);
    },
    "and returns da error" : function(err, PToken){
      assert.isTrue(PToken === undefined);
      assert.isNotNull(err);
    }
  },

  'Ask for all my activity feed' : {
    topic: function(){

      var callback = this.callback;

      register(function(err, token){ 
        pivotalnode.activityFeed(callback);
      });

    },

    "and returns all the activity" : function(err, activity){
      assert.isNull(err);
      assert.isNotNull(activity);
    }
  },

  'Ask for activity feed of a specific project' : {
    topic: function(){

      var callback = this.callback;

      register(function(err, token){ 
        pivotalnode.activityFeed({project: 687223}, callback);
      });

    },

    "and returns the activity" : function(err, activity){
      assert.isNull(err);
      assert.isNotNull(activity);
    }
  }
  

}).run();
