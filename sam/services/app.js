require('./common/global.js');
const routes = require('./common/routes.js');
const restify = require('restify');
const server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.CORS());

/*server.use(function(){
  "use strict";
  var token = req.headers['authorization'];
  var key   = req.headers['key'];

  if (token || key) {
    try {
      jwt.verify(token, require('secret')(), function (err, decoded) {
        if (err) {
          res.status(401);
          return res.json({resTypeCode: "1", status: 401, resTypeMessage: 'Session Expired. Please login again to continue.'});
        } else {
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
});*/

server.opts(/.*/, function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
  res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
  res.send(200);
  return next();
});

// add routes
routes.applyRoutes(server);
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
