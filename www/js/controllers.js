angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};
    //Funcion que verifica el usuario
    $scope.login = function() {
        LoginService.loginUser($http,$state,$ionicPopup,$scope.data,$scope)
        
    }
    //Funcion que termina la sesion 
    $scope.logout = function () {
       LoginService.logoutUser()
    }
})

.controller('formCtrl', function($scope,reservationService,$ionicPopup,$state) {
    $scope.reservation = function(servicio){
        var confirmPopup = $ionicPopup.confirm({
         title: 'Reservar ',
         template: 'Esta seguro de reservar este servicio?'
       });
       confirmPopup.then(function(res) {
         if(res) {
          reservationService.setService($state.params.id,servicio.dia+"",servicio.hora+"",$ionicPopup);
         } 
         else{}
       });
    }

})

   
.controller('misReservacionesCtrl', function($scope, reserv, $ionicPopup, $state, $http) {
    $scope.data = {};
        reserv.getReservacionesServicios($scope,$http,$state,$ionicPopup,$scope.data)
        reserv.getReservacionesEventos($scope,$http,$state,$ionicPopup,$scope.data)
        
    $scope.deleteEventos= function (id) {
       reserv.deleteReservacionesEventos($scope,$http,$state,$ionicPopup,id)
    }
    $scope.deleteServicios= function (id) {
       reserv.deleteReservacionesServicios($scope,$http,$state,$ionicPopup,id)
    }
    

})
   

.controller('reservarCtrl', function($scope,reservationService,$http) {
    reservationService.getServices($scope);
    //Lista los servicios que ofrece el hotel 
    $scope.viewServise = function (servi) {
        console.log($scope.listServices);
        console.log(servi);
        $scope.lis = [];
        for (var i = $scope.listServices.length - 1; i >= 0; i--) {
            if($scope.listServices[i].servicio == servi){
                $scope.lis.push($scope.listServices[i]);
            }
        };
    }
    
})
   
.controller('alarmaCtrl', function($scope,alarmaService,$http) {
    alarmaService.getAlarmas($scope);
    
})
   
.controller('homeCtrl', function($scope,events,$http,$state,$ionicPopup) {
	events.getEvents($scope,$state,$ionicPopup);

})
 