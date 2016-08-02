'use strict';
const dbAccess = include('common/dataAccess.js');
const queries  = include('api/updateShift/queries.js');
const database = include('common/config.js');

class shiftData{
  constructor(data,id){
    this.data=data;
    this.db     = new dbAccess.Operations(id);
    this.response= {
      "resTypeCode"     : '',
      "updateDone"  : false
    };

  }


  updateShift() {
    const base = this;

    var rowProcessed = 0;
    var obj           = new dbAccess.Operations(base.id);

    return new Promises((resolve, reject) => {

      base.data.map(function (rowToBeUpdated) {
          var model = {
            "empId"    : rowToBeUpdated.userId,
            "shift"    : rowToBeUpdated.Shift,
            "shiftDate": rowToBeUpdated.ShiftDate
          };

      const selectQuery = queries.selectShiftData([model.empId,model.shiftDate]);
          obj.fetch(selectQuery, database.samDb)
       .then((shiftDetails) => {
         console.log("shiftDetails",shiftDetails);

         if (shiftDetails.length !== 0){
           obj.createTransaction(database.samDb)
             .then(() => {
               const updateQuery = queries.updateShiftData([model.empId, model.shift, model.shiftDate]);
               console.log("updateQuery",updateQuery);
               obj.executeQuery(updateQuery)
                 .then((result) => {
                   rowProcessed++;
                   if (rowProcessed == base.data.length) {
                     base.response.updateDone = true;
                     obj.commitTransaction()
                       .then(function (result) {
                         console.log("result",result);
                         resolve(base.response);
                       })
                   }
                 })
                 .catch((error) => {
                   reject(error);
                 });
             });

       }
         else{
           const selectDateQuery = queries.selectDate([model.shiftDate]);
           base.db.fetch(selectDateQuery, database.samDb)
             .then((dateDetails) => {
               obj.createTransaction(database.samDb)
                 .then(() => {
                   var insertQuery    = queries.insertShiftDetails();
                   if (dateDetails.length == 0) {
                     var insertInMaster = queries.insertDate();
                     insertQuery        = insertQuery.concat(insertInMaster);
                     console.log("insertQuery",insertQuery);
                     obj.executeQuery(insertQuery)
                       .then((result) => {
                         rowProcessed++;
                         if (rowProcessed == base.data.length) {
                           base.response.updateDone = true;
                           obj.commitTransaction()
                             .then(function (result) {
                               resolve(base.response);
                             })
                         }
                       })
                       .catch((error) => {
                         reject(error);
                       });
                   }
                else{
                     obj.executeQuery(insertQuery)
                       .then((result) => {
                         rowProcessed++;
                         if (rowProcessed == base.data.length) {
                           base.response.updateDone = true;
                           obj.commitTransaction()
                             .then(function (result) {
                               resolve(base.response);
                             })
                         }
                       })
                       .catch((error) => {
                         reject(error);
                       });

                   }

                   obj.commitTransaction();
                 })

             })
             .catch((error) => {
               reject(error);
             });
         }
       })
            .catch((error) => {
              reject(error);
            })
    })
  });
  }
}

module.exports.shiftData = shiftData;
