angular.module('app.controllers', ['google-maps'])

.controller('MapCtrl', ['$scope', function ($scope) {
 
    $scope.map = {
        center: {
            latitude: 40.454018, 
            longitude: -3.509205
        }, 
        zoom: 12,
        options : {
            scrollwheel: false
        },
        control: {}
    };
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 40.454018,
            longitude: -3.509205
        },
        options: {
            draggable: true
        }
    };
}])

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

//Controlador para ves las reservaciones que tiene el hueped
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
   
//Controlador de las posibles reservaciones que puede hacer el huesped
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

//Controlador de los nuevos eventos que tiene el hotel
.controller('homeCtrl', function($scope,events,$http,$state,$ionicPopup) {
	events.getEvents($scope,$state,$ionicPopup);

})

//Controlador de los eventos, muestra los detalles
.controller('eventoCtrl', function($scope, events, $ionicPopup, $state, $http) {
    $eventoID = $state.params.eventoID;
    events.getDetalls($eventoID,$scope,$http,$state,$ionicPopup,$scope.data);

})