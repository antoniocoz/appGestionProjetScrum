angular.module('userstories').factory('userStories', ['$http', function($http){
  var o = {userStories: []};

  o.getAll = function(idBL) {
    return $http.get('/userStories/' + idBL).success(function(data){
      angular.copy(data, o.userStories);
    });
  };

  o.deleteUS = function(id, idBL) {
	  return $http.delete('/userStories/' + id).success(function(response){
		o.getAll(idBL);
	  });
	};
 
  return o;
}]);