import callApi from './../common/callApi.js';
import constants from './../common/constants.js';

export default class loginService {
  constructor($http, $q) {
    console.log("into service constructor: ");
    this.http      = $http;
    this.promise   = $q;
    this.api       = new callApi($http, $q);
    this.constants = new constants();
  }

  getLoginData(loginId, password) {
    return this.promise((resolve, reject) => {
      const data = {
        "loginData": {
          "loginId": loginId,
          "psd"  : password
        }
      };
      console.log(data)
      const getLoginUrl = this.constants.baseUrl + constants.login().loginInfo;
      console.log(getLoginUrl)
      this.api.post(getLoginUrl, data)
        .then((response) => {
          return resolve(response);
        })
        .catch((err) => {
          console.log("error occurred - post employee shifts shiftService.js - line#26 ");
          return reject(err);
        });
    })
  }
}