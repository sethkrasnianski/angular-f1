F1.controllers.controller('driverController', function($scope, $routeParams, API) {
  $scope.id     = $routeParams.id;
  $scope.races  = [];
  $scope.driver = null;

  API.getDriverDetails($scope.id).success(function(data) {
    $scope.driver = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
  });

  API.getDriverRaces($scope.id).success(function(data) {
    $scope.races  = data.MRData.RaceTable.Races;
  });
});