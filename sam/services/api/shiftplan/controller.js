const util = include('common/utility.js');
const service = include('api/shiftplan/service.js');

function getShift(req, res) {
  console.log("shift request: ", JSON.stringify(req.body));

  //throw new error("explicit error");
  const logId = util.getLogId();
  const svc = new service.ShiftInquiry(req, logId);

  svc.inquireShifts()
     .then((shiftDetails) => {
       res.send(shiftDetails);
     })
     .catch((error) => {
       console.log("error occurred in controller - get shifts: ", error);
     });
}

function shiftMaster(req, res) {
  console.log("shift master: ");
  const logId = util.getLogId();

  // FetchDetails - class without any request.
  const svc = new service.FetchDetails(logId);
  svc.fetchShiftMaster()
     .then((shifts) => {
       res.send(shifts);
     })
     .catch((error) => {
       console.log("error occurred in controller - get shift master: ", error);
     });
}

module.exports.getShift = getShift;
module.exports.shiftMaster = shiftMaster;
