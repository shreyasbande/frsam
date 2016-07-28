'use strict';
const squel = require('squel');

module.exports = {
  updateShiftData(params) {

    const  query = squel.update({tableAliasQuoteCharacter: ''})
       .table("transaction.shiftdetails")
       .set("shiftid =?", params[1])
       .where("userid=?", params[0])
       .where("dateid=?", squel.select().field(" id").from("master.dates").where("fulldate=?",params[2]));
        return query.toString();
  },
  insertShiftData(params) {

    const query = sequel.insert({tableAliasQuoteCharacter: ''})
      .into("master.dates")
      .set("sdate", params[0])
      .set("smonth", params[3])
      .set("syear", params[2])
      .set("fulldate", params[1])
      .set("weekno", params[4])
      .set("isweekend", true)
      .set("weekday", "now()", {dontQuote: true});
    return query.toString();
  },
  selectShiftData(params) {

    const  query = squel.select({tableAliasQuoteCharacter: ''})
      .field("shiftid =?")
      .from("transaction.shiftdetails")
      .where("userid=?", params[0])
      .where("dateid=?", squel.select().field(" id").from("master.dates").where("fulldate=?",params[2]));
    return query.toString();
  }

  };
