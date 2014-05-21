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