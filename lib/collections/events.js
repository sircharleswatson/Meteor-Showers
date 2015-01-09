Events = new Meteor.Collection("github-events");

Meteor.methods({
  addEvent: function(data) {
    Events.insert({
      githubID: data.eventID,
      eventType: data.eventType,
      repoName: data.repoName
    });

    MeteorEventsStream.emit('launch', data);  
  }
});