angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($http,$state,$ionicPopup,$scope.data)
    }
    //Funcion que termina la sesion 
    $scope.logout = function () {
       LoginService.logoutUser()
    }
})


   
.controller('misReservacionesCtrl', function($scope) {

})
   
.controller('reservarCtrl', function($scope) {

})
   
.controller('alarmaCtrl', function($scope) {

})
   
.controller('homeCtrl', function($scope) {

})
 