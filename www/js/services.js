//Módulo que se conecta al servidor
var servidor = " http://127.0.0.1:8080/hotel/";
var usuario = "";
angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

//Verifica si es un huesped 
.service('LoginService', function($q) {
	return{
    logoutUser:function(){
        usuario ="";
    },
	loginUser: function(http,state,popup,data,scope) {
		var deferred = $q.defer();
        var promise = deferred.promise;
		var req = {
	    	method: 'POST',
	     	url: servidor +'index.php',

	     	data:{usuario : data.username , contrasena : data.password },
	     	
	     	dataType: "jsonp"
    	}
 
        http(req) 
        	.success(function(result) { //si la peticón con el servidor es exitosa valida los datos del login
        		if (typeof(result.id) == "undefined") {
        			var alertPopup = popup.alert({
	                title: 'Error!',
	                template: 'Por favor, compruebe sus datos!'

	            })
        		}
        		else{
        			data = result;
                    usuario = data.id;
        			state.go('home'); //redireciona a la pagina de home
        		}
        })
        	.error(function(data) { //Error al conectar con el servidor
            var alertPopup = popup.alert({
                title: 'Error!',
                template: 'Intente más tarde!'
            })
        });
    }
}})

//Obtiene los eventos exitentes
.service('events', function($q,$http) {
    return{
    getEvents: function(scope,state,popup) {
        $http.get(servidor+'eventos.php') 
            .success(function(result) {
                scope.eventos= result;  
        });    
        },
        getDetalls: function(eventoID,scope,htt,state,popup,data) {

            console.log(eventoID);
        var deferred = $q.defer();
        var promise = deferred.promise;
        var req = {
            method: 'POST',
            url: servidor+'detalleEvento.php',

            data:{id:eventoID},
            
            dataType: "jsonp"
        }
        $http(req)
        .success(function(result) {
                console.log("Resultado de serviceshh.js")
                console.log(result)
                scope.eventoDetalle= result;  

        });
    
            
        }
    }}
)
//Obtiene las alarmas del usuario
.service('alarmaService', function($q,$http) {
    return{
    getAlarmas: function(scope) {
        data= {user:usuario};
        $http.post(servidor+'alarmas.php',data) 
           .success(function(result) {
                scope.alarmas = result; 
                console.log(result); 
        });    
        }
    }}
)

//Peticiones de las reservaciones
.service('reservationService', function($q,$http) {
    return{
        //Obtiene los servicios que el huesped puede reservar
    getServices: function(scope) {
        $http.get(servidor +'servicios.php') 
            .success(function(result) {
                scope.listServices = result;
               $serviciosType = [];
                for (var i = result.length - 1; i >= 0; i--) {
                    if($serviciosType.indexOf(result[i].servicio) < 0){
                         $serviciosType.push(result[i].servicio);
                    }
                };
                scope.servicios = $serviciosType;  
        }); 

        },
        //Guarda la reservación 
    setService:function(idService, diaService, horaService,popup){
            data={user : usuario , reservacion : idService, dia: diaService, hora:horaService},
            console.log(data);
            $http.post(servidor+'guardarServicio.php', data)
            .success(function(result) {
                if(result[0]){
                    var alertPopup = popup.alert({
                    title: 'Reservado!'
                })
                }
                else{
                    var alertPopup = popup.alert({
                    title: 'Error!',
                    template: 'Ya tiene una reservación en esta fecha!'

                })
                }
        });
        }
    }})

//Obtiene las reservaciones del usuario
.service('reserv', function($q,$http) {
    return{
    getReservacionesServicios: function(scope) {
        var data={
            user:usuario
        }
        $http.post(servidor +'reservacionesServiciosEventos.php',data) 
            .success(function(result) {
                scope.reservacionesActivas= result;
        });
            
        },
    getReservacionesEventos:function(scope) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var data={
            user:usuario
        }
        $http.post(servidor +'reservacionesEventos.php',data) 
            .success(function(result) {
                console.log("Resultado de servicessssssss.js")
                console.log(result)
                scope.reservacionesActivasEventos= result;
        });
        },
    deleteReservacionesEventos:function(scope,http,state,popup,id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var req = {
            method: 'POST',
            url: servidor +'deleteEventos.php',
            data:{reservacion : id},
            dataType: "jsonp"
        }

        $http(req)
        .success(function(result) {
                scope.eventoDetalle= result;  
        });
        },
    deleteReservacionesServicios:function(scope,http,state,popup,id) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var req = {
            method: 'POST',
            url: servidor +'/deleteServicios.php',
            data:{reservacion : id},
            
            dataType: "jsonp"
        }
        $http(req)
        .success(function(result) {
                scope.eventoDetalle= result;  

        });
    }

}}
)