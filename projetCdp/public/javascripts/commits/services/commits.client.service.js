var github = require('octonode');
var client = github.client();


angular.module('commits').factory('commits', ['$http', function($http){
  var o = {backlogs: []};

 //get one backlog in using an id
o.get = function(id) {
  return $http.get('/commits/' + id).then(function(res){
  	var ghrepo = client.repo(res.data.gitlink);
	ghrepo.commits(function(){
				
	});
	return;
  });
};

