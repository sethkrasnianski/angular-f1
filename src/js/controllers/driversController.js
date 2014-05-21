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