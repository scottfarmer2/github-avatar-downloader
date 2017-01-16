var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors("repoOwner", "repoName", function(err, result) {
  console.log('Errors:', err);
  console.log('results:', results);
});