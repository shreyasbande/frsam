'use strict';
const squel = require('squel');

module.exports = {
  userDetails(params) {
    const query = squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
      .field("password")
      .field("isadmin")
      .from("master.user")
      .where("username = ?", params);

    return {"key": "USERDETAILS", "value": query.toParam()};
  }
};