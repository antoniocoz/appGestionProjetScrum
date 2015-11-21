angular.module('users').factory('users', ['$http', function($http){
  var o = {users: []};
  var idBl;

  o.setIdBl = function(id) {
    idBl = id;
  };

  o.getIdBl = function(id) {
    return idBl;
  };

  o.getAll = function(idBL) {
    return $http.get('/users/' + idBL).success(function(data){
      angular.copy(data, o.users);
    });
  };

  o.deleteUser = function(id, idBL) {
	  return $http.delete('/users/' + id).success(function(response){
		o.getAll(idBL);
	  });
	};

  o.updateUser = function(idBL, id, user) {
    return $http.put('/users/' + id, user).success(function(response){
    o.getAll(idBL);
    });
  };

  o.createUser = function(user) {
    return $http.post('/users', user).success(function(data){
    o.users.push(data);
    });
  };
 
  return o;
}]);