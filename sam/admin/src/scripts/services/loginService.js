import callApi from './../common/callApi.js';
import constants from './../common/constants.js';
import shiftController from './../controller/shiftController.js';
var resType;
export default class loginService {
  constructor($http, $q,$cookies) {
    console.log("into service constructor: ");
    this.http      = $http;
    this.promise   = $q;
    this.api       = new callApi($http, $q,$cookies);
    this.constants = new constants();
    this.data=null;
    this.cookies=$cookies;
    console.log($cookies);
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
         // var a =new shiftController(this.http,this.promise);
       //  a.gotResponse(response);
          console.log(response)
          this.setLoginData(response);
          return resolve(response);
        })
        .catch((err) => {
          shiftController.messageResponse=err;
          console.log("error occurred - post login loginService.js - line#26 ");
          return reject(err);
        });
    })
  }

   urlBase64Decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  setLoginData(response){
      this.data=response;
      console.log(this.data)
  }

  getData(){
    var token = this.cookies.get('token')
    var user  = {};
    if (typeof token !== 'undefined') {
      var encoded = token.split('.')[1];
      resType        = JSON.parse(this.urlBase64Decode(encoded));
      console.log(resType)
    }
    return resType;
  }

  getResType(){
    var permissionList = (this.getData().resTypeMessage);
    console.log(permissionList)
    return permissionList;

  }
}