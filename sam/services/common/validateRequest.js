module.exports = function (req, res, next) {

  //var token = req.headers['access-token'];
  //var token = req.body.token || req.query.token || req.headers['authorization'];
  var token = req.headers['authorization'];
  var key   = req.headers['key'];
  //var token = req.body.token || req.query.token || req.headers['authorization'];

  if (token || key) {
    try {
      //var decoded = jwt.decode(token, require('../config/secret.js')());
      jwt.verify(token, require('secret')(), function (err, decoded) {
        if (err) {
          res.status(401);
          return res.json({resTypeCode: "1", status: 401, resTypeMessage: 'Session Expired. Please login again to continue.'});
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } catch (err) {
      res.status(500);
      res.json({
        "status"        : 500,
        "resTypeMessage": "something went wrong",
        "error"         : err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status"        : 401,
      "resTypeCode"   : "1",
      "resTypeMessage": "Please login to continue."
    });
    return;
  }
};