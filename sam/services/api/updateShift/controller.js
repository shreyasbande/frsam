const util = include('common/utility.js');
const service = include('api/updateShift/service.js');

function updateShiftInfo(req, res) {
  const logId = util.getLogId();
  const data=req.body;
  const svc = new service.shiftData(data,logId);

  svc.updateShift()
     .then((userDetails) => {
       res.send(userDetails);
     })
     .catch((error) => {
       res.send(error);
     });
}

module.exports.updateShiftInfo = updateShiftInfo;
