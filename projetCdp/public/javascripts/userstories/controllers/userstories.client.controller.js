//US controller
angular.module('userstories').controller('USCtrl', [
'$scope',
'userStories',
function($scope, userStories){
	//On récupère l'ensemble des US via getAll du service
	$scope.userStories = userStories.userStories;
	$scope.backlogId = userStories.getIdBl();
	
	$scope.addUserStory = function(){
	  if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
	  userStories.createUS({
		body: $scope.body,
		priority: $scope.priority,
		difficulty: $scope.difficulty,
		backlog: $scope.backlogId
	  });
	  $scope.body = '';
	  $scope.priority = '';
	  $scope.difficulty = '';
	};
	
	$scope.deleteUserStory = function(id, idBL){
		userStories.deleteUS(id, idBL);
	};
	
	$scope.editUserStory = function(userStory){
          $scope.body = userStory.body;
          $scope.priority = userStory.priority;
		  $scope.difficulty = userStory.difficulty;
		  $scope.idBacklog = userStory.backlog;
		  $scope.id = userStory._id;
	};
	
	$scope.updateUserStory = function(idUS){
		if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
		userStories.updateUS($scope.idBacklog, $scope.id, {
			body: $scope.body, 
			priority: $scope.priority,
			difficulty: $scope.difficulty
		});
		$scope.body='';
		$scope.priority='';
		$scope.difficulty='';
		$scope.id='';
	};
}]);