import loginService from './../services/loginService.js';

export default class LoginController {
  constructor($http, $q,$cookies,$location) {
    this.http=$http;
    this.q=$q;
    this.cookies=$cookies;
    this.message="";
    //this.location=$location;
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
        const svc = new loginService(this.http,this.q,this.cookies);
        return this.q((resolve, reject) => {
          svc.getLoginData(Id, password)
            .then((result) => {
              if (result.resTypeMessage == "Success") {
                this.message=result.resTypeMessage;
                $(".btn-default").click();
                //this.location.path("./views/admin");
                window.open("./views/admin/admin.html","_self");
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
