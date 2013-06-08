#PivotalNode

##Get a token

    pivotalnode.getToken({username: 'o3704923@rtrtr.com', password: 'taquitos'}, function(error, PToken){
      //error: if something went wrong
      //PToken: PivotalTracker api response
    });

##Activity Feed

###All activity

Parameters 

  - limit: you can limit the number of activity feed items to a desired number. Note the default value is 10, and there is a upper cap of 100
  - occurred_since_date: allows restricting the activity feed to only those items that occurred after a supplied date (example format: 2009/12/18 21:00:00 UTC)
  - newer_than_version: allows restricting the activity feed to only those items that have a greater than supplied version

    pivotalnode.activityFeed(function(error, result){
      // ...
    });

    pivotalnode.activityFeed({limit: 50, occurred_since_date: '2010/3/15%0000:00:00%20PST', newer_than_version: 123}, function(error, result){
      // ...
    });
    
