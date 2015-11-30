angular.module('commits').factory('commits', ['$http', function($http) {
    var o = {
        commits: []
    };

    var idBl;

    o.setIdBl = function(id) {
        idBl = id;
    };

    o.getIdBl = function(id) {
        return idBl;
    };

    //get one backlog in using an id
    o.get = function(id) {
        return $http.get('/commits/' + id).success(function(data) {
            angular.copy(data, o.commits);
        });
    };

    return o;
    
}]);