import shiftService from './../services/shiftService.js';

var curr = new Date;
var weekNumber = moment(curr).week();
var currentYear = moment(curr).year();
var currentMonday = moment(curr).startOf('week') + 1;
var self;
var ShiftNames;
export default class ShiftController {

	constructor($http, $q,NgTableParams,$filter, $timeout) {
		self=this;
		this.filter=$filter;
		this.http=$http;
		this.q=$q;
		this.NgTableParams=NgTableParams;

		console.log("person: ");
    this.message = "Hi";
		const curr = new Date;
    const weekNo = moment(curr).week();
    const year = moment(curr).year();
    const monday = moment(curr).startOf('week') + 1;
    console.log("week#: ", weekNo, " year: ", year);

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
		console.log("days: ", JSON.stringify(days));
		this.getShifts($http, $q)
				.then((result) => {
					this.shifts = result;
					ShiftNames=this.shifts;
					console.log("shift master: ", JSON.stringify(result));
					return this.getEmployeeShifts($http, $q, weekNo, year);
				})
				.then((result) => {
					var response = _.map(result, (i) => {
						var eo = {};
						for(var j=0; j<7; j++){
							var d = i["day"+j.toString()];
							var dname = _.findWhere(this.shifts, {id: d}).shiftname;
							eo["sday"+j.toString()] = dname;
						}
						return _.extend(i, eo);
					});

					console.log("response result: ", JSON.stringify(response));
					self.tableParams = new NgTableParams({
						page: 1,            // show first page
						count: response.length
					},
						{
						getData: function() {
							return response;
						}
					}
					);
					//this.tableParams = new NgTableParams({}, { dataset: response });
					
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
      		console.log("response shift master: ", JSON.stringify(result));
					return resolve(result);
				})
				.catch((err) => {
					console.log("response err shift master: ", JSON.stringify(err));
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
      		console.log("response2: ", JSON.stringify(newResponse));
					return resolve(newResponse);
				})
				.catch((err) => {
					console.log("response3: ", JSON.stringify(err));
					return reject(err);
				});
		})
	}

	getNextShift() {
		weekNumber+=1;
		var $http=this.http;

		this.dateRange = moment(currentMonday).add(1, 'days').format("YYYY-MM-DD") + " to " +
			moment(currentMonday).add(7, 'days').format("YYYY-MM-DD");

		var days = [];
		for (var i = 1; i < 8; i++) {
			days.push({
				id: "sday" + (i-1).toString(),
				date: moment(currentMonday).add(i, 'days').format("YYYY-MM-DD")
			});
		}

		this.days = days;
		this.errors = [];
		this.a = 5;
		console.log("days: ", JSON.stringify(days));
		this.getEmployeeShifts($http, this.q, weekNumber, currentYear)
			.then((result) => {
				var response = _.map(result, (i) => {
					var eo = {};
					for(var j=0; j<7; j++){
						var d = i["day"+j.toString()];
						var dname = _.findWhere(this.shifts, {id: d}).shiftname;
						eo["sday"+j.toString()] = dname;
					}
					return _.extend(i, eo);
				});
				console.log("next response",response);
				console.log("next response1",this.tableParams);
				self.tableParams = {reload:function(){},settings:function(){return {}}};
				self.tableParams =  this.NgTableParams({}, { getData: function () {
					return response;
				} });
			})
			.catch((error) => {
				this.errors.push("no dates were registered for current week");
			});
	}

	getPreviousShift() {
		weekNumber-=1;
		var $http=this.http;


		this.dateRange = moment(currentMonday).add(1, 'days').format("YYYY-MM-DD") + " to " +
			moment(currentMonday).add(7, 'days').format("YYYY-MM-DD");

		var days = [];
		for (var i = 1; i < 8; i++) {
			days.push({
				id: "sday" + (i-1).toString(),
				date: moment(currentMonday).add(i, 'days').format("YYYY-MM-DD")
			});
		}

		this.days = days;
		this.errors = [];
		this.a = 5;
		console.log("days: ", JSON.stringify(days));
		this.getEmployeeShifts($http, this.q, weekNumber, currentYear)
			.then((result) => {
				var response = _.map(result, (i) => {
					var eo = {};
					for(var j=0; j<7; j++){
						var d = i["day"+j.toString()];
						var dname = _.findWhere(this.shifts, {id: d}).shiftname;
						eo["sday"+j.toString()] = dname;
					}
					return _.extend(i, eo);
				});
				console.log("next response",response);
				console.log("next response1",this.tableParams);
				self.tableParams = {reload:function(){},settings:function(){return {}}};
				self.tableParams =  this.NgTableParams({}, { getData: function () {
					return response;
				} });
			})
			.catch((error) => {
				this.errors.push("no dates were registered for current week");
			});
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