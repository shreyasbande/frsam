'use strict'
const dbAccess = include('common/dataAccess.js');
const queries  = include('api/shiftplan/queries.js');
const database = include('common/config.js');

class ShiftInquiry{
  constructor(req, id){
    this.weekNo = req.body.shiftInquiry.weekNo;
    this.year   = req.body.shiftInquiry.year;
    console.log("id: ", id);
    this.db     = new dbAccess.Operations(id);
  }

  inquireShifts(){
    const base = this;
    return new Promises((resolve, reject) => {
      console.log("getting shifts for the week ", base.weekNo, " and year: ", base.year);

      const shiftQuery = queries.getShiftsQuery([base.weekNo, base.year]);
      base.db.fetch(shiftQuery, database.samDb)
                .then((shiftDetails) => {
                  resolve(shiftDetails);
                })
                .catch((error) => {
                  console.log("error in getting the shift details of the week ", error);
                });
    })
  }
}

class FetchDetails{
  constructor(id){
    console.log("id: ", id);
    this.db     = new dbAccess.Operations(id);
  }

  fetchShiftMaster(){
    const base = this;
    return new Promises((resolve, reject) => {
      console.log("getting shift master");
      console.log("getting shift master 2");
      const shiftMasterQuery = queries.getshiftsMaster();
      base.db.fetch(shiftMasterQuery, database.samDb)
                .then((shifts) => {
                  console.log("shifts: ", JSON.stringify(shifts));
                  return resolve(shifts);
                })
                .catch((error) => {
                  console.log("error in getting the shift master details, ", error);
                  return reject(error)
                });
    })
  }
}

module.exports.ShiftInquiry = ShiftInquiry;
module.exports.FetchDetails = FetchDetails;
