//US controller
angular.module('taches').controller('tacheController', ['$scope','$location','tacheService',

function($scope, $location, tacheService){
	//On récupère l'ensemble des US via getAll du service
	$scope.taches = tacheService.taches;
    $scope.editer=false; 

    $scope.usId = tacheService.getIdUs();

    $scope.backlogId = tacheService.getIdBl();

	$scope.$watch('selected', function(nowSelected){
	  	$scope.tache.tacheId = [];

	  	if( ! nowSelected){return;}

	  	angular.forEach(nowSelected, function(val){
	  		$scope.tache.tacheId.push(val._id);
	  	});

	  	console.log("test");

	  });

	$scope.create = function(){
	      if($scope.numero === '' || !$scope.numero || !$scope.description || !$scope.dure || $scope.dure === '') { 
	      	return; 
	      }
		  tacheService.create({
			numero: $scope.numero,
			description: $scope.description,
			delaiplustot:0,
			delaiplustard:0,
			dure: $scope.dure,
			usId: $scope.usId,
			tacheId:[]
		  });
  		  $location.path('taches/' + $scope.usId+'/'+$scope.backlogId);
		  $scope.numero = '';
		  $scope.description = '';
		  $scope.dure = '';
	};
	
	$scope.delete = function(tache){
		tacheService.delete(tache._id,tache.usId);
	};
	
	$scope.edit = function(tache){
          $scope.editer=true;
          $scope.tache=tache;
	};

    $scope.findAllByUs = function(usId){
		  //$scope.tache = {};
          $scope.taches=tacheService.getAll(usId);
         // $location.path('taches/edit/' + $scope.tache.description);
	};
	$scope.findOne = function(tacheId){
		  $scope.editer=false;
          $scope.tache=tacheService.get(tacheId);
         // $location.path('taches/edit/' + $scope.tache.description);
	};
	
	$scope.update = function(tacheId,tache){
		//if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
		tacheService.update(tacheId,tache);
		//$scope.tache={};
		$scope.editer=false;
		console.log("tacheId length : "+$scope.tache.tacheId.length);
		console.log("tacheId 1 : "+JSON.stringify($scope.tache.tacheId[1]));
		console.log("tacheId 0 : "+JSON.stringify($scope.tache.tacheId[0]));


	};
}]);