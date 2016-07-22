import shiftController from './controller/shiftController.js';
import infoController from './controller/infoController.js';
import loginController from './controller/loginController.js';

var sam = angular.module('sam', ['underscore', 'ngRoute', 'angularMoment','ngTable']);
sam.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
}]);

sam.controller('shiftController', shiftController);
sam.controller('infoController', infoController);
sam.controller('loginController', loginController);

shiftController.$inject = ['$http', '$q',"NgTableParams",'$filter','ngTableDefaults'];
infoController.$inject  = ['$http', '$q'];
loginController.$inject  = ['$http', '$q'];

