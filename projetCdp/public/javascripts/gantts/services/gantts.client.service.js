angular.module('gantts').factory('gantts', ['$http', function($http) {
    var o = {
        tasks: [],
        users: []
    };
    var idBl;
    var idSp;

    o.getTasks = function(){
        return o.tasks;
    }

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
        return $http.get('/tasksBySprints/' + idSp).success(function(data) {
            angular.copy(data, o.tasks);
        });
    };

    o.getAllUsers = function(idBL) {
        return $http.get('/users/' + idBL).success(function(data) {
            angular.copy(data, o.users);
        });
    };

    o.updateTask = function(idSp, idTask, owner) {
        return $http.put('/task/' + idTask, owner).success(function(response) {
            o.getAllTasks(idSp);
        });
    };

    o.updatePriorityTask = function(idSp, idTask, priority) {
        return $http.put('/taskPriority/' + idTask, priority).success(function(response) {
            console.log(priority.priority);
            o.getAllTasks(idSp);
        });
    };

    return o;
}]);