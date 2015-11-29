angular.module('gantts', [ 'googlechart' ]).controller('GanttCtrl', [
'$scope',
'gantts',
function($scope, gantts, users, tasks){

	$scope.backlogId = gantts.getIdBl();
	$scope.sprintId = gantts.getIdSp();
	
	$scope.tasks = gantts.tasks;
	$scope.users = gantts.users;

	$scope.addUserStory = false;

	var chart1 = {};

	chart1.options = {
	        "title": "Diagramme de Gantt",
	        "hAxis": {
	            "title": "Durée"
	        }
	    };

    chart1.formatters = {};

	var limit;

	function initChart(){
		limit = [];
		chart1.type = "Timeline";
	    chart1.cssStyle = "height: 30%; width:60%;";
	    chart1.data = {"cols": [
	        {id: "dev", label: "Dev", type: "string"},
	        {id: "task", label: "Task", type: "string"},
	        {id: "start", label: "Start", type: "number"},
	        {id: "end", label: "End", type: "number"},
	        {role: "tooltip", type: "string"}
	    ], "rows": [
	    ]};
	};

	function addRow(rows, user, task, limit){
    	var t = {c: []};
    	t.c.push({v: user.forename});
    	t.c.push({v: task.description});
    	t.c.push({v: limit});
    	t.c.push({v: limit+task.dure});
    	t.c.push({v: task.description});
		rows.push(t);
	};

	function fillChart(rows, users, tasks){
		var indexUser;
		var indexTask;
		var indexLimit = 0;
		for(indexUser = 0; indexUser < users.length; indexUser++){
			limit.push(0);
			for(indexTask = 0; indexTask < tasks.length; indexTask++){
				if(tasks[indexTask].userId == users[indexUser]._id){
					addRow(rows, users[indexUser], tasks[indexTask], limit[indexLimit]);
					limit[indexLimit] += tasks[indexTask].dure;
				}
			}
			indexLimit++;
		}
	};

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

    initChart();
    fillChart(chart1.data.rows, $scope.users, $scope.tasks);
    $scope.chart = chart1;

}]);