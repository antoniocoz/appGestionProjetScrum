//US controller
angular.module('userstories').controller('USCtrl', [
'$scope',
'userStories',
function($scope, userStories){
	//On récupère l'ensemble des US via getAll du service
	$scope.userStories = userStories.userStories;
	$scope.backlogId = userStories.getIdBl();
	$scope.editer=false;
	
	$scope.addUserStory = function(){
	  if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
	  userStories.createUS({
		body: $scope.body,
		priority: $scope.priority,
		difficulty: $scope.difficulty,
		backlog: $scope.backlogId,
		sprint: ""
	  });
	  $scope.body = '';
	  $scope.priority = '';
	  $scope.difficulty = '';
	  $scope.editer=false;
	};
	
	$scope.deleteUserStory = function(id, idBL){
		userStories.deleteUS(id, idBL);
	};
	
	$scope.editUserStory = function(userStory){
          $scope.body = userStory.body;
          $scope.priority = userStory.priority;
		  $scope.difficulty = userStory.difficulty;
		  $scope.idBacklog = userStory.backlog;
		  $scope.idSprint = userStory.sprint;
		  $scope.id = userStory._id;
		  $scope.editer=true;
	};
	
	$scope.updateUserStory = function(idUS){
		if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
		userStories.updateUS($scope.idBacklog, $scope.id, {
			body: $scope.body, 
			priority: $scope.priority,
			difficulty: $scope.difficulty,
			sprint: $scope.idSprint
		});
		$scope.body='';
		$scope.priority='';
		$scope.difficulty='';
		$scope.id='';
		$scope.idSprint='';
		$scope.editer=false;
		
	};

	$scope.nouveau = function(){
		$scope.body='';
		$scope.priority='';
		$scope.difficulty='';
		$scope.id='';
		$scope.idSprint='';
		$scope.editer=true;
	};

	$scope.annuler = function(){
		$scope.editer=false;
	};
}]);