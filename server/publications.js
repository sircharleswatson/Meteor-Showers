Meteor.publish('repos', function() {
	return Repos.find();
});

Meteor.publish('events', function() {
	return Events.find();
});