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

            var node0 = {
                key: 0,
                text: 0,
                earlyStart: 0,
                lateFinish: 0
            };
            var nodeFinal = {
                key: $scope.taches.length + 1,
                text: 'final',
                earlyStart: 0,
                lateFinish: 0
            };
            nodeDataArray.push(node0);

            maxDuree = 0;
            minDuree = 0;

            /** creation noeuds **/
            for (var i = 0; i < $scope.taches.length; i++) {
                var node = {
                    key: $scope.taches[i]._id,
                    text: $scope.taches[i].numero,
                    earlyStart: $scope.taches[i].delaiplustot,
                    lateFinish: $scope.taches[i].delaiplustard
                };
                nodeDataArray.push(node);

                /** Boucle link node0 --> tache avec delaiplustot=0 **/
                if ($scope.taches[i].delaiplustot == 0) {
                    var link = {
                        from: nodeDataArray[0].key,
                        to: $scope.taches[i]._id
                    };

                    linkDataArray.push(link);
                };

                /** Liaisons des taches avec leur dépendances **/
                for (var j = 0; j < $scope.taches[i].tacheId.length; j++) {
                    var link = {
                        from: $scope.taches[i].tacheId[j],
                        to: $scope.taches[i]._id
                    };

                    linkDataArray.push(link);
                };

                /** Liaison taches non dépendantes -> noeud final **/
                var dependence = false;
                for (var l = 0; l < $scope.taches.length; l++) {

                    if ($scope.taches[i]._id != $scope.taches[l]._id) {
                        for (var k = 0; k < $scope.taches[l].tacheId.length; k++) {

                            if (!dependence && $scope.taches[i]._id == $scope.taches[l].tacheId[k]) {
                                dependence = true;
                                break;
                            };

                        };
                    };
                };

                if (!dependence) {
                    var link = {
                        from: $scope.taches[i]._id,
                        to: nodeFinal.key
                    };
                    linkDataArray.push(link);
                    if ($scope.taches[i].delaiplustot > minDuree) {
                        minDuree = $scope.taches[i].delaiplustot;
                    };
                }

                /** determiner la duree max pour le delaiplustard du noeud final **/
                if ($scope.taches[i].delaiplustard > maxDuree) {
                    maxDuree = $scope.taches[i].delaiplustard;
                };



            };

            nodeFinal.lateFinish = maxDuree;
            nodeFinal.text = $scope.taches.length + 1;
            nodeFinal.earlyStart = minDuree;
            nodeDataArray.push(nodeFinal);


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