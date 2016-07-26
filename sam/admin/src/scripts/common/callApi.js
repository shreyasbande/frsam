export default class callApi{
  constructor($http, $q,$cookies){
    self=this;
    this.http = $http;
    this.promises = $q;
    this.cookies = $cookies;
    console.log("http: ",$cookies);
  }

  post(url, request){
    if (self.cookies.get('token')) {
      this.http.defaults.headers.common.Authorization = this.cookies.get('token');
    }
    return this.promises((resolve, reject) => {
      this.http({
        method: "POST",
        url   : url,
        data  : request
      }).success(function (data,headers,config) {
        return resolve(data);
      }).error(function(error,headers,config){
        return reject(error);
      });
    });
  }

  get(url){
    console.log(self.cookies);
    if (self.cookies.get('token')) {
      this.http.defaults.headers.common.Authorization = self.cookies.get('token');
    }
    return this.promises((resolve, reject) => {
      this.http({
        method: "GET",
        url   : url
      }).success(function (data,headers,config) {
        return resolve(data);
      }).error(function(error,headers,config){
        return reject(error);
      });
    });
  }
}
