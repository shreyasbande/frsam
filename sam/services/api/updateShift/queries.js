'use strict';
const squel = require('squel');

module.exports = {
  updateShiftData(params) {
    const  query = squel.update({tableAliasQuoteCharacter: '', numberedParameters: true})
       .table("transaction.shiftdetails")
       .set("shiftid =?", params[1])
       .where("userid=?", params[0])
       .where("dateid=?", squel.select().field(" id").from("master.dates").where("fulldate=?",params[2]));
    return {"key": "UPDATESHIFTSQUERY", "value": query.toParam()};
  },
  insertDate(params) {
    const query = sequel.insert({tableAliasQuoteCharacter: '', numberedParameters: true})
      .into("master.dates")
      .set("sdate", params[0])
      .set("smonth", params[3])
      .set("syear", params[2])
      .set("fulldate", params[1])
      .set("weekno", params[4])
      .set("isweekend", true)
      .set("weekday", "now()", {dontQuote: true});
    return {"key": "INSERTDATE", "value": query.toParam()};
  },
  insertShiftDetails(params) {
    const query = sequel.insert({tableAliasQuoteCharacter: '', numberedParameters: true})
      .into("master.dates")
      .set("userid", params[0])
      .set("dateid", params[3])
      .set("shiftid", params[2]);
    return {"key": "INSERTSHIFTDETAIL", "value": query.toParam()};
  },
  selectShiftData(params) {
    const  query = squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
      .field("shiftid")
      .from("transaction.shiftdetails")
      .where("userid =? ", parseInt(params[0]))
     .where("dateid=?", squel.select().field(" id").from("master.dates").where("fulldate=?",params[1]));
    return {"key": "SELECTSHIFTDATA", "value": query.toParam()};

  },
  selectDate(params) {
    const  query = squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
      .field("id =?")
      .from("master.dates")
      .where("fulldate=?", params[0]);
    return {"key": "SELECTDATE", "value": query.toParam()};

  }

  };
