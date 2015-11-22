//US controller
angular.module('gantts', [ 'googlechart' ]).controller('GanttCtrl', [
'$scope',
'gantts',
function($scope, gantts){

	$scope.backlogId = gantts.getIdBl();
	$scope.sprintId = gantts.getIdSp();
	
	//$scope.tasks = gantts.getAllTasks($scope.sprintId);
	//$scope.users = gantts.getAllUsers($scope.backlogId);

	var limit = [];

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
				if(tasks[indexTask].owner == users[indexUser]._id){
					addRow(rows, users[indexUser], tasks[indexTask], limit[indexLimit]);
					limit[indexLimit] += tasks[indexTask].dure;
				}
			}
			indexLimit++;
		}
	}

	$scope.tasks = [
	{"_id":"1","description":"t1","usId":"56473ffd36dd0a100e1e2eb2","__v":0,"etat":0,"tacheId":[],"delaiplustard":0,"delaiplustot":0,"dure":1,"numero":1,"owner":"1a"},
	{"_id":"2","description":"t2","usId":"56473ffd36dd0a100e1e2eb2","__v":0,"etat":0,"tacheId":[],"delaiplustard":0,"delaiplustot":0,"dure":2,"numero":1,"owner":"1a"},
	{"_id":"3","description":"t3","usId":"56473ffd36dd0a100e1e2eb2","__v":0,"etat":0,"tacheId":[],"delaiplustard":0,"delaiplustot":0,"dure":2,"numero":1,"owner":"1b"},
	{"_id":"4","description":"t4","usId":"56473ffd36dd0a100e1e2eb2","__v":0,"etat":0,"tacheId":[],"delaiplustard":0,"delaiplustot":0,"dure":3,"numero":1,"owner":"1b"},
	{"_id":"5","description":"t5","usId":"56473ffd36dd0a100e1e2eb2","__v":0,"etat":0,"tacheId":[],"delaiplustard":0,"delaiplustot":0,"dure":2,"numero":1,"owner":"1c"},
	{"_id":"6","description":"t6","usId":"56473ffd36dd0a100e1e2eb2","__v":0,"etat":0,"tacheId":[],"delaiplustard":0,"delaiplustot":0,"dure":1,"numero":1,"owner":"1c"},
	{"_id":"7","description":"t7","usId":"56473ffd36dd0a100e1e2eb2","__v":0,"etat":0,"tacheId":[],"delaiplustard":0,"delaiplustot":0,"dure":3,"numero":1,"owner":"1d"}
	];

	$scope.users = [
	{"_id":"1a", "forename":"Bertrand", "surname":"Guillozet", "contact":"berguiz@hotmail.com", "backlog":"54qsdfsqdf54"},
	{"_id":"1b", "forename":"Baptiste", "surname":"Trulla", "contact":"bt@hotmail.com", "backlog":"54qsdfsqdf54"},
	{"_id":"1c", "forename":"Antonio", "surname":"Coz", "contact":"ac@hotmail.com", "backlog":"54qsdfsqdf54"},
	{"_id":"1d", "forename":"Arthur", "surname":"Dessez", "contact":"ad@hotmail.com", "backlog":"54qsdfsqdf54"}
	];

	/*var chart = {};
	chart.type = "timeline";
	chart.cssStyle = "height: 100%; width: 40%";*/

	var chart1 = {};
    chart1.type = "Timeline";
    chart1.cssStyle = "height: 50%; width:60%;";
    chart1.data = {"cols": [
        {id: "dev", label: "Dev", type: "string"},
        {id: "task", label: "Task", type: "string"},
        {id: "start", label: "Start", type: "number"},
        {id: "end", label: "End", type: "number"},
        {role: "tooltip", type: "string"}
    ], "rows": [
    ]};

    fillChart(chart1.data.rows, $scope.users, $scope.tasks);

    console.log(limit);
    chart1.options = {
        "title": "Diagramme de Gantt",
        "hAxis": {
            "title": "Durée"
        }
    };

    chart1.formatters = {};

    $scope.chart = chart1;
}]);