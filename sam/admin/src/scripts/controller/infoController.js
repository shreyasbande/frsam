//region Commented ES6 attempt
/*class InfoController{
  constructor($scope){
    console.log("scope: ", this);
    console.log("scope: ", $scope);
    this.message = "Hi Hello !"
  }
}

angular.module('sam')
       /!*.service('mainService', new MainService())*!/
       .controller('infoController', ['$scope', '$http', '_', new InfoController($scope)]);*/
//endregion

angular.module('sam')
       .controller('infoController', ['$scope', '$http', '_', '$location', info])
       .service('infoService', ['$scope', '$http', '_', '$location', infoService]);

function info($scope, $http, _, $location) {
  const a = "HI";
  const b = $location;
  const c = $location.search();
  console.log("url: ", a);
  $scope.message = "Hi Hello from info!";
  $scope.viewMode = "info";
}

function infoService($scope, $http, _, $location){
  return new InfoService($scope, $http, _, $location);
}


