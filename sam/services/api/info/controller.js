const util = include('common/utility.js');
const service = include('api/info/service.js');

function getUserInfo(req, res) {
  //throw new error("explicit error");
  const logId = util.getLogId();
  const svc = new service.Info(logId);

  svc.inquireUsers()
     .then((userDetails) => {
       res.send(userDetails);
     })
     .catch((error) => {
       console.log("error occurred in controller - get shifts: ", error);
     });
}

module.exports.getAllUserInfo = getUserInfo;
