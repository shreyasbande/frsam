import loginService from './../services/loginService.js';

export default class LoginController {
  constructor($http, $q) {
    this.http=$http;
    this.q=$q;
  }

  checkLogin(Id, password){
    const svc = new loginService(this.http,this.q);
    return this.q((resolve, reject) => {
        svc.getLoginData(Id,password)
        .then((result) => {
        console.log("response shift master: ", JSON.stringify(result));
    return resolve(result);
  })
  .catch((err) => {
      console.log("response err shift master: ", JSON.stringify(err));
    return reject(err);
  });
  })
  }
}
