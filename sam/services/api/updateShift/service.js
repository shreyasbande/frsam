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
      obj.createTransaction(database.samDb)
        .then((reult) => {
          base.data.map(function (rowToBeUpdated) {
            var model = {
              "empId"    : rowToBeUpdated.userId,
              "shift"    : rowToBeUpdated.Shift,
              "shiftDate": rowToBeUpdated.ShiftDate
            };

            const updateQuery = queries.updateShiftData([model.empId, model.shift, model.shiftDate]);
            obj.executeQuery(updateQuery)
              .then((result) => {
                rowProcessed++;
                if (rowProcessed == base.data.length) {
                  base.response.updateDone = true;
                  obj.commitTransaction()
                    .then(function(result){
                      resolve(base.response);
                    })
                }
              })
              .catch((error) => {
                reject(error);
              });

          });

    })
      .catch((error) => {
        reject(error);
      })
  });
  }
}

module.exports.shiftData = shiftData;
