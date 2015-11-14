var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','backlogs','userstories','taches']);

//Setup a state called home
mainApplicationModule.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'javascripts/backlogs/views/backlogs.client.view.html',
      controller: 'BacklogCtrl',
	  // anytime our home state is entered, we will automatically query all backlogs from our backend
	  resolve: {
		backlogPromise: ['backlogs', function(backlogs){
		  return backlogs.getAll();
		}]
	  }
    })
	.state('userStories', {
	  url: '/userStories/:id',
	  templateUrl: 'javascripts/userstories/views/userstories.client.view.html',
	  controller: 'USCtrl',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  resolve: {
		userStoriesPromise: ['$stateParams', 'userStories', function($stateParams, userStories) {
			userStories.setIdBl($stateParams.id);
		  return userStories.getAll($stateParams.id);
		}]
	  }
	})
	.state('taches', {
	  url: '/taches/:usId',
	  templateUrl: 'javascripts/taches/views/list-taches.client.view.html',
	  controller: 'tacheController',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  
	  resolve: {
		tachesPromise: ['$stateParams', 'tacheService', function($stateParams, tacheService) {
		  //console.log($stateParams.usId);
		  return tacheService.getAll($stateParams.usId);
		}]
	  }
	})
	.state('taches/create', {
	  url: '/taches/create/:usId',
	  templateUrl: 'javascripts/taches/views/create-taches.client.view.html',
	  controller: 'tacheController',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  resolve: {
		tachesPromise: ['$stateParams', 'tacheService', function($stateParams, tacheService) {
		  //console.log($stateParams.usId);
		  //return tacheService.getAll($stateParams.usId);
		}]
	  }
	});

  // redirect unspecified routes
  $urlRouterProvider.otherwise('home');
}]);


angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});