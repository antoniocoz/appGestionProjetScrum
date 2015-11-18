//Backlog controller
angular.module('backlogs').controller('BacklogCtrl', [
'$scope',
'backlogs',
function($scope, backlogs){
  $scope.backlogs = backlogs.backlogs;
  $scope.editer=false; 
  
  $scope.deleteBacklog = function(id){
	  backlogs.deleteBL(id);
  };
  
  $scope.editBacklog = function(backlog){
          $scope.title = backlog.title;
          $scope.description = backlog.description;
		  $scope.id = backlog._id;
		  $scope.editer=true;
  };
  
  $scope.updateBacklog = function(id){
          if(!$scope.title || $scope.title === '' || !$scope.description || $scope.description === '') { return; }
		  backlogs.updateBL($scope.id, {
		title: $scope.title, 
		description: $scope.description
		});
		$scope.title = '';
	  $scope.description = '';
	  $scope.id='';
	  $scope.editer=false; 
  };
  
  $scope.addBacklog = function(){
	  if(!$scope.title || $scope.title === '' || !$scope.description || $scope.description === '') { return; }
	  backlogs.create({
		title: $scope.title, 
		description: $scope.description
		});
	  $scope.title = '';
	  $scope.description = '';
	  $scope.editer=false; 
  };

  $scope.nouveau = function(){
		  $scope.editer=true;
		  $scope.title = "";
          $scope.description = "";
		  $scope.id = "";
  };

  $scope.annuler = function(){
		  $scope.editer=false;
  };
  
}]);