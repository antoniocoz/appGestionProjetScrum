var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','backlogs','userstories','taches', 'commits', 'sprints', 'users']);

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
	  url: '/taches/:usId/:idBL',
	  templateUrl: 'javascripts/taches/views/list-taches.client.view.html',
	  controller: 'tacheController',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  
	  resolve: {
		tachesPromise: ['$stateParams', 'tacheService', function($stateParams, tacheService) {
		  tacheService.setIdBl($stateParams.idBL);
		  tacheService.setIdUs($stateParams.usId);
		  return tacheService.getAll($stateParams.usId);
		}]
	  }
	})
	.state('taches/create', {
	  url: '/taches/create/:usId/:idBL',
	  templateUrl: 'javascripts/taches/views/create-taches.client.view.html',
	  controller: 'tacheController',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  resolve: {
		tachesPromise: ['$stateParams', 'tacheService', function($stateParams, tacheService) {
		  tacheService.setIdBl($stateParams.idBL);
		  tacheService.setIdUs($stateParams.usId);
		}]
	  }
	})
	.state('taches/kanban/p', {
	  url: '/taches/kanban/p/:spId/:idBL',
	  templateUrl: 'javascripts/taches/views/view-taches.client.view.html',
	  controller: 'tacheController',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  resolve: {
		tachesPromise: ['$stateParams','tacheService', function($stateParams, tacheService) {
		  tacheService.setIdBl($stateParams.idBL);
		  return tacheService.getTachesBySprints($stateParams.spId);
		}]
	  }
	})
	.state('taches/pert', {
	  url: '/taches/pert/:spId/:idBL',
	  templateUrl: 'javascripts/taches/views/pert-taches.client.view.html',
	  controller: 'tacheController',
	  // anytime our backlogs state is entered, we will automatically query all US from a backlog
	  resolve: {
		tachesPromise: ['$stateParams','tacheService', function($stateParams, tacheService) {
		  tacheService.setIdBl($stateParams.idBL);
		  return tacheService.getTachesBySprints($stateParams.spId);
		}]
	  }
	})		
	.state('sprints', {
	  url: '/sprints/:id',
	  templateUrl: 'javascripts/sprints/views/sprints.client.view.html',
	  controller: 'SprintCtrl',
	  resolve: {
		sprintsPromise: ['$stateParams', 'sprints', function($stateParams, sprints) {
			sprints.setIdBl($stateParams.id);
			sprints.getAllUS($stateParams.id);
		  return sprints.getAll($stateParams.id);
		}]

	  }
	})
	.state('users', {
	  url: '/users/:id',
	  templateUrl: 'javascripts/users/views/users.client.view.html',
	  controller: 'UserCtrl',
	  resolve: {
		usersPromise: ['$stateParams', 'users', function($stateParams, users) {
			users.setIdBl($stateParams.id);
		  return users.getAll($stateParams.id);
		}]

	  }
	})
	.state('commits', {
	  url: '/commits/:id',
	  templateUrl: 'javascripts/commits/views/commits.client.view.html',
	  controller: 'CommitCtrl',
	  resolve: {
		commitsPromise: ['$stateParams', 'commits', function($stateParams, commits) {
			commits.setIdBl($stateParams.id);
			return commits.get($stateParams.id);
		}]

	  }
	});

  // redirect unspecified routes
  $urlRouterProvider.otherwise('home');
}]);


angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});