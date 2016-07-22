!function t(e,n,r){function o(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var f=new Error("Cannot find module '"+s+"'");throw f.code="MODULE_NOT_FOUND",f}var c=n[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return o(n?n:t)},c,c.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=t("./controller/shiftController.js"),i=r(o),s=t("./controller/infoController.js"),a=r(s),u=angular.module("sam",["underscore","ngRoute","angularMoment","ngTable"]);u.config(["$routeProvider","$locationProvider",function(t,e){e.html5Mode(!0)}]),u.controller("shiftController",i["default"]),u.controller("infoController",a["default"]),i["default"].$inject=["$http","$q","NgTableParams","$filter","$timeout"],a["default"].$inject=["$http","$q"]},{"./controller/infoController.js":4,"./controller/shiftController.js":5}],2:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e,n){r(this,t),console.log("http: "),this.http=e,this.promises=n}return o(t,[{key:"post",value:function(t,e){var n=this;return this.promises(function(r,o){n.http({method:"POST",url:t,data:e}).success(function(t){return r(t)}).error(function(t){return o(t)})})}},{key:"get",value:function(t){var e=this;return this.promises(function(n,r){e.http({method:"GET",url:t}).success(function(t){return n(t)}).error(function(t){return r(t)})})}}]),t}();n["default"]=i},{}],3:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(){r(this,t),this.baseUrl="http://localhost:8080/"}return o(t,null,[{key:"shift",value:function(){return{getShifts:"getShifts",shiftMaster:"shiftMaster"}}},{key:"info",value:function(){return{allUserInfo:"getAllUserInfo"}}}]),t}();n["default"]=i},{}],4:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=t("./../services/infoService.js"),a=r(s),u=function(){function t(e,n){var r=this;o(this,t),console.log("info controller: "),this.message="Hi",this.errors=[],this.getUserInfo(e,n).then(function(t){console.log("user info result: ",JSON.stringify(t)),r.userInfo=t})["catch"](function(t){r.errors.push("no user details found")})}return i(t,[{key:"getUserInfo",value:function(t,e){var n=new a["default"](t,e);return e(function(t,e){n.getAllUserInfo().then(function(e){return t(e)})["catch"](function(t){return console.log("response3: ",JSON.stringify(t)),e(t)})})}}]),t}();n["default"]=u},{"./../services/infoService.js":6}],5:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){var e=t;return _.each(e,function(t){var e=Math.floor(16*Math.random()+1)+10,n="./../../contents/images/Avatars/"+e.toString()+".png";_.extend(t,{imgPath:n})}),e}Object.defineProperty(n,"__esModule",{value:!0});var s,a,u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=t("./../services/shiftService.js"),c=r(f),l=new Date,h=moment(l).week(),d=moment(l).year(),m=moment(l).startOf("week")+1,g=function(){function t(e,n,r,i,u){var f=this;o(this,t),s=this,this.filter=i,this.http=e,this.q=n,this.NgTableParams=r,console.log("person: "),this.message="Hi";var c=new Date,l=moment(c).week(),h=moment(c).year(),d=moment(c).startOf("week")+1;console.log("week#: ",l," year: ",h),this.message="Shift Plan for ",this.dateRange=moment(d).add(1,"days").format("YYYY-MM-DD")+" to "+moment(d).add(7,"days").format("YYYY-MM-DD");for(var m=[],g=1;g<8;g++)m.push({id:"sday"+(g-1).toString(),date:moment(d).add(g,"days").format("YYYY-MM-DD")});this.days=m,this.errors=[],this.a=5,console.log("days: ",JSON.stringify(m)),this.getShifts(e,n).then(function(t){return f.shifts=t,a=f.shifts,console.log("shift master: ",JSON.stringify(t)),f.getEmployeeShifts(e,n,l,h)}).then(function(t){var e=_.map(t,function(t){for(var e={},n=0;n<7;n++){var r=t["day"+n.toString()],o=_.findWhere(f.shifts,{id:r}).shiftname;e["sday"+n.toString()]=o}return _.extend(t,e)});console.log("response result: ",JSON.stringify(e)),s.tableParams=new r({page:1,count:e.length},{getData:function(){return e}})})["catch"](function(t){f.errors.push("no dates were registered for current week")})}return u(t,[{key:"getShifts",value:function(t,e){var n=new c["default"](t,e);return e(function(t,e){n.getShiftMaster().then(function(e){return console.log("response shift master: ",JSON.stringify(e)),t(e)})["catch"](function(t){return console.log("response err shift master: ",JSON.stringify(t)),e(t)})})}},{key:"getEmployeeShifts",value:function(t,e,n,r){var o=new c["default"](t,e);return e(function(t,e){o.getEmployeeShifts(n,r).then(function(e){var n=i(e);return console.log("response2: ",JSON.stringify(n)),t(n)})["catch"](function(t){return console.log("response3: ",JSON.stringify(t)),e(t)})})}},{key:"getNextShift",value:function(){var t=this;h+=1;var e=this.http;this.dateRange=moment(m).add(1,"days").format("YYYY-MM-DD")+" to "+moment(m).add(7,"days").format("YYYY-MM-DD");for(var n=[],r=1;r<8;r++)n.push({id:"sday"+(r-1).toString(),date:moment(m).add(r,"days").format("YYYY-MM-DD")});this.days=n,this.errors=[],this.a=5,console.log("days: ",JSON.stringify(n)),this.getEmployeeShifts(e,this.q,h,d).then(function(e){var n=_.map(e,function(e){for(var n={},r=0;r<7;r++){var o=e["day"+r.toString()],i=_.findWhere(t.shifts,{id:o}).shiftname;n["sday"+r.toString()]=i}return _.extend(e,n)});console.log("next response",n),console.log("next response1",t.tableParams),s.tableParams={reload:function(){},settings:function(){return{}}},s.tableParams=t.NgTableParams({},{getData:function(){return n}})})["catch"](function(e){t.errors.push("no dates were registered for current week")})}},{key:"getPreviousShift",value:function(){var t=this;h-=1;var e=this.http;this.dateRange=moment(m).add(1,"days").format("YYYY-MM-DD")+" to "+moment(m).add(7,"days").format("YYYY-MM-DD");for(var n=[],r=1;r<8;r++)n.push({id:"sday"+(r-1).toString(),date:moment(m).add(r,"days").format("YYYY-MM-DD")});this.days=n,this.errors=[],this.a=5,console.log("days: ",JSON.stringify(n)),this.getEmployeeShifts(e,this.q,h,d).then(function(e){var n=_.map(e,function(e){for(var n={},r=0;r<7;r++){var o=e["day"+r.toString()],i=_.findWhere(t.shifts,{id:o}).shiftname;n["sday"+r.toString()]=i}return _.extend(e,n)});console.log("next response",n),console.log("next response1",t.tableParams),s.tableParams={reload:function(){},settings:function(){return{}}},s.tableParams=t.NgTableParams({},{getData:function(){return n}})})["catch"](function(e){t.errors.push("no dates were registered for current week")})}}]),t}();n["default"]=g},{"./../services/shiftService.js":7}],6:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=t("./../common/callApi.js"),a=r(s),u=t("./../common/constants.js"),f=r(u),c=function(){function t(e,n){o(this,t),console.log("into info service constructor: "),this.http=e,this.promise=n,this.api=new a["default"](e,n),this.constants=new f["default"]}return i(t,[{key:"getAllUserInfo",value:function(){var t=this;return this.promise(function(e,n){var r=t.constants.baseUrl+f["default"].info().allUserInfo;t.api.get(r).then(function(t){return e(t)})["catch"](function(t){return console.log("error occurred - get all user info infoService.js - line#21 "),n(t)})})}}]),t}();n["default"]=c},{"./../common/callApi.js":2,"./../common/constants.js":3}],7:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=t("./../common/callApi.js"),a=r(s),u=t("./../common/constants.js"),f=r(u),c=function(){function t(e,n){o(this,t),console.log("into service constructor: "),this.http=e,this.promise=n,this.api=new a["default"](e,n),this.constants=new f["default"]}return i(t,[{key:"getShiftMaster",value:function(){var t=this;return this.promise(function(e,n){var r=t.constants.baseUrl+f["default"].shift().shiftMaster;t.api.get(r).then(function(t){return e(t)})["catch"](function(t){return console.log("error occurred - get shift master shiftService.js - line#21 "),n(t)})})}},{key:"getEmployeeShifts",value:function(t,e){var n=this;return this.promise(function(r,o){var i={shiftInquiry:{weekNo:t,year:e}},s=n.constants.baseUrl+f["default"].shift().getShifts;n.api.post(s,i).then(function(t){return r(t)})["catch"](function(t){return console.log("error occurred - post employee shifts shiftService.js - line#26 "),o(t)})})}}]),t}();n["default"]=c},{"./../common/callApi.js":2,"./../common/constants.js":3}]},{},[1]);
//# sourceMappingURL=app.js.map
