angular.module('commits').controller('CommitCtrl', ['$scope','commits',

    function($scope, commits) {
        $scope.commits = commits.commits;
        $scope.backlogId = commits.getIdBl();
        $scope.i = 1;
        $scope.previousbtn = false;
        $scope.nextbtn = true;
       
        $scope.next = function(){
        	$scope.i++;
  
       	 	commits.get($scope.backlogId, $scope.i).success(function(){
	       	 	if($scope.commits.length == 0){
	       			$scope.i--;
	       			commits.get($scope.backlogId, $scope.i);
	       			$scope.nextbtn = false;
	       		}
	       	 	if($scope.i >= 2){
	       			$scope.previousbtn = true;
	       		}else{
	       			$scope.previousbtn = false;
	       		}
       		});
       	}

       	$scope.previous = function(){
        	$scope.i--;
       	 	commits.get($scope.backlogId, $scope.i);
       		$scope.nextbtn = true;
       		if($scope.i == 1){
       			$scope.previousbtn = false;
       		}
       	}

    }
]);