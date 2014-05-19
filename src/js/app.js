F1 = angular.module('F1', [
  'F1.controllers',
  'F1.services',
  'ngRoute',
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/drivers', {templateUrl: "partials/drivers.html", controller: "driversController"}).
    when('/drivers/:id', {templateUrl: "partials/driver.html", controller: "driverController"}).
    otherwise({redirectTo: '/drivers'});
}]);

F1.controllers = angular.module('F1.controllers', []);
F1.services    = angular.module('F1.services', []);