//Dependencies
var app = angular.module('backlogs', ['ui.router']);

//Setup a state called home
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'BacklogCtrl',
	  // anytime our home state is entered, we will automatically query all backlogs from our backend
	  resolve: {
		backlogPromise: ['backlogs', function(backlogs){
		  return backlogs.getAll();
		}]
	  }
    })
	.state('userStories', {
	  url: '/userStories/{id}',
	  templateUrl: '/userStories.html',
	  controller: 'USCtrl',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  resolve: {
		userStoriesPromise: ['$stateParams', 'userStories', function($stateParams, userStories) {
			console.log($stateParams.id);
		  return userStories.getAll($stateParams.id);
		}]
	  }
	});

  // redirect unspecified routes
  $urlRouterProvider.otherwise('home');
}]);


app.factory('userStories', ['$http', function($http){
  var o = {userStories: []};

  o.getAll = function(idBL) {
    return $http.get('/userStories/' + idBL).success(function(data){
      angular.copy(data, o.userStories);
    });
  };

  o.deleteUS = function(id, idBL) {
	  return $http.delete('/userStories/' + id).success(function(response){
		o.getAll(idBL);
	  });
	};
 
  return o;
}]);

//Service
app.factory('backlogs', ['$http', function($http){
  var o = {backlogs: []};
  
  //get all backlogs
  o.getAll = function() {
    return $http.get('/backlogs').success(function(data){
      angular.copy(data, o.backlogs);
    });
  };
  
  //create a new backlog
  o.create = function(backlog) {
	  return $http.post('/backlogs', backlog).success(function(data){
		o.backlogs.push(data);
	  });
	};
	
  //get one backlog in using an id
  o.get = function(id) {
	  return $http.get('/backlogs/' + id).then(function(res){
		return res.data;
	  });
	};
	
  //delete one backlog in using an id
  o.deleteBL = function(id) {
	  return $http.delete('/backlogs/' + id).success(function(response){
		o.getAll();
	  });
	};
	
  //update a backlog
  o.updateBL = function(id, backlog) {
	  return $http.put('/backlogs/' + id, backlog).success(function(response){
		o.getAll();
	  });
	};
 
  return o;
}]);

//Backlog controller
app.controller('BacklogCtrl', [
'$scope',
'backlogs',
function($scope, backlogs){
  $scope.backlogs = backlogs.backlogs;
  
  $scope.deleteBacklog = function(id){
	  backlogs.deleteBL(id);
  };
  
  $scope.editBacklog = function(backlog){
          $scope.title = backlog.title;
          $scope.description = backlog.description;
		  $scope.id = backlog._id;
  };
  
  $scope.updateBacklog = function(id){
          if(!$scope.title || $scope.title === '' || !$scope.description || $scope.description === '') { return; }
		  backlogs.updateBL($scope.id, {
		title: $scope.title, 
		description: $scope.description
		});
		$scope.title = '';
	  $scope.description = '';
  };
  
  $scope.addBacklog = function(){
	  if(!$scope.title || $scope.title === '' || !$scope.description || $scope.description === '') { return; }
	  backlogs.create({
		title: $scope.title, 
		description: $scope.description
		});
	  $scope.title = '';
	  $scope.description = '';
  };
  
}]);

//US controller
app.controller('USCtrl', [
'$scope',
'userStories',
function($scope, userStories){
	//On récupère l'ensemble des US via getAll du service
	$scope.userStories = userStories.userStories;
	
	$scope.addUserStory = function(){
	  if($scope.body === '' || !$scope.priority || !$scope.difficulty) { return; }
	  backlogs.createUS(backlog._id, {
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