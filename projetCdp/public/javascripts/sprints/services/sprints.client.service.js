angular.module('sprints').factory('sprints', ['$http', function($http) {
    var o = {
        sprints: [],
        userStories: []
    };
    var idBl;

    o.setIdBl = function(id) {
        idBl = id;
    };

    o.getIdBl = function(id) {
        return idBl;
    };

    o.getAll = function(idBL) {
        return $http.get('/sprints/' + idBL).success(function(data) {
            angular.copy(data, o.sprints);
        });
    };

    o.getAllUS = function(idBL) {
        return $http.get('/userStories/' + idBL).success(function(data) {
            angular.copy(data, o.userStories);
        });
    };

    o.createSprint = function(sprint) {
        return $http.post('/sprints', sprint).success(function(data) {
            o.sprints.push(data);
        });
    };

    o.updateSP = function(idBL, id, sprint) {
        return $http.put('/sprints/' + id, sprint).success(function(response) {
            o.getAll(idBL);
        });
    };

    o.updateUS = function(idBL, id, userstory) {
        return $http.put('/userStories/' + id, userstory).success(function(response) {
            o.getAllUS(idBL);
        });
    };

    o.deleteSP = function(id, idBL) {
        return $http.delete('/sprints/' + id).success(function(response) {
            o.getAll(idBL);
        });
    };

    return o;
}]);