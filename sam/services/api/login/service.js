'use strict'
const dbAccess = include('common/dataAccess.js');
const queries  = include('api/login/queries.js');
const database = include('common/config.js');

class Info{
  constructor(id){
    console.log("id: ", id);
    this.db     = new dbAccess.Operations(id);

  }


  validateUser(data){
    const base = this;
    var params=[];
    var response={
      "resTypeCode"    :'',
      "resTypeMessage" : ''
    }
    return new Promises((resolve, reject) => {
      var user = data.loginId;
      var password = data.psd;
      const userDetailsQuery = queries.userDetails(user);
      console.log("userDetailsQuery " ,userDetailsQuery.value);
      base.db.fetch(userDetailsQuery, database.samDb)
        .then((userDetails) => {
          console.log("userDetails "+JSON.stringify(userDetails));
          if(userDetails==null || userDetails[0].password!=password)
          {
            response.resTypeCode=200;
            response.resTypeMessage='invalid user';
          }
          else{
            if(userDetails[0].isadmin){
              response.resTypeCode=200;
              response.resTypeMessage='Success';
            }
            else {
              response.resTypeCode=200;
              response.resTypeMessage="no privileges";
            }
          }
          resolve(response);
        })
        .catch((error) => {
          console.log("error in getting the shift details of the week ", error);
        });
    })
  }
}

module.exports.Info = Info;