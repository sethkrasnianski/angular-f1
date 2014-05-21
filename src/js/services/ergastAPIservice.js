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