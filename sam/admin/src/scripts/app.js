import shiftController from './controller/shiftController.js';
import infoController from './controller/infoController.js';
import loginController from './controller/loginController.js';

var sam = angular.module('sam', ['underscore', 'ngRoute', 'angularMoment','ngTable','ngCookies']);
sam.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
  //$locationProvider.html5Mode({
  //  enabled: true,
  //  requireBase: false
  //});
  //$httpProvider.defaults.withCredentials = true;
}]);

sam.controller('shiftController', shiftController);
sam.controller('infoController', infoController);
sam.controller('loginController', loginController);

shiftController.$inject = ['$http', '$q',"NgTableParams",'$filter','ngTableDefaults','$cookies'];
infoController.$inject  = ['$http', '$q','$cookies'];
loginController.$inject  = ['$http', '$q','$cookies'];

