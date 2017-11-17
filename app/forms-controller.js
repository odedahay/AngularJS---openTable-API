"use strict";

var formsController = function($scope) {
  $scope.form = {
    carType: '',
    hasTurbo: true
  };

  $scope.formDisabled = {
    name:'',
    disableName:false
  };

  $scope.formSubmit = {
    name: '',
    hasId: true,
    error: undefined
  };

  $scope.checkbox = {};
  $scope.checkbox.cb1 = true;
  $scope.checkbox.cb2 = 'Y';
  $scope.checkbox.cb3 = 'Going';

  $scope.dropdownArray = [
    { value: 1, name: "This is one (array)" },
    { value: 2, name: "This is two (array)" },
    { value: 3, name: "This is three (array)" },
  ];

  $scope.default = {
    manual: '2',
    fromArray: $scope.dropdownArray[2],
    singleValueFromArray: 2
  };

  $scope.validateForm = function() {
    $scope.formSubmit.error = undefined;
    if (!$scope.formSubmit.hasId) {
      $scope.formSubmit.error = 'Dude do not have ID!';
      return;
    }
    // Do something here like call REST service or change screen
  }
};

app.controller("formsController", ['$scope', formsController]);
