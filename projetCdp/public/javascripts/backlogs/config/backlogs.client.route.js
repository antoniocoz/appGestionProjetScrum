//Setup a state called home
/*
angular.module('backlogs').config([
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
    });
    
  // redirect unspecified routes
  //$urlRouterProvider.otherwise('home');
}]);*/