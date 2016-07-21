import callApi from './../common/callApi.js';
import constants from './../common/constants.js';

export default class infoService{
  constructor($http, $q){
    console.log("into info service constructor: ");
    this.http = $http;
    this.promise = $q;
    this.api = new callApi($http, $q);
    this.constants = new constants();
  }

  getAllUserInfo(){
    return this.promise((resolve, reject) =>{
      const allUserUrl = this.constants.baseUrl + constants.info().allUserInfo;
      this.api.get(allUserUrl)
          .then((response) => {
            return resolve(response);
          })
          .catch((err) => {
            console.log("error occurred - get all user info infoService.js - line#21 ");
            return reject(err);
          });
    })
  }
}
