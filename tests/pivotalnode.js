var vows        = require('vows');
var assert      = require('assert');
var pivotalnode = require('../index');

vows.describe('PivotalNode').addBatch({

  'Ask for access token on PivotalTracker with correct data' : {
    topic: function(){

      var userData = {
        username: 'o3704923@rtrtr.com',
        password: 'taquitos'
      };

      pivotalnode.getToken(userData, this.callback, false);
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

      pivotalnode.getToken(userData, this.callback, false);
    },
    "and returns da error" : function(err, PToken){
      assert.isTrue(PToken === undefined);
      assert.isNotNull(err);
    }
  },


}).run();
