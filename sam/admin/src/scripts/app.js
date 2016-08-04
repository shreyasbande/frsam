import shiftController from './controller/shiftController.js';
import infoController from './controller/infoController.js';
import loginController from './controller/loginController.js';
import headerController from './controller/headerController.js';

var sam = angular.module('sam', ['underscore', 'ngRoute', 'angularMoment','ngTable','ngCookies']);
sam.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
}]);

sam.controller('shiftController', shiftController);
sam.controller('infoController', infoController);
sam.controller('loginController', loginController);
sam.controller('headerController', headerController);

shiftController.$inject = ['$http', '$q',"NgTableParams",'$filter','ngTableDefaults','$cookies'];
infoController.$inject  = ['$http', '$q','$cookies'];
loginController.$inject  = ['$http', '$q','$cookies','$rootScope'];
headerController.$inject  = ['$http', '$q','$cookies','$scope'];

