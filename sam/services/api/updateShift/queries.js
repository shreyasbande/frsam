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
  }
};
