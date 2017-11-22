angular.module("restaurantApp")

.controller('reservationsCtrl', ['$scope', '$http', '$routeParams','dataShare', '$location', 'GetData_details',
      function($scope, $http, $routeParams, dataShare, $location, GetData_details) {

      $http.get('/reservations/restaurant/' + $routeParams.id).success(function(data) {
          $scope.reservation = data;

          // Available Time slot for dropdown (hardcoded)
          $scope.availableTime = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

          if($scope.reservation == 0){

            $scope.availableTime;

          }else {

            // get all reserved time in collections
            var reservedTime = [];
            for (var prop in $scope.reservation) {
              reservedTime.push($scope.reservation[prop].time)
            }

            // remove all those already reserved time and display only the available
            $scope.availableTime = $scope.availableTime.filter(function(val) {
              return reservedTime.indexOf(val) == -1;
            });

          }

        }).error(function(err){
          console.log("Error",err);
      });

      GetData_details.OpenTableServiceSingle('restaurants', $routeParams.id, function(response) {
           $scope.restaurant = response;

           $scope.restaurant_id = $scope.restaurant.id;
           $scope.restaurant_name = $scope.restaurant.name;

       });

      // get the value from forms
      $scope.reserveTableAvailable = function(){

        var data = {
          people: $scope.people,
          date: $scope.date,
          time: $scope.timeslot,
          name: $scope.name,
          contact: $scope.contact,
          email: $scope.email,
          restaurant_id: $scope.restaurant.id,
          restaurant_name: $scope.restaurant.name
        }

        $http.post('/reservations/restaurants/r/book', data).success(function(data, status) {
          console.log(status)
        });

        $location.path('/restaurants/list/summary');

      }

}])
.controller('summaryListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $http.get('/reservations').success(function(data) {
      $scope.summaries = data;
    });

    // $scope.removeReservation = function(_id){
    //   $http.delete('/restaurants/list/summary/' + _id).success(function(data){
    //     console.log(data);
    //   });
    //
    //   $location.path('/restaurants/list/summary');
    // }
}])

.factory('dataShare',function($rootScope){
      var service = {};
      service.data = false;

      service.sendData = function(data){
          this.data = data;
          $rootScope.$broadcast('data_shared');
      };

      service.getData = function(){
        return this.data;
      };

      return service;
  });


// .controller('reservationsDetailsCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
//
//
// }]);
