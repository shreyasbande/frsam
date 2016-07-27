const Router = require('restify-router').Router;
const routerInstance = new  Router();

routerInstance.post('/getShifts', respondShiftPlan);
routerInstance.get('/shiftMaster', respondShiftMaster);
routerInstance.get('/getAllUserInfo', respondGetAllUserInfo);
routerInstance.post('/getLoginInfo', respondGetLoginInfo);
routerInstance.post('/updateShift', updateShiftInfo);


function respondShiftPlan(req, res, next){
  const shiftController = include('api/shiftplan/controller.js');
  shiftController.getShift(req, res);
  return next();
}

function respondShiftMaster(req, res, next){
  const shiftController = include('api/shiftplan/controller.js');
  shiftController.shiftMaster(req, res);
  return next();
}

function respondGetAllUserInfo(req, res, next){
  const infoController = include('api/info/controller.js');
  infoController.getAllUserInfo(req, res);
  return next();
}

function respondGetLoginInfo(req, res, next){
  const loginController = include('api/login/controller.js');
  loginController.validateLogin(req, res);
  return next();
}

function updateShiftInfo(req, res, next){
  console.log("hii");
  const updateShiftController = include('api/updateShift/controller.js');
  updateShiftController.updateShiftInfo(req, res);
  return next();
}

module.exports = routerInstance;
