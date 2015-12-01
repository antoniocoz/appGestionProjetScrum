//Service
angular.module('backlogs').factory('backlogs', ['$http', function($http) {
    var o = {
        backlogs: []
    };

    //get all backlogs
    o.getAll = function() {
        return $http.get('/backlogs').success(function(data) {
            angular.copy(data, o.backlogs);
        });
    };

    //create a new backlog
    o.create = function(backlog) {
        return $http.post('/backlogs', backlog).success(function(data) {
            o.backlogs.push(data);
        });
    };

    //get one backlog in using an id
    o.get = function(id) {
        return $http.get('/backlogs/' + id).then(function(res) {
            return res.data;
        });
    };

    //delete one backlog in using an id
    o.deleteBL = function(id) {
        return $http.delete('/backlogs/' + id).success(function(response) {
            o.getAll();
        });
    };

    //update a backlog
    o.updateBL = function(id, backlog) {
        return $http.put('/backlogs/' + id, backlog).success(function(response) {
            o.getAll();
        });
    };

    return o;
}]);