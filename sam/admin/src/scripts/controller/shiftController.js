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
var changedData={};
export default class ShiftController {

	constructor($http, $q,NgTableParams,$filter, ngTableDefaults) {
		self=this;
		this.filter=$filter;
		this.http=$http;
		this.q=$q;
		this.NgTableParams=NgTableParams;
		this.isEditable=false;

    this.message = "Hi";
		
		const curr = new Date;
    const weekNo = moment(curr).week();
    const year = moment(curr).year();
    const monday = moment(curr).startOf('week') + 1;

    this.message = "Shift Plan for ";
    this.dateRange = moment(monday).add(1, 'days').format("YYYY-MM-DD") + " to " +
      moment(monday).add(7, 'days').format("YYYY-MM-DD");

		var days = [];
	  for (var i = 1; i < 8; i++) {
	    days.push({
				id: "sday" + (i-1).toString(),
				date: moment(monday).add(i, 'days').format("YYYY-MM-DD")
			});
	  }

		this.days = days;
		this.errors = [];
		this.a = 5;
		this.getShifts($http, $q)
				.then((result) => {
					this.shifts = result;
					ShiftNames=this.shifts;
					var select= {
						abbr     : "select",
						colorcode: null,
						id       : null,
						shiftfrom: "select",
						shiftname: "select",
						shiftto  : "select"
					};
					this.shifts.unshift(select);

					return this.getEmployeeShifts($http, $q, weekNo, year);
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

					self.tableParams = new NgTableParams({
					},
						{
						getData: function() {
							return response;
						},
							counts: []
					}
					);
					
				})
				.catch((error) => {
					this.errors.push("no dates were registered for current week");
				});
	}



	getShifts($http, $q){
		const svc = new shiftService($http, $q);
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

	getEmployeeShifts($http, $q, weekNo, year){
		const svc = new shiftService($http, $q);
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
		weekNumber+=1;
		nextMonday+=7;
		var $http=this.http;
		this.dateRange = moment(currentMonday).add(1+nextMonday, 'days').format("YYYY-MM-DD") + " to " +
			moment(currentMonday).add(7+nextMonday, 'days').format("YYYY-MM-DD");

		var days = [];
		for (var i = 1; i < 8; i++) {
			days.push({
				id: "sday" + (i-1).toString(),
				date: moment(currentMonday).add(i+nextMonday, 'days').format("YYYY-MM-DD")
			});

		}
		self.days = days;
		this.errors = [];
		this.a = 5;
		this.getEmployeeShifts($http, this.q, weekNumber, currentYear)
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
				self.tableParams = {reload:function(){},settings:function(){return {}}};
				self.tableParams =  this.NgTableParams({}, { getData: function () {
					return response;
				},
					counts: []});
			})
			.catch((error) => {
				this.errors.push("no dates were registered for current week");
			});
	}


	getPreviousShift() {
		weekNumber-=1;
		var $http=this.http;
		this.dateRange = moment(currentMonday).add(1+nextMonday, 'days').subtract(previousMonday,'days').format("YYYY-MM-DD") + " to " +
			moment(currentMonday).add(7+nextMonday, 'days').subtract(previousMonday,'days').format("YYYY-MM-DD");
		var days = [];
		for (var i = 1; i < 8; i++) {
			days.push({
				id: "sday" + (i-1).toString(),
				date: moment(currentMonday).add(i+nextMonday, 'days').subtract(previousMonday,'days').format("YYYY-MM-DD")
			});
		}
		nextMonday-=7;
		self.days = days;
		this.errors = [];
		this.a = 5;
		this.getEmployeeShifts($http, this.q, weekNumber, currentYear)
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
				self.tableParams = {reload:function(){},settings:function(){return {}}};
				self.tableParams =  this.NgTableParams({}, { getData: function () {
					return response;
				},
					counts: []});
			})
			.catch((error) => {
				this.errors.push("no dates were registered for current week");
			});
	}
	
	changeShift(value,employeeid,date){
		var a=_.filter(self.days,(day) => {
			return day.id==date;
		});

		changedData[employeeid+a[0].date]={
			"EmpId":employeeid,
			"Shift":value,
			"ShiftDate":a[0].date
		};
	}

	submitData(){
		if(changedData.length!=0){
			var data=[];
			_.each(changedData,(object)=>{
				data.push(object)
			})

			const svc = new shiftService(this.http, this.q);
			return this.q((resolve, reject) => {
				svc.submitData(data)
					.then((result) => {
						return resolve(result);
					})
					.catch((err) => {
						return reject(err);
					});
			})
		}
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