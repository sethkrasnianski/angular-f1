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