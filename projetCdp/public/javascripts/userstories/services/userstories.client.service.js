angular.module('userstories').factory('userStories', ['$http', function($http){
  var o = {userStories: []};
  var idBl;

  o.setIdBl = function(id) {
    idBl = id;
  };

  o.getIdBl = function(id) {
    return idBl;
  };

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

  o.updateUS = function(idBL, id, userstory) {
    return $http.put('/userStories/' + id, userstory).success(function(response){
    o.getAll(idBL);
    });
  };

  o.createUS = function(userstory) {
    return $http.post('/userStories', userstory).success(function(data){
    o.userStories.push(data);
    });
  };
 
  return o;
}]);