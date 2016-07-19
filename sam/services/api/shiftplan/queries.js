'use strict';
const squel = require('squel');

module.exports = {
  getShiftsQuery(params) {
    const query = squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
     .from("crosstab('"
         + squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
                .field('u.id').field('u.username').field('d.syear').field('d.weekno').field('d.weekday').field('sd.shiftid')
                .from("transaction.shiftdetails", "sd")
                .join("master.user", "u", "sd.userid = u.id")
                .join("transaction.userstreams", "us", "us.userid = u.id")
                .join("master.dates", "d", "sd.dateid = d.id")
                .where("weekno = ?", params[0])
                .where("syear = ?", params[1])
                .order('1')
                .order('2')
         + "','"
         + squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
                .field('weekday')
                .from('master.dates')
                .distinct()
                .order('1')
         + "') as ct(userid int, username text, year int, weekno int, day0 int, day1 int, day2 int, day3 int, day4 int, day5 int, day6 int)"
         )
     .field('*');

    return {"key": "GETSHIFTSQUERY", "value": query.toParam()};
  },
  
  getshiftsMaster() {
    const query = squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
           .field('*')
           .from("master.shift");

    console.log("shift master query: ", query.toString());
    return {"key": "GETSHIFTMASTERQUERY", "value": query.toParam()};
  }
};
