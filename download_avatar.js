var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "scottfarmer2"
var GITHUB_TOKEN = "2c34a0788448c53c392905082925d281c5d77881"

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers:{
      'User-Agent':'request'
    }
  }

  request(options, function(error, response, body) {
    console.log(response.statusCode);
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      cb(error, data);
    }
  });
}

getRepoContributors("jquery", "jquery", function(err, data) {
  console.log('Errors:', err);
  for (var i = 0; i < data.length; i++) {
    console.log("Result:", data[i].avatar_url);
  }
});
