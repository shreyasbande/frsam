const util = include('common/utility.js');
const service = include('api/login/service.js');

function validateLogin(req, res) {
  //throw new error("explicit error");
  const logId = util.getLogId();
  const svc = new service.Info(logId);
  var data=req.body.loginData;

  svc.validateUser(data)
    .then((userDetails) => {
      res.send(userDetails);
    })
    .catch((error) => {
      console.log("error occurred in controller - get shifts: ", error);
    });
}

module.exports.validateLogin = validateLogin;