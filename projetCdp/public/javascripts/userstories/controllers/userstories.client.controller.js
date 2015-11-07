//US controller
angular.module('userstories').controller('USCtrl', [
'$scope',
'userStories',
function($scope, userStories){
	//On récupère l'ensemble des US via getAll du service
	$scope.userStories = userStories.userStories;
	
	$scope.addUserStory = function(){
	  if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
	  userStories.createUS(backlog._id, {
		body: $scope.body,
		priority: $scope.priority,
		difficulty: $scope.difficulty
	  }).success(function(us) {
		$scope.backlog.userStories.push(us);
	  });
	  $scope.body = '';
	  $scope.priority = '';
	  $scope.difficulty = '';
	};
	
	$scope.deleteUserStory = function(id, idBL){
		userStories.deleteUS(id, idBL);
		/*var index;
		var property = "_id";
		
		var c, found=false;
		for(c in $scope.userStories) {
			if($scope.userStories[c][property] == id) {
				found=true;
				index = c;
				break;
			}
		}
		
		$scope.userStories.splice(index, 1);*/
	};
	
	$scope.editUserStory = function(userStory){
          $scope.body = userStory.body;
          $scope.priority = userStory.priority;
		  $scope.difficulty = userStory.difficulty;
		  $scope.id = userStory._id;
	};
	
	$scope.updateUserStory = function(idBL, idUS){
		if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
		backlogs.updateUS(idBL, $scope.id, {
			body: $scope.body, 
			priority: $scope.priority,
			difficulty: $scope.difficulty
		});
		$scope.body='';
		$scope.priority='';
		$scope.difficulty='';
		$scope.backlog.userStories
	};
}]);