angular.module('commits').controller('CommitCtrl', ['$scope','commits',

    function($scope, commits) {
        $scope.commits = commits.commits;
        $scope.backlogId = commits.getIdBl();
        $scope.i = 1;
        $scope.previousbtn = false;
        $scope.nextbtn = true;
       
        $scope.next = function(){
        	$scope.i++;
       	 	commits.get($scope.backlogId, $scope.i);
       	 	if($scope.i >= 2){
       			$scope.previousbtn = true;
       		}
       		if($scope.commits.length == 0){
       			$scope.i--;
       			commits.get($scope.backlogId, $scope.i);
       			$scope.nextbtn = false;
       		}
       	}

       	$scope.previous = function(){
        	$scope.i--;
       	 	commits.get($scope.backlogId, $scope.i);
       		$scope.nextbtn = true;
       	}
    }
]);