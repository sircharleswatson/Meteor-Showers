Template.header.helpers({
	repos: function() {
		var repoCount = Repos.find().count();

		return repoCount;
	},
	events: function() {
		var eventCount = Events.find().count();

		return eventCount;
	}
})