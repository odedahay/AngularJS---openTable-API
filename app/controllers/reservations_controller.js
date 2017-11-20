angular.module("restaurantApp")

.controller('summaryListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/reservations').success(function(data) {
      $scope.summaries = data;
    });
}])

.controller('reservationsCtrl', ['$scope', '$http', '$routeParams','dataShare', function($scope, $http, $routeParams, dataShare) {

      $http.get('/reservations/restaurant/' + $routeParams.id).success(function(data) {
          $scope.reservation = data;
          // Available Time slot for dropdown (hardcoded)
          $scope.availableTime = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];  
          
          if($scope.reservation == 0){
            $scope.availableTime;  
          }else {
            $scope.availableTime;  
            $scope.availableTime = $scope.availableTime.filter(function(reserved) {
              return reserved != $scope.reservation[0].time;
            })
          }
          
          $scope.restoData = '';
          $scope.$on('data_shared',function(){
              var text =  dataShare.getData();    
              $scope.restoData = text;
          });
          
          console.log("Heyyy", $scope.restoData);
          
        }).error(function(err){
          console.log("Error",err);
      });
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