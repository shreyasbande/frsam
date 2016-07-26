'use strict';
const dbAccess = include('common/dataAccess.js');
const queries  = include('api/login/queries.js');
const database = include('common/config.js');
const Error    = include('exception/exception.js');

class Info {
  constructor(id) {
    console.log("id: ", id);
    this.db = new dbAccess.Operations(id);

  }


  validateUser(data) {
    const base   = this;
    var response = {
      "resTypeCode"   : '',
      "resTypeMessage": '',
      "token"         : ''
    };
    return new Promises((resolve, reject) => {
      var user               = data.loginId;
      var password           = data.psd;
      const userDetailsQuery = queries.userDetails(user);
      console.log("userDetailsQuery ", userDetailsQuery.value);
      base.db.fetch(userDetailsQuery, database.samDb)
        .then((userDetails) => {
          console.log("userDetails " + JSON.stringify(userDetails));
          if (userDetails.length == 0 || userDetails[0].passwordkey != password) {
            response.resTypeCode    = 200;
            response.resTypeMessage = 'Invalid username or password';
          }
          else {
            if (userDetails[0].isadmin) {
              response.resTypeCode    = 200;
              response.resTypeMessage = 'Success';
            }
            else {
              response.resTypeCode    = 200;
              response.resTypeMessage = "No privilege to edit shifts";
            }
            let token1     = jwt.sign(response, require('../../common/secret')(), {
              expiresIn: 14400
            });
            response.token = token1;
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error)
        });
    })
  }
}

module.exports.Info = Info;