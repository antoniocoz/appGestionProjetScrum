//Sprint controller
angular.module('sprints', ['googlechart']).controller('SprintCtrl', [
    '$scope',
    'sprints',
    function($scope, sprints, userStories) {
        $scope.sprints = sprints.sprints;
        $scope.userStories = sprints.userStories;

        $scope.backlogId = sprints.getIdBl();

        $scope.updateUserStories = false;
        $scope.edit = false;

        $scope.$watch('selected', function(nowSelected) {
            $scope.uss = [];
            if (!nowSelected) {
                return;
            }

            angular.forEach(nowSelected, function(val) {
                $scope.uss.push(val._id);
            });


        });

        //Variables et méthodes liées au burdown chart
        var chart1 = {};

        $scope.allSprints = function() {
            return $scope.sprints.length;
        }

        $scope.allDifficulties = function() {
            var sum = 0;
            for (var i = 0; i < $scope.userStories.length; i++) {
                sum += $scope.userStories[i].difficulty;
            }
            return sum;
        }

        $scope.allDifficultiesBySprint = function(sprintId) {
            var sum = 0;
            for (var i = 0; i < $scope.userStories.length; i++) {
                if ($scope.userStories[i].sprint == sprintId) {
                    sum += $scope.userStories[i].difficulty;
                }
            }
            return sum;
        }

        function initChart() {
            chart1.type = "LineChart";
            chart1.cssStyle = "height: 50%; width:60%;";
            chart1.data = {
                "cols": [{
                    id: "sprint",
                    label: "Sprint",
                    type: "number"
                }, {
                    id: "parfait",
                    label: "Parfait",
                    type: "number"
                }, {
                    id: "effectif",
                    label: "Effectif",
                    type: "number"
                }],
                "rows": []
            };

            chart1.options = {
                "title": "Burdown Chart",
                "tooltip": {
                    trigger: "none"
                },
                hAxis: {
                    title: 'Sprints',
                    viewWindow: {
                        max: $scope.allSprints(),
                        min: 0
                    },
                    gridlines: {
                        count: $scope.allSprints() + 1
                    }
                },
                vAxis: {
                    title: 'Difficulties',
                    viewWindow: {
                        max: $scope.allDifficulties(),
                        min: 0
                    },
                    gridlines: {
                        count: $scope.allDifficulties() + 1
                    }
                }
            };

            chart1.formatters = {};
            chart1.data.rows = [];
        };

        $scope.previousDifficulty = $scope.allDifficulties();

        function addRowInit(rows, i, perfectValue, realValue, previousDifficulty) {
            var t = {
                c: []
            };
            t.c.push({
                v: i
            });
            t.c.push({
                v: perfectValue
            });
            t.c.push({
                v: realValue
            });
            rows.push(t);
        };

        function addRow(rows, i, perfectValue, realValue, previousDifficulty) {
            var t = {
                c: []
            };
            t.c.push({
                v: i
            });
            t.c.push({
                v: perfectValue
            });
            t.c.push({
                v: realValue
            });
            rows.push(t);
            $scope.previousDifficulty = perfectValue;
        };

        function fillChart(rows, sprints) {
            var index;
            var indexSprint = 1;
            var totalDifficulties = $scope.allDifficulties();
            var totalSprints = $scope.allSprints();
            addRowInit(rows, 0, totalDifficulties, totalDifficulties);
            for (index = 0; index < sprints.length; index++) {
                addRow(rows, indexSprint, $scope.previousDifficulty - (totalDifficulties / totalSprints), $scope.allDifficultiesBySprint(sprints[index]._id), $scope.previousDifficulty);
                indexSprint++;
            }
        };

        $scope.addSprint = function(idSprint) {

            if ($scope.title === '') {
                return;
            }
            sprints.createSprint({
                title: $scope.title,
                backlog: $scope.backlogId
            });
            $scope.title = '';
            $scope.edit = false;

        };

        $scope.showFormUs = function(sprint) {
            $scope.updateUserStories = true;
            $scope.id = sprint._id;
            $scope.edit = true;

        };

        $scope.addUS = function() {
            for (var i = 0; i < $scope.uss.length; i++) {
                sprints.updateUS($scope.uss[i].backlog, $scope.uss[i]._id, {
                    body: $scope.uss[i].body,
                    priority: $scope.uss[i].priority,
                    difficulty: $scope.uss[i].difficulty,
                    sprint: $scope.id
                });
            }
            $scope.updateUserStories = false;
            $scope.edit = false;

        };

        $scope.editSprint = function(sprint) {
            $scope.title = sprint.title;
            $scope.id = sprint._id;
            $scope.edit = true;


        };

        $scope.removeUserStory = function(userStory) {

            sprints.updateUS(userStory.backlog, userStory._id, {
                body: userStory.body,
                priority: userStory.priority,
                difficulty: userStory.difficulty,
                sprint: ""
            });

        };

        $scope.updateSprint = function(id) {
            if (!$scope.title || $scope.title === '') {
                return;
            }
            sprints.updateSP($scope.backlogId, $scope.id, {
                title: $scope.title
            });
            $scope.title = '';
            $scope.id = '';
            $scope.edit = false;

        };

        $scope.deleteSprint = function(id) {
            sprints.deleteSP(id, $scope.backlogId);
        };

        $scope.newSprint = function() {
            $scope.edit = true;
        };

        $scope.cancel = function() {
            $scope.edit = false;
            $scope.updateUserStories = false;
        };

        $scope.showPert = function(id) {
            $scope.edit = false;
            $scope.updateUserStories = false;

        };
        initChart();
        fillChart(chart1.data.rows, $scope.sprints);
        $scope.chart = chart1;

    }
]);