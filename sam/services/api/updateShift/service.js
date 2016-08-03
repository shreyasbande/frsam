'use strict';
const dbAccess = include('common/dataAccess.js');
const queries  = include('api/updateShift/queries.js');
const database = include('common/config.js');
const moment = require('moment');
const _ = require('underscore');

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
                   console.log("rowProcessed",rowProcessed," base.data.length ",base.data.length);
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
           var date = moment(model.shiftDate, "YYYY-MM-DD HH:mm:ss");
           var sdate=moment(date).day();
           var smonth=moment(date).month()+1;
           var  syear=moment(date).year();
           var  weekno= moment(date).week();
           var  isweekend=false;
           var weekday=date.format('dddd');
           var days=['Monday','Tuesday','Wednesday','Thusday','Friday','Saturday','Sunday'];
           var count=0;
           var map = _.object(_.map(days, function(item) {

             var obj= [count, item];
             count++;
             return obj;
           }));
           var day= _.keys(_.pick(map, function(value) {
           if(value==weekday)
             return value;
           }));
           if(weekday=='Sunday' || 'Saturday' )
           {
             isweekend=true;
           }
           const selectDateQuery = queries.selectDate([model.shiftDate]);
            base.db.fetch(selectDateQuery, database.samDb)
             .then((dateDetails) => {
               obj.createTransaction(database.samDb)
                 .then(() => {
                   if (dateDetails.length == 0) {
                     var insertInMaster = queries.insertDate([sdate, smonth, syear, model.shiftDate, weekno, isweekend, day[0]]);
                    console.log("insertInMaster",insertInMaster);
                     obj.executeQuery(insertInMaster)
                       .then((result) => {
                         var insertQuery = queries.insertShiftDetails([model.empId, model.shiftDate, model.shift]);
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

                       })
                       .catch((error) => {
                         console.log("error",error);
                         reject(error);
                       });
                   }
                   else{
                     var insertQuery = queries.insertShiftDetails([model.empId, model.shiftDate, model.shift]);
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
