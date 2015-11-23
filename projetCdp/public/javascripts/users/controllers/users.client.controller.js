//US controller
angular.module('users').controller('UserCtrl', [
    '$scope',
    'users',
    function($scope, users) {
        $scope.users = users.users;
        $scope.backlogId = users.getIdBl();
        $scope.editer = false;

        $scope.addUser = function() {
            if ($scope.forename === '' || !$scope.surname === '' || $scope.contact === '') {
                return;
            }
            users.createUser({
                forename: $scope.forename,
                surname: $scope.surname,
                contact: $scope.contact,
                backlog: $scope.backlogId
            });
            $scope.forename = '';
            $scope.surename = '';
            $scope.contact = '';
            $scope.editer = false;
        };

        $scope.deleteUser = function(id, idBL) {
            users.deleteUser(id, idBL);
        };

        $scope.editUser = function(user) {
            $scope.forename = user.forename;
            $scope.surname = user.surname;
            $scope.contact = user.contact;
            $scope.idBacklog = user.backlog;
            $scope.id = user._id;
            $scope.editer = true;
        };

        $scope.updateUser = function(idUser) {
            if ($scope.forename === '' || !$scope.surname === '' || $scope.contact === '') {
                return;
            }
            users.updateUser($scope.idBacklog, $scope.id, {
                forename: $scope.forename,
                surname: $scope.surname,
                contact: $scope.contact
            });
            $scope.forename = '';
            $scope.surname = '';
            $scope.contact = '';
            $scope.id = '';
            $scope.editer = false;

        };

        $scope.new = function() {
            $scope.forename = '';
            $scope.surname = '';
            $scope.contact = '';
            $scope.id = '';
            $scope.editer = true;
        };

        $scope.cancel = function() {
            $scope.editer = false;
        };
    }
]);