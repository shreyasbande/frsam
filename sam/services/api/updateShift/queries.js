'use strict';
const squel = require('squel');

module.exports = {
  updateShiftData(params) {

    const  query = squel.update({tableAliasQuoteCharacter: ''})
       .table("transaction.shiftdetails")
       .set("shiftid =?", params[1])
       .where("userid=?", params[0])
       .where("dateid=?", params[2]);
        return query.toString();
  }
};
