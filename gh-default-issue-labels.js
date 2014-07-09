var GitHubApi = require("github");

const token = GITHUB_OAUTH_TOKEN;
const labels = require('./labels.json');

var github = new GitHubApi({
  // required
  version: "3.0.0"
});

// OAuth2
github.authenticate({
    type: "oauth",
    token: token
});

github.repos.getFromOrg({
  org:'ride-product'
}, function(err, repos) {
  repos.forEach(addLabels);
  // console.log(repos);
});

function addLabels(repo) {
  labels.forEach(function(label) {
    github.issues.createLabel({
      user: 'ride-product',
      repo: repo.name,
      name: label.name,
      color: label.color
    }, function(err, data) {
      if (err) {
        return console.log('error', err);
      }
      console.log('done', data)
    })
  });
}