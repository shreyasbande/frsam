angular.module('sam').controller('kController', ['$scope', '$http', '_', '$location', info]);

function info($scope, $http, _, $location) {
  const a = "HI";
  const b = $location;
  const c = $location.search();
  console.log("url: ", a);
  /*console.log("search: ", c);*/
  $scope.message = "Hi Hello from kedb!";
  $scope.viewMode = "info";
}
