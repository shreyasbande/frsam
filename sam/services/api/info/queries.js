'use strict';
const squel = require('squel');

module.exports = {
  getAllUsersQuery() {
    const query = squel.select({tableAliasQuoteCharacter: '', numberedParameters: true})
                       .field('*')
                       .from("master.user", "u")
                       .join("transaction.userstreams", "us", "u.id = us.userid")
                       .join("master.streams", "s", "us.streamid = s.id")
                       .order('s.stream')
                       .order('u.username');

    return {"key": "GETALLUSERSQUERY", "value": query.toParam()};
  }
};
