/*
* Cron Job
*/

var findRecentRepos = new Cron(function() {
  console.log("Running Cron Job - Recent Repos");
  // searchRepos(null, null, "updated");
  Meteor.call('searchRepos', null, null, "updated");
}, {
	minute: 0
});

var findBestMatchRepos = new Cron(function() {
  Meteor.call('searchRepos');
}, {
  minute: 15
});

var findMostStarredRepos = new Cron(function() {
  Meteor.call('searchRepos', null, null, "stars");
}, {
  minute: 30
});

var findMostForkedRepos = new Cron(function() {
  Meteor.call('searchRepos', null, null, "forks");
}, {
  minute: 45
});