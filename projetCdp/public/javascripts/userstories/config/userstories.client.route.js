//Setup a state called home
/*
angular.module('userstories').config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

   $stateProvider
    .state('userStories', {
	  url: '/userStories/{id}',
	  templateUrl: '/userStories.html',
	  controller: 'USCtrl',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  resolve: {
		userStoriesPromise: ['$stateParams', 'userStories', function($stateParams, userstories) {
			console.log($stateParams.id);
		  return userStories.getAll($stateParams.id);
		}]
	  }
	});
    //$urlRouterProvider.otherwise('home');
}]);*/