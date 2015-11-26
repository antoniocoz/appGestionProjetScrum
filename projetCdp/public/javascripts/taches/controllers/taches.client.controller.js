//US controller
angular.module('taches').controller('tacheController', ['$scope', '$location', 'tacheService',

    function($scope, $location, tacheService) {
        //On récupère l'ensemble des US via getAll du service
        $scope.taches = tacheService.taches;
        $scope.editer = false;

        $scope.usId = tacheService.getIdUs();

        $scope.backlogId = tacheService.getIdBl();

        $scope.init = function() {
            var nodeDataArray = [];
            var linkDataArray = [];

            for (var i = 0; i < $scope.taches.length; i++) {
                var node = {
                    key: $scope.taches[i].numero,
                    text: $scope.taches[i].description,
                    earlyStart: $scope.taches[i].delaiplustot,
                    lateFinish: $scope.taches[i].delaiplustard
                };
                nodeDataArray.push(node);

                for (var j = 0; j < $scope.taches[i].tacheId.length; j++) {
                    var link = {
                        from: $scope.taches[i].tacheId[j],
                        to: $scope.taches[i].numero
                    };
                    linkDataArray.push(link);
                };

            };

            diagramPert(nodeDataArray, linkDataArray);

        }

        $scope.create = function() {
            if ($scope.numero === '' || !$scope.description || !$scope.dure) {
                return;
            }
            tacheService.create({
                numero: $scope.numero,
                description: $scope.description,
                delaiplustot: 0,
                delaiplustard: 0,
                dure: $scope.dure,
                usId: $scope.usId,
                tacheId: [],
                etat: 0,
                userId: ""
            });

            $location.path('taches/' + $scope.usId + '/' + $scope.backlogId);
        };

        $scope.delete = function(tache) {
            tacheService.delete(tache._id, tache.usId);
        };

        $scope.edit = function(tache) {
            $scope.editer = true;
            $scope.tache = tache;
        };

        $scope.findAllByUs = function(usId) {
            $scope.taches = tacheService.getAll(usId);
        };
        $scope.findOne = function(tacheId) {
            $scope.editer = false;
            $scope.tache = tacheService.get(tacheId);
        };

        $scope.update = function(tacheId, tache) {
            tacheService.update(tacheId, tache);
            $scope.editer = false;
        };

        $scope.annuler = function() {
            $scope.editer = false;
        };
    }
]);