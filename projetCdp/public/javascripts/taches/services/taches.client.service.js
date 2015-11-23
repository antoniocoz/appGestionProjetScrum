angular.module('taches').factory('tacheService', ['$http', function($http){
  var o = {taches: []};

  var idUs;
  var idBl;

  o.setIdUs = function(id) {
    idUs = id;
  };

  o.setIdBl = function(id) {
    idBl = id;
  };

  o.getIdUs = function(id) {
    return idUs;
  };

  o.getIdBl = function(id) {
    return idBl;
  };

  o.getAll = function(usId) {
    return $http.get('/taches/' + usId).success(function(data){
      angular.copy(data, o.taches);
    });
  };

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

  o.getTachesBySprints = function(spId) {
    return $http.get('/tachesBySprints/' + spId).success(function(data){
      console.log("spId:"+spId);
      console.log("taches:"+data);
      angular.copy(data, o.taches);
    });
  };
 
  return o;
}]);