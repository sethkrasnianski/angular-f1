F1 = angular.module('F1', [
  'F1.controllers',
  'F1.services',
  'ngRoute',
]).config(['$routeProvider', function($routeProvider) {
  // This is for servers which have route fallback setup for pushState
  // $locationProvider.html5Mode(true);
  $routeProvider.
    when('/drivers', {templateUrl: "partials/drivers.html", controller: "driversController"}).
    when('/drivers/:id', {templateUrl: "partials/driver.html", controller: "driverController"}).
    otherwise({redirectTo: '/drivers'});
}]);

F1.controllers = angular.module('F1.controllers', []);
F1.services    = angular.module('F1.services', []);
F1.controllers.controller('driverController', function($scope, $routeParams, ergastAPIservice) {
  $scope.id     = $routeParams.id;
  $scope.races  = [];
  $scope.driver = null;

  ergastAPIservice.getDriverDetails($scope.id).success(function(data) {
    $scope.driver = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
  });

  ergastAPIservice.getDriverRaces($scope.id).success(function(data) {
    $scope.races  = data.MRData.RaceTable.Races;
  });
});
F1.controllers.controller('driversController', function($scope, ergastAPIservice) {
  $scope.nameFilter   = null;
  $scope.drivers      = [];
  $scope.searchFilter = function(driver) {
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
  };

  ergastAPIservice.getDrivers().success(function(data) {
    $scope.drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  });
});
F1.services.factory('ergastAPIservice', function($http) {
  var ergastAPI = {};

  ergastAPI.getDrivers       = function() {
    return $http.jsonp('http://ergast.com/api/f1/2014/driverStandings.json?callback=JSON_CALLBACK');
  };

  ergastAPI.getDriverDetails = function(id) {
    return $http.jsonp('http://ergast.com/api/f1/2014/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK');
  };

  ergastAPI.getDriverRaces   = function(id) {
    return $http.jsonp('http://ergast.com/api/f1/2014/drivers/'+ id +'/results.json?callback=JSON_CALLBACK');
  };

  return ergastAPI;

});