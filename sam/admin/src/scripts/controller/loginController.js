import loginService from './../services/loginService.js';
import headerController from './../controller/headerController.js';

export default class LoginController {
  constructor($http, $q, $cookies, $rootScope) {
    this.http     = $http;
    this.q        = $q;
    this.cookies  = $cookies;
    this.rootScope    = $rootScope;
    this.message  = "";
    this.loginBox = false;
    this.loginMsg = true;

    if (this.cookies.get('token')) {
      console.log(this.cookies.get('token'));
      var message      = new loginService($http, $q, $cookies);
      var responseType = message.getResType();
      if (responseType != "Invalid username or password") {
        this.message   = responseType;
        this.loginBox  = true;
        this.loginMsg  = false;
      }
    }

  }

  checkLogin(Id, password) {
    if (Id == undefined && (password == undefined || password == "")) {
      $("#ErrorListForLogin").text("Please enter username and password");
      $("#ErrorListForLogin").css('display', 'block');
    }
    else if (Id == undefined || Id == "") {
      $("#ErrorListForLogin").text("Please enter username");
      $("#ErrorListForLogin").css('display', 'block');
    }
    else if (password == undefined || password == "") {
      $("#ErrorListForLogin").text("Please enter password");
      $("#ErrorListForLogin").css('display', 'block');
    }
    else {
      password = password.trim(" ");
      if (password.length == 0) {
        $("#ErrorListForLogin").text("Please enter valid password");
        $("#ErrorListForLogin").css('display', 'block');
      }
      else {
        const svc = new loginService(this.http, this.q, this.cookies);
        return this.q((resolve, reject) => {
          svc.getLoginData(Id, password)
            .then((result) => {
              if (result.resTypeMessage != "Invalid username or password") {
                this.message   = result.resTypeMessage;
                this.rootScope.$broadcast('hide', { message: true });
                this.loginBox  = true;
                this.loginMsg  = false;
              }
              else {
                $("#ErrorListForLogin").text(result.resTypeMessage);
                $("#ErrorListForLogin").css('display', 'block');
              }
              console.log("response shift master: ", JSON.stringify(result));
              this.cookies.put('token', result.token);
              console.log(this.cookies)
              return resolve(result);
            })
            .catch((err) => {
              console.log("response err shift master: ", JSON.stringify(err));
              return reject(err);
            });
        })
      }
    }
  }
}
