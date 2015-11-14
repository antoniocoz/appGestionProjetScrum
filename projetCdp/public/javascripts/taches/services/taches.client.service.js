angular.module('taches').factory('tacheService', ['$http', function($http){
  var o = {taches: []};

  var idUs;

  o.setIdUs = function(id) {
    idUs = id;
  };

  o.getIdUs = function(id) {
    return idUs;
  };

  o.getAll = function(usId) {
    return $http.get('/taches/' + usId).success(function(data){
      angular.copy(data, o.taches);
    });
  };

  //get one backlog in using an id
  o.get = function(tacheId) {
    return $http.get('/tache/' + tacheId).then(function(response){
        return response;
    });
  };
  o.delete = function(tacheId,usId) {
	  return $http.delete('/taches/' + tacheId).success(function(response){
		o.getAll(usId);
	  });
	};

  o.update = function(tacheId,tache) {
    return $http.put('/taches/'+tacheId, tache).success(function(response){
    o.getAll(tache.usId);
    });
  };

  o.create = function(tache) {
    return $http.post('/taches', tache).success(function(data){
        o.taches.push(data);
    });
  };
 
  return o;
}]);