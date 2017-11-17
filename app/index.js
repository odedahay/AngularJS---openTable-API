
var app = angular.module("restaurantApp", ['ngRoute']);


// routes
app.config(function($routeProvider) {

    $routeProvider

    .when("/city/:city", {

        templateUrl : "./views/main.html",
        controller : "searchRestaurant"
    })
    .when("/restaurants/:id", {
        templateUrl : "./views/single.html", 
        controller : "singleRestaurant"
    })
    .otherwise( { redirectTo: '/city/New York' } );

});


// factory
app.factory('GetData', function ($http) {

  return {
    OpenTableService: function (city, inputCity, response) {
        var urlLink = "http://opentable.herokuapp.com/api/restaurants?&country=US&"+city+"="+inputCity+"&per_page=10";
        $http.get(urlLink).success(response);
    }
  }

});


// factory
app.factory('GetData_details', function ($http) {

  return {
    OpenTableServiceSingle: function (type, id, response) {
        var urlLink = "http://opentable.herokuapp.com/api/"+type+"/"+id;
        $http.get(urlLink).success(response);
    }
  }

});


// controller
app.controller('searchRestaurant', function($scope, GetData, $routeParams, $route, $location) {

    $scope.city = $routeParams.city;
 
    GetData.OpenTableService('city', $routeParams.city, function(response) {
      $scope.result = response;

      if ($scope.result.total_entries == 0){
      		
      		$scope.noresult = response;
      
      }

      console.log("not found", $scope.result);
    });

    // redirect to page
    $scope.gotoCity = function(city){
        $location.path( "/city/" + city );
    }; 

    // redirect to page
    $scope.gotoRestaurant = function(id){
        $location.path( "/restaurants/" + id );
    }; 
    
}); 


// controller
app.controller('singleRestaurant', function($scope, GetData_details, $routeParams, $filter) {

	 GetData_details.OpenTableServiceSingle('restaurants', $routeParams.id,function(response) {
        $scope.restaurant = response;
    });

	// var cityId = $routeParams.id;

 //    GetData.OpenTableServiceSingle('restaurants', $routeParams.id,function(response) {

 //     	var data = response;
 //     	console.log("data", data );
 //     	$scope.restaurant = $filter('filter')(data, function(d) {
 //     		console.log("d", d.id);
 //        	return d.id == cityId;
 //        })[0];
     	
 //     	console.log("restaurant", $scope.restaurant );
 //    });
});



app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});




//http://opentable.herokuapp.com/api/restaurants?country=US&city=boston&per_page=100



