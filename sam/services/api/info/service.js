'use strict'
const dbAccess = include('common/dataAccess.js');
const queries  = include('api/info/queries.js');
const database = include('common/config.js');

class Info{
  constructor(id){
    console.log("id: ", id);
    this.db     = new dbAccess.Operations(id);
  }

  inquireUsers(){
    const base = this;
    return new Promises((resolve, reject) => {
      console.log("getting all users information ");

      const allUsersQuery = queries.getAllUsersQuery();
      base.db.fetch(allUsersQuery, database.samDb)
                .then((userDetails) => {
                  resolve(userDetails);
                })
                .catch((error) => {
                  console.log("error in getting the shift details of the week ", error);
                });
    })
  }
}

module.exports.Info = Info;
