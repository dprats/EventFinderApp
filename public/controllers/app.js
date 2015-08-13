console.log('hello from app.js');

angular.module('myApp',['ngRoute', 'ngResource']);

angular.module('myApp').config(['$routeProvider', function($routeProvider){

	console.log('route');
	$routeProvider.
		when('/', {
			templateUrl: 'views/address.html',
			controller: 'DistanceController'
		});

}]);

console.log('hello 2 from app.js');


angular.module('myApp').config(['$httpProvider', function($httpProvider) {
  
  		console.log('http');

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);



angular.module('myApp').controller('DistanceController', ['$scope', function($scope){

	console.log('hi from DC');

	//setup used so we use google maps API
	var service = new google.maps.DistanceMatrixService();

	//hardcoded origin address
	$scope.origin = '121 East 6th Los Angeles, CA';

	//initalize the distance to the origin and destination
	$scope.distanceToDestination = '';
	$scope.destination = '';
	$scope.durationToDestination = '';



	//method which calulates the distance between origin and distance
	$scope.calculateDistance = function(){

		service.getDistanceMatrix(
		{
			origins: [$scope.origin],
			destinations: [$scope.destination],
			travelMode: google.maps.TravelMode.DRIVING
		}, function(res, status){
			var status = res.rows[0].elements[0].status;
			console.log("status: " + status);
			if (status == 'OK'){
				var distance = res.rows[0].elements[0].distance.text;
				var duration = res.rows[0].elements[0].duration.text

				$scope.$apply(function(){
					$scope.distanceToDestination = distance;
					$scope.durationToDestination = duration;
				});
			}
		});

	}


}]);

// var API_KEY = 'AIzaSyB_87j_DSDbYaeZ4p6CerzV5LQbLT5qRj8';