import shiftService from './../services/shiftService.js';
import loginService from './../services/loginService.js';

var curr = new Date;
var weekNumber = moment(curr).week();
var currentYear = moment(curr).year();
var currentMonday = moment(curr).startOf('week') + 7;
var self;
var ShiftNames;
var nextMonday=0;
var previousMonday=7;
export default class ShiftController {

	constructor($http, $q, NgTableParams, $filter, ngTableDefaults,$cookies) {
		self               = this;
		this.filter        = $filter;
		this.http          = $http;
		this.q             = $q;
		this.NgTableParams = NgTableParams;
		this.isEditable    = false;
		this.showEdit=true;
		this.cookies=$cookies;
		this.message = "Hi";

		this.messageResponse = "";
		const curr           = new Date;
		const weekNo         = moment(curr).week();
		const year           = moment(curr).year();
		const monday         = moment(curr).startOf('week') + 1;

		this.message   = "Shift Plan for ";
		this.dateRange = moment(monday).add(1, 'days').format("YYYY-MM-DD") + " to " +
			moment(monday).add(7, 'days').format("YYYY-MM-DD");

		var days = [];
		for (var i = 1; i < 8; i++) {
			days.push({
				id  : "sday" + (i - 1).toString(),
				date: moment(monday).add(i, 'days').format("YYYY-MM-DD")
			});
		}

		if(this.cookies.get('token')){
			var message=new loginService($http, $q,$cookies);
			console.log("hello1",message);
			var responseType=message.getResType();
			console.log("hello",responseType);
			if(responseType=="Success"){
					this.showEdit=false;
			}
		}
		this.days   = days;
		this.errors = [];
		this.a      = 5;
		this.getShifts($http, $q,$cookies)
				.then((result) => {
					this.shifts = result;
					ShiftNames=this.shifts;
					return this.getEmployeeShifts($http, $q, weekNo, year,$cookies);
				})
				.then((result) => {
					var response = _.map(result, (i) => {
						var eo = {};
						for(var j=0; j<7; j++){
							var d = i["day"+j.toString()];
							if(_.findWhere(this.shifts, {id: d})!=undefined){
								var dname = _.findWhere(this.shifts, {id: d}).shiftname;
							}
							else{
								break;
							}
							eo["sday"+j.toString()] = dname;
						}
						return _.extend(i, eo);
					});

				self.tableParams                = new NgTableParams({},
					{
						getData: function () {
							return response;
						}
					}
				);
				ngTableDefaults.settings.counts = [];
				//this.tableParams = new NgTableParams({}, { dataset: response });

			})
			.catch((error) => {
				this.errors.push("no dates were registered for current week");
			});
	}


	getShifts($http, $q,$cookies) {
		const svc = new shiftService($http, $q,$cookies);
		console.log(svc);
		return $q((resolve, reject) => {
			svc.getShiftMaster()
				.then((result) => {
					return resolve(result);
				})
				.catch((err) => {
					return reject(err);
				});
		})
	}

	getEmployeeShifts($http, $q, weekNo, year,$cookies) {
		const svc = new shiftService($http, $q,$cookies);
		return $q((resolve, reject) => {
			svc.getEmployeeShifts(weekNo, year)
				.then((result) => {
					const newResponse = getImagePath(result);
					return resolve(newResponse);
				})
				.catch((err) => {
					return reject(err);
				});
		})
	}

	getNextShift() {
		weekNumber += 1;
		nextMonday += 7;
		var $http      = this.http;
		this.dateRange = moment(currentMonday).add(1 + nextMonday, 'days').format("YYYY-MM-DD") + " to " +
			moment(currentMonday).add(7 + nextMonday, 'days').format("YYYY-MM-DD");

		var days = [];
		for (var i = 1; i < 8; i++) {
			days.push({
				id  : "sday" + (i - 1).toString(),
				date: moment(currentMonday).add(i + nextMonday, 'days').format("YYYY-MM-DD")
			});

		}
		self.days   = days;
		this.errors = [];
		this.a      = 5;
		this.getEmployeeShifts($http, this.q, weekNumber, currentYear)
			.then((result) => {
				var response     = _.map(result, (i) => {
					var eo = {};
					for (var j = 0; j < 7; j++) {
						var d                     = i["day" + j.toString()];
						var dname                 = _.findWhere(this.shifts, {id: d}).shiftname;
						eo["sday" + j.toString()] = dname;
					}
					return _.extend(i, eo);
				});
				self.tableParams = {
					reload     : function () {
					}, settings: function () {
						return {}
					}
				};
				self.tableParams = this.NgTableParams({}, {
					getData: function () {
						return response;
					}
				});
			})
			.catch((error) => {
				this.errors.push("no dates were registered for current week");
			});
	}


	getPreviousShift() {
		weekNumber -= 1;
		var $http      = this.http;
		this.dateRange = moment(currentMonday).add(1 + nextMonday, 'days').subtract(previousMonday, 'days').format("YYYY-MM-DD") + " to " +
			moment(currentMonday).add(7 + nextMonday, 'days').subtract(previousMonday, 'days').format("YYYY-MM-DD");
		var days       = [];
		for (var i = 1; i < 8; i++) {
			days.push({
				id  : "sday" + (i - 1).toString(),
				date: moment(currentMonday).add(i + nextMonday, 'days').subtract(previousMonday, 'days').format("YYYY-MM-DD")
			});
		}
		nextMonday -= 7;
		self.days   = days;
		this.errors = [];
		this.a      = 5;
		this.getEmployeeShifts($http, this.q, weekNumber, currentYear)
			.then((result) => {
				var response     = _.map(result, (i) => {
					var eo = {};
					for (var j = 0; j < 7; j++) {
						var d                     = i["day" + j.toString()];
						var dname                 = _.findWhere(this.shifts, {id: d}).shiftname;
						eo["sday" + j.toString()] = dname;
					}
					return _.extend(i, eo);
				});
				self.tableParams = {
					reload     : function () {
					}, settings: function () {
						return {}
					}
				};
				self.tableParams = this.NgTableParams({}, {
					getData: function () {
						return response;
					}
				});
			})
			.catch((error) => {
				this.errors.push("no dates were registered for current week");
			});

	}

	changeShift(value,name){
		console.log(name)
		self.changeValue=value;
	}
}
function getImagePath(shiftDetails){
	const newShiftDetails = shiftDetails;
	_.each(newShiftDetails, (shift) => {
		var randomNum = Math.floor((Math.random() * 16) + 1) + 10;
		let imagePath = "./../../contents/images/Avatars/" + randomNum.toString() + ".png";
		_.extend(shift, {imgPath: imagePath});
	});

	return newShiftDetails;
}