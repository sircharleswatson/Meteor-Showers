Repos = new Meteor.Collection("repositories");

var getPages = function(string) {
  var pages = string.match(/\&page=(\d+)/g);
  var nextPage = pages[0].match(/(\d+)/);
  var lastPage = pages[1].match(/(\d+)/);

  return {
    nextPage: parseInt(nextPage[0]),
    lastPage: parseInt(lastPage[0])
  }
}

/*
* Repositories
*/

Meteor.methods({
  searchRepos: function(options, pages, sort) {
    var options = options || {
      q: "meteor",
      per_page: 100,
      sort: sort || null,
    };

    var repos = repos || [];
    var currentPage = 0;
    var nextPage = 0
    var totalPages = 1;

    if (pages) {
      currentPage = pages.nextPage - 1;
      nextPage = pages.nextPage;
      totalPages = pages.lastPage;
    }

    if (nextPage <= totalPages && nextPage != 1) {
      Github.search.repos(options, Meteor.bindEnvironment(function(error, result) {

        if (result) {
          // Get nextPage and last Page
          var pages = getPages(result.meta.link);

          // Add Repos to Database
          addRepos(result.items);

          // Set next page to search
          options.page = pages.nextPage;

          Meteor.call('searchRepos', options, pages);
        }

      }));
    }
  }
});

var addRepos = function(repos) {
  repos.forEach(function(repo) {
    var exists = Repos.findOne({githubID: repo.id });

    if (exists) {
      return;
    } else {
      Repos.insert({
        githubID: repo.id,
        full_name: repo.full_name,
      });
    }
  });
}