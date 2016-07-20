import shiftController from './controller/shiftController.js';
import infoController from './controller/infoController.js';

var sam = angular.module('sam', ['underscore', 'ngRoute', 'angularMoment']);
sam.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  console.log('Here2: ');
}]);

sam.controller('shiftController', shiftController);
sam.controller('infoController', infoController);
shiftController.$inject = ['$http', '$q'];
infoController.$inject  = ['$http', '$q'];

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
