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
      cb(JSON.parse(body));
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err){
      throw err;
    })
    .pipe(fs.createWriteStream(filePath))
}

var args = process.argv.slice(2);
console.log(args[0]);
console.log(args[1]);

if (args[0] === null || args[1] === null){
 console.log('Error, you must fill out repo owner/name.');
 } else {
   getRepoContributors(args[0], args[1], function(data) {
     for(i = 0; i < data.length; i++){
       downloadImageByURL(data[i].avatar_url, './avatars/' + data[i].id + ".jpg");
     }
   });
   }
