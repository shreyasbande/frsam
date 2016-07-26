import infoService from './../services/infoService.js';

export default class InfoController {
  constructor($http, $q,$cookies) {
    console.log("info controller: ");
    this.message = "Hi";
    this.cookies=$cookies;
    this.errors = [];
    this.getUserInfo($http, $q,$cookies)
        .then((result) => {
          console.log("user info result: ", JSON.stringify(result));
          this.userInfo = result;
        })
        .catch((error) => {
          this.errors.push("no user details found");
        });
  }

  getUserInfo($http, $q,$cookies){
    const svc = new infoService($http, $q,$cookies);
    return $q((resolve, reject) => {
      svc.getAllUserInfo()
         .then((result) => {
           return resolve(result);
         })
         .catch((err) => {
           console.log("response3: ", JSON.stringify(err));
           return reject(err);
         });
    })
  }
}
