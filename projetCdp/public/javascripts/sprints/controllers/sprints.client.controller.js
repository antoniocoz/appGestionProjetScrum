//Sprint controller
angular.module('sprints').controller('SprintCtrl', [
'$scope',
'sprints',
function($scope, sprints, userStories){
	$scope.sprints = sprints.sprints;
	$scope.userStories = sprints.userStories;

	$scope.backlogId = sprints.getIdBl();

	$scope.updateUserStories = false;
	$scope.edit = false;

	$scope.$watch('selected', function(nowSelected){
	  	$scope.uss = [];

	  	if( ! nowSelected){return;}

	  	angular.forEach(nowSelected, function(val){
	  		$scope.uss.push(val._id);
	  	});

	  	console.log("test");

	  });
	
	$scope.addSprint = function(idSprint){
	  /*if($scope.title === '') { return; }
	  sprints.createSP({
		title: $scope.title,
		backlog: $scope.backlogId
	  });
	  $scope.title = '';*/

		if($scope.title === '') { return; }
	  	sprints.createSprint({
		title: $scope.title,
		backlog: $scope.backlogId
	  });
	  $scope.title = '';
	  $scope.edit = false;

	};

	$scope.showFormUs = function(sprint){
          $scope.updateUserStories = true;
          $scope.id = sprint._id;
          $scope.edit = true;

	};

	$scope.addUS = function(){
        for(var i= 0; i < $scope.uss.length; i++)
		{
		    sprints.updateUS($scope.uss[i].backlog, $scope.uss[i]._id, {
		    	body: $scope.uss[i].body, 
				priority: $scope.uss[i].priority,
				difficulty: $scope.uss[i].difficulty,
				sprint: $scope.id
			});
		}
		$scope.updateUserStories = false;
	    $scope.edit = false;

	};

	$scope.editSprint = function(sprint){
          $scope.title = sprint.title;
          $scope.id = sprint._id;
          $scope.edit = true;


	};

	$scope.removeUserStory = function(userStory){

          sprints.updateUS(userStory.backlog, userStory._id, {
		    	body: userStory.body, 
				priority: userStory.priority,
				difficulty: userStory.difficulty,
				sprint: ""
			});

	};

	$scope.updateSprint = function(id){
          if(!$scope.title || $scope.title === '') { return; }
		  sprints.updateSP($scope.backlogId, $scope.id, {
		title: $scope.title
		});
		$scope.title = '';
	  $scope.id='';
      $scope.edit = false;

  };

  	$scope.deleteSprint = function(id){
		sprints.deleteSP(id, $scope.backlogId);
	};

	$scope.newSprint = function(){
          $scope.edit = true;
	};
	$scope.cancel = function(){
          $scope.edit = false;
          $scope.updateUserStories = false;

	};

}]);