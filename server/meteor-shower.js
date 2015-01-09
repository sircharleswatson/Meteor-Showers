
GitHubTimelineStream = Meteor.npmRequire('github-timeline-stream');
GithubStream = new GitHubTimelineStream({token: Meteor.settings.github.token, interval: 2500});
GitHubAPI = Meteor.npmRequire('github');
Map = Meteor.npmRequire('map-stream');
Github = new GitHubAPI({
  version: "3.0.0",
  protocol: 'https'
});

Github.authenticate({
  type: "oauth",
  key: Meteor.settings.github.clientID,
  secret: Meteor.settings.github.clientSecret
});

var dataReceived = Meteor.bindEnvironment(function(data) {

  var repo = Repos.findOne({githubID: data.repoId});

  if (repo) {
    console.log(repo.full_name + ' is in DB');

    var githubEvent = Events.findOne({githubID: data.eventID})

    if (githubEvent) {
      console.log('event already added');
    } else {
      console.log('Adding event type: ', data.eventType);
      Meteor.call('addEvent', {eventType: data.eventType, eventID: data.eventID, repoName: repo.full_name});
    }
  }
});

GithubStream.pipe(Map(function(data, callback) {

  var outdata = {
    stream: "github",
    ip: null
  }

  outdata.eventID = data.id;
  outdata.eventType = data.type;

  if (data.repo) {
    outdata.title = data.repo.name;
    outdata.repoId = data.repo.id;

    callback(null, outdata);
  }


  callback(null, outdata);

})).on("data", dataReceived);

/*
* Start Stream
*/

MeteorEventsStream.permissions.write(function(eventName) {
  return false;
});

MeteorEventsStream.permissions.read(function(eventName) {
  return true;
});
