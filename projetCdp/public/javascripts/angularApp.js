//Dependencies
var app = angular.module('backlogs', ['ui.router']);

//Setup states
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  //Setup a state called home
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

  // redirect unspecified routes
  $urlRouterProvider.otherwise('home');
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
	
  //update one backlog
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
		console.log(backlog._id);
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
'backlogs',
'backlog',
function($scope, backlogs, backlog){
	$scope.backlog = backlog;

}]);