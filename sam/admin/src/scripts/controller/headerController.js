import loginService from './../services/loginService.js';
var self;
export default class HeaderController {

  constructor($http, $q,$cookies,$scope) {
    self=this;
    self.loginHide=true;
    this.http=$http;
    this.q=$q;
    this.cookies=$cookies;
    if (this.cookies.get('token')) {
      self.loginHide=false;
    }
    $scope.$on("hide", function () {
      self.loginHide=false;
      });
  }


  loginHideFalse(){
    self.loginHide = false;
    console.log(self.loginHide)
  }
  logout() {
    this.cookies.remove("token");
    self.loginHide = true;
    window.open("/", "_self");
  }
}
