angular.module('commits').controller('CommitCtrl', [
    '$scope',
    'backlogs',
    function($scope, backlogs) {
        $scope.backlogs = backlogs.backlogs;

    }
]);