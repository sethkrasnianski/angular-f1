F1 = angular.module('F1', [
  'ngRoute',
  'F1.api',
  'F1.controllers'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/drivers', {templateUrl: "partials/drivers.html", controller: "driversController"}).
    when('/drivers/:id', {templateUrl: "partials/driver.html", controller: "driverController"}).
    otherwise({redirectTo: '/drivers'});
}]);

F1.controllers = angular.module('F1.controllers', []);
F1.api         = angular.module('F1.api', []);
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
F1.controllers.controller('driversController', function($scope, API) {
  $scope.nameFilter   = null;
  $scope.drivers      = [];
  $scope.searchFilter = function(driver) {
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
  };

  API.getDrivers().success(function(data) {
    $scope.drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
});
F1.api.factory('API', function($http) {
  var ergastAPI = {};

  ergastAPI.getDrivers       = function() {
    return $http.get('http://ergast.com/api/f1/2014/driverStandings.json');
  };

  ergastAPI.getDriverDetails = function(id) {
    return $http.get('http://ergast.com/api/f1/2014/drivers/'+ id +'/driverStandings.json');
  };

  ergastAPI.getDriverRaces   = function(id) {
    return $http.get('http://ergast.com/api/f1/2014/drivers/'+ id +'/results.json');
  };

  return ergastAPI;

});