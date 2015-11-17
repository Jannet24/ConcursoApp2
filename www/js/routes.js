angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Comprueba si existe la ruta especificada, manda a la vista relacionada y le asigna el controlador
  $stateProvider
    
      
        
    .state('login', {
      url: '/',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    
    .state('form', {
      url: '/form/:id',
      templateUrl: 'templates/form.html',
      controller: 'formCtrl'
    })    
      
    .state('mas', {
      url: '/mas/:eventoID',
      templateUrl: 'templates/evento.html',
      controller: 'eventoCtrl'
    }) 
      
        
    .state('misReservaciones', {
      url: '/misReservaciones',
      templateUrl: 'templates/misReservaciones.html',
      controller: 'misReservacionesCtrl'
    })
        
      
    
      
        
    .state('reservar', {
      url: '/reservar',
      templateUrl: 'templates/reservar.html',
      controller: 'reservarCtrl'
    })
        
      
    
      
        
    .state('alarma', {
      url: '/alarma',
      templateUrl: 'templates/alarma.html',
      controller: 'alarmaCtrl'
    })
        
      
    
      
        
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});