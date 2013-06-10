#PivotalNode

##Get a token

    pivotalnode.getToken({username: 'o3704923@rtrtr.com', password: 'taquitos'}, function(error, PToken){
      //error: if something went wrong
      //PToken: PivotalTracker api response
    });

##Activity Feed

###All activity

    pivotalnode.activityFeed( [{ params }] , function(error, result){
      // ...
    });

###Project activity

    pivotalnode.activityFeed({project: :ID, [{ params }] }, function(error, result){
      // ...
    });

####Parameters 

- limit: you can limit the number of activity feed items to a desired number. Note the default value is 10, and there is a upper cap of 100
- occurred_since_date: allows restricting the activity feed to only those items that occurred after a supplied date (example format: 2009/12/18 21:00:00 UTC)
- newer_than_version: allows restricting the activity feed to only those items that have a greater than supplied version

Example:

    pivotalnode.activityFeed({ project: 1234, limit: 50 }, function(error, result){
      // ...
    });

##Get Projects

###All my projects

    pivotalnode.getProjects(function(error, result){
      //..
    });
    
