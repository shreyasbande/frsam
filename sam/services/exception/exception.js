function queryError() {
 var statusCode = 422;
 var message    = 'Response Error';
  return {success: false, data: message, status: statusCode};
}

function dbConnectionError() {
  var statusCode = 503;
  var message    = 'Unable to connect to database!';
  return {success: false, data: message, status: statusCode};
}

function responseError() {
  var statusCode = 999;
  var message     = 'Unable to Fetch Data';
  return {success: false, data: message, status: statusCode};
}

function headerError(message) {
  return {success: false, data: message, status: 999}
}

function sizeExceedLimit(message) {
  return {success: false, data: message, status: 999}
}

function invalidRequest(message) {
  return {success: false, data: message, status: 999}
}


module.exports.queryError        = queryError;
module.exports.dbConnectionError = dbConnectionError;
module.exports.responseError     = responseError;
module.exports.headerError       = headerError;
module.exports.sizeExceedLimit   = sizeExceedLimit;
module.exports.invalidRequest    = invalidRequest;