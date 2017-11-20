
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
      .when("/restaurants/r/:id", {
        templateUrl: "./views/reservations.html",
        controller: "reservationsCtrl"
      })
      .when("/restaurants/r/book/", {
        templateUrl: "./views/booking.html",
        controller: "reservationsDetailsCtrl"
      })
      // .when("/restaurants/add", {
      //   templateUrl: "./views/booking.html",
      //   controller: "reservationsDetailsCtrl"
      // })
      .when("/restaurants/list/summary", {
        templateUrl: "./views/summary.html",
        controller: "summaryListCtrl"
      })
      // .when("/restaurants/summary/edit/:id", {
      //   templateUrl: "./views/summary_add.html",
      //   controller: "summaryListAddCtrl"
      // })
      .otherwise( { redirectTo: '/city/New York' } );

});


// factory
app.factory('GetData', function ($http) {

  return {
    OpenTableService: function (city, inputCity, response) {
        var urlLink = "https://opentable.herokuapp.com/api/restaurants?&country=US&"+city+"="+inputCity+"&per_page=10";
        $http.get(urlLink).success(response);
    }
  }

});


// factory
app.factory('GetData_details', function ($http) {

  return {
    OpenTableServiceSingle: function (type, id, response) {
        var urlLink = "https://opentable.herokuapp.com/api/"+type+"/"+id;
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
app.controller('singleRestaurant', function($scope, GetData_details, $routeParams, $filter, dataShare) {

	 GetData_details.OpenTableServiceSingle('restaurants', $routeParams.id, function(response) {
        $scope.restaurant = response;
        
        $scope.restoData = {
          id: $scope.restaurant.id,
          name: $scope.restaurant.name
        };
        
        //pass the json object to the service
        $scope.send = function(){
          dataShare.sendData($scope.restoData);
        };
    });
});


app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

// app.service('restaurantData', function(data){
//   this.restoData = data;
// });

//http://opentable.herokuapp.com/api/restaurants?country=US&city=boston&per_page=100



