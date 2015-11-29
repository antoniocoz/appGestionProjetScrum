angular.module('commits').controller('CommitCtrl', ['$scope','commits',

	
    function($scope, commits) {
        $scope.commits = commits.commits;
        $scope.backlogId = commits.getIdBl();
    }
]);