'use strict';
const squel = require('squel');

module.exports = {
  userDetails(user) {
    console.log("user1111",user);
    const query = squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
      .field("password")
      .field("isadmin")
      .from("master.user")
      .where("username = ?", user);

    return {"key": "USERDETAILS", "value": query.toParam()};
  }
};