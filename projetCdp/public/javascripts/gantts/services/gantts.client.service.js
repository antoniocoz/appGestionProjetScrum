angular.module('gantts').factory('gantts', ['$http', function($http) {
    var o = {
        tasks: [],
        users: []
    };
    var idBl;
    var idSp

    o.setIdBl = function(id) {
        idBl = id;
    };

    o.getIdBl = function(id) {
        return idBl;
    };

    o.setIdSp = function(id) {
        idSp = id;
    };

    o.getIdSp = function(id) {
        return idSp;
    };

    o.getAllTasks = function(idSp) {
        return $http.get('/tasks/' + idSp).success(function(data) {
            angular.copy(data, o.tasks);
        });
    };

    o.getAllUsers = function(idBL) {
        return $http.get('/users/' + idBL).success(function(data) {
            angular.copy(data, o.users);
        });
    };

    return o;
}]);