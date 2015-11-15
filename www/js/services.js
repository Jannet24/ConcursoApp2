angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q) {
	return{
	loginUser: function(http,state,popup,data) {
		var deferred = $q.defer();
        var promise = deferred.promise;
		var req = {
	    	method: 'POST',
	     	url: 'http://127.0.0.1:8080/hotel/index.php',

	     	data:{usuario : data.username , contrasena : data.password },
	     	
	     	dataType: "jsonp"
    	}
 
        http(req) 
        	.success(function(result) {
        		if (typeof(result.id) == "undefined") {
        			var alertPopup = popup.alert({
	                title: 'Error!',
	                template: 'Por favor, compruebe sus datos!'

	            })
        		}
        		else{
        			data = result;
        			console.log(data);
        			state.go('home');
        		}
        })
        	.error(function(data) {
            var alertPopup = popup.alert({
                title: 'Error!',
                template: 'Intente más tarde!'
            })
        });
    }

}}
)