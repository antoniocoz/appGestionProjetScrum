angular.module('gantts', [ 'googlechart' ]).controller('GanttCtrl', [
'$scope',
'gantts',
function($scope, gantts, users, tasks){

	$scope.backlogId = gantts.getIdBl();
	$scope.sprintId = gantts.getIdSp();
	
	$scope.tasks = gantts.tasks;
	$scope.users = gantts.users;

	$scope.addUserStory = false;

	$scope.filled = false;
	$scope.empty = true;

	var chart1 = {};

	var limit;

	function initChart(){
		limit = [];
		chart1.type = "Timeline";
	    chart1.cssStyle = "height: 45%; width:60%;";
	    chart1.data = {"cols": [
	        {id: "dev", label: "Dev", type: "string"},
	        {id: "task", label: "Task", type: "string"},
	        {id: "start", label: "Start", type: "number"},
	        {id: "end", label: "End", type: "number"},
	        {role: "tooltip", type: "string", p: {html: true}}
	    ], "rows": [
	    ]};

	    chart1.options = {
	        "title": "Diagramme de Gantt",
	        "tooltip": {
	        	trigger: "none"
	        }
	    };

    	chart1.formatters = {};

	};

	function addRow(rows, user, task, limit){
    	var t = {c: []};
    	t.c.push({v: user.forename});
    	t.c.push({v: "n°"+task.numero});
    	t.c.push({v: limit*1000});
    	t.c.push({v: (limit+task.dure)*1000});
    	t.c.push({v: task.numero});
		rows.push(t);
	};

	function fillChart(rows, users, tasks){
		var indexUser;
		var indexTask;
		var indexLimit = 0;
		var TasksSorted = tasks.sort($scope.compareTask);
			for(indexUser = 0; indexUser < users.length; indexUser++){
				limit.push(0);
				for(indexTask = 0; indexTask < tasks.length; indexTask++){
					if(TasksSorted[indexTask].userId == users[indexUser]._id){
						addRow(rows, users[indexUser], TasksSorted[indexTask], limit[indexLimit]);
						limit[indexLimit] += TasksSorted[indexTask].dure;
						$scope.filled = true;
						$scope.empty = false;
					}
				}
				indexLimit++;
			}
	};

	$scope.compareTask = function(a, b){
		return (b.priority - a.priority);
	}

	$scope.showFormUs = function(user) {
			$scope.addUserStory = true;
            $scope.idUser = user._id;
    };

    $scope.editTask = function(tacheId, tacheOwner) {
        gantts.updateTask($scope.sprintId, tacheId, {owner: tacheOwner});
        $scope.addUserStory = false;
        initChart();
        fillChart(chart1.data.rows, $scope.users, $scope.tasks);
        $scope.chart = chart1;
    };

    $scope.deleteTask = function(taskId) {
        gantts.upOwnerAndPriorityTask($scope.sprintId, taskId);
        initChart();
        fillChart(chart1.data.rows, $scope.users, $scope.tasks);
        $scope.chart = chart1;
    };

    $scope.maxPriority = function(tasks){
    	$scope.max = 0;
    	for(var i=0; i<tasks.length; i++){
    		if($scope.tasks[i].priority > $scope.max){
    			$scope.max = $scope.tasks[i].priority;
    		}
    	}
    }

    $scope.minPriority = function(tasks){
    	$scope.min = $scope.maxPriority ;
    	for(var i=0; i<tasks.length; i++){
    		if($scope.tasks[i].priority > $scope.max){
    			$scope.max = $scope.tasks[i].priority;
    		}
    	}
    }

    $scope.tasksByUser = function(ownerId){
    	var nbTasks = 0;
    	for(var i=0; i<$scope.tasks.length; i++){
    		if($scope.tasks[i].userId == ownerId){
    			nbTasks++;
    		}
    	}
    	return nbTasks;
    }

    $scope.upPriority = function(task, ownerId){
    	var priority;
    	if(task.priority < $scope.tasksByUser(ownerId)-1){
    		priority = task.priority + 1;
    	}
    	else{
    		priority = task.priority;
    	}
    	gantts.updatePriorityTask($scope.sprintId, task._id, {priority: priority});
    }

    $scope.downPriority = function(task){
    	var priority;
    	if(task.priority-1 > 0){
    		priority = task.priority - 1;
    	}
    	else{
    		priority = 0;
    	}
    	gantts.updatePriorityTask($scope.sprintId, task._id, {priority: priority});
    }

    initChart();

    fillChart(chart1.data.rows, $scope.users, $scope.tasks);
    $scope.chart = chart1;

}]);