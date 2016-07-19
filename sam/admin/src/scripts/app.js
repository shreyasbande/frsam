import shiftController from './controller/shiftController.js';

var sam = angular.module('sam', ['underscore', 'ngRoute', 'angularMoment']);
sam.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  console.log('Here2: ');
}]);

sam.controller('shiftController', shiftController);
shiftController.$inject = ['$http', '$q'];

/*
 $routeProvider.when('/info', {
   templateUrl: 'app/master.html',
   controller : 'infoController'
 }).when('/master/s', {
   templateUrl: 'app/shiftplan',
   controller : 'ShiftController'
 }).when('/kedb', {
   templateUrl: 'app/kedb',
   controller : 'KedbController'
 });
*/
