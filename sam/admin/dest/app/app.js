!function t(e,n,r){function o(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return o(n?n:t)},f,f.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=t("./controller/shiftController.js"),i=r(o),s=t("./controller/infoController.js"),a=r(s),u=t("./controller/loginController.js"),c=r(u),f=angular.module("sam",["underscore","ngRoute","angularMoment","ngTable"]);f.config(["$routeProvider","$locationProvider",function(t,e){e.html5Mode(!0)}]),f.controller("shiftController",i["default"]),f.controller("infoController",a["default"]),f.controller("loginController",c["default"]),i["default"].$inject=["$http","$q","NgTableParams","$filter","ngTableDefaults"],a["default"].$inject=["$http","$q"],c["default"].$inject=["$http","$q"]},{"./controller/infoController.js":4,"./controller/loginController.js":5,"./controller/shiftController.js":6}],2:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e,n){r(this,t),console.log("http: "),this.http=e,this.promises=n}return o(t,[{key:"post",value:function(t,e){var n=this;return this.promises(function(r,o){n.http({method:"POST",url:t,data:e}).success(function(t){return r(t)}).error(function(t){return o(t)})})}},{key:"get",value:function(t){var e=this;return this.promises(function(n,r){e.http({method:"GET",url:t}).success(function(t){return n(t)}).error(function(t){return r(t)})})}}]),t}();n["default"]=i},{}],3:[function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(){r(this,t),this.baseUrl="http://localhost:8080/"}return o(t,null,[{key:"shift",value:function(){return{getShifts:"getShifts",shiftMaster:"shiftMaster",update:"updateShift"}}},{key:"info",value:function(){return{allUserInfo:"getAllUserInfo"}}},{key:"login",value:function(){return{loginInfo:"getLoginInfo"}}}]),t}();n["default"]=i},{}],4:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=t("./../services/infoService.js"),a=r(s),u=function(){function t(e,n){var r=this;o(this,t),console.log("info controller: "),this.message="Hi",this.errors=[],this.getUserInfo(e,n).then(function(t){console.log("user info result: ",JSON.stringify(t)),r.userInfo=t})["catch"](function(t){r.errors.push("no user details found")})}return i(t,[{key:"getUserInfo",value:function(t,e){var n=new a["default"](t,e);return e(function(t,e){n.getAllUserInfo().then(function(e){return t(e)})["catch"](function(t){return console.log("response3: ",JSON.stringify(t)),e(t)})})}}]),t}();n["default"]=u},{"./../services/infoService.js":7}],5:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=t("./../services/loginService.js"),u=r(a),c=function(){function t(e,n){o(this,t),this.http=e,this.q=n}return s(t,[{key:"checkLogin",value:function(t,e){var n=this;if(void 0!=t||void 0!=e&&""!=e)if(void 0==t||""==t)$("#ErrorListForLogin").text("Please enter username"),$("#ErrorListForLogin").css("display","block");else if(void 0==e||""==e)$("#ErrorListForLogin").text("Please enter password"),$("#ErrorListForLogin").css("display","block");else if(e=e.trim(" "),0==e.length)$("#ErrorListForLogin").text("Please enter valid password"),$("#ErrorListForLogin").css("display","block");else{var r=function(){var r=new u["default"](n.http,n.q);return{v:n.q(function(n,o){r.getLoginData(t,e).then(function(t){return"Success"==t.resTypeMessage?$(".btn-default").click():($("#ErrorListForLogin").text(t.resTypeMessage),$("#ErrorListForLogin").css("display","block")),console.log("response shift master: ",JSON.stringify(t)),n(t)})["catch"](function(t){return console.log("response err shift master: ",JSON.stringify(t)),o(t)})})}}();if("object"===("undefined"==typeof r?"undefined":i(r)))return r.v}else $("#ErrorListForLogin").text("Please enter username and password"),$("#ErrorListForLogin").css("display","block")}}]),t}();n["default"]=c},{"./../services/loginService.js":8}],6:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){var e=t;return _.each(e,function(t){var e=Math.floor(16*Math.random()+1)+10,n="./../../contents/images/Avatars/"+e.toString()+".png";_.extend(t,{imgPath:n})}),e}Object.defineProperty(n,"__esModule",{value:!0});var s,a,u,c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=t("./../services/shiftService.js"),l=r(f),h=t("./../services/loginService.js"),d=(r(h),t("./../services/infoService.js")),v=r(d),g=new Date,m=moment(g).week(),p=moment(g).year(),y=moment(g).startOf("week")+7,b=0,S=7,w={},j=function(){function t(e,n,r,i,c){var f=this;o(this,t),s=this,this.filter=i,this.http=e,this.q=n,this.NgTableParams=r,this.isEditable=!1,this.message="Hi";var l=new Date,h=moment(l).week(),d=moment(l).year(),v=moment(l).startOf("week")+1;this.message="Shift Plan for ",this.dateRange=moment(v).add(1,"days").format("YYYY-MM-DD")+" to "+moment(v).add(7,"days").format("YYYY-MM-DD");for(var g=[],m=1;m<8;m++)g.push({id:"sday"+(m-1).toString(),date:moment(v).add(m,"days").format("YYYY-MM-DD")});this.days=g,this.errors=[],this.a=5,this.getShifts(e,n).then(function(t){f.shifts=t,a=f.shifts;var r={abbr:"select",colorcode:null,id:null,shiftfrom:"select",shiftname:"select",shiftto:"select"};return f.shifts.unshift(r),f.getEmployeeShifts(e,n,h,d)}).then(function(t){var e=_.map(t,function(t){for(var e={},n=0;n<7;n++){var r=t["day"+n.toString()];if(void 0==_.findWhere(f.shifts,{id:r}))break;var o=_.findWhere(f.shifts,{id:r}).shiftname;e["sday"+n.toString()]=o}return _.extend(t,e)});0!=e.length?(u=!1,s.tableParams=new r({},{getData:function(){return e},counts:[]})):u=!0})["catch"](function(t){f.errors.push("no dates were registered for current week")})}return c(t,[{key:"getResponse",value:function(t){var e=this;return _.map(t,function(t){for(var n={},r=0;r<7;r++){var o=t["day"+r.toString()];if(void 0==_.findWhere(e.shifts,{id:o}))break;var i=_.findWhere(e.shifts,{id:o}).shiftname;n["sday"+r.toString()]=i}return _.extend(t,n)})}},{key:"getUserInfo",value:function(t,e){var n=new v["default"](t,e);return e(function(t,e){n.getAllUserInfo().then(function(e){return t(e)})["catch"](function(t){return console.log("response3: ",JSON.stringify(t)),e(t)})})}},{key:"getShifts",value:function(t,e){var n=new l["default"](t,e);return e(function(t,e){n.getShiftMaster().then(function(e){return t(e)})["catch"](function(t){return e(t)})})}},{key:"getEmployeeShifts",value:function(t,e,n,r){var o=new l["default"](t,e);return e(function(t,e){o.getEmployeeShifts(n,r).then(function(e){var n=i(e);return t(n)})["catch"](function(t){return e(t)})})}},{key:"getNextShift",value:function(){var t=this;m+=1,b+=7;var e=this.http;this.dateRange=moment(y).add(1+b,"days").format("YYYY-MM-DD")+" to "+moment(y).add(7+b,"days").format("YYYY-MM-DD");for(var n=[],r=1;r<8;r++)n.push({id:"sday"+(r-1).toString(),date:moment(y).add(r+b,"days").format("YYYY-MM-DD")});s.days=n,this.errors=[],this.a=5,this.getEmployeeShifts(e,this.q,m,p).then(function(e){var n=t.getResponse(e);u=0==n.length,s.tableParams={reload:function(){},settings:function(){return{}}},s.tableParams=t.NgTableParams({},{getData:function(){return n},counts:[]})})["catch"](function(e){t.errors.push("no dates were registered for current week")})}},{key:"getPreviousShift",value:function(){var t=this;m-=1;var e=this.http;this.dateRange=moment(y).add(1+b,"days").subtract(S,"days").format("YYYY-MM-DD")+" to "+moment(y).add(7+b,"days").subtract(S,"days").format("YYYY-MM-DD");for(var n=[],r=1;r<8;r++)n.push({id:"sday"+(r-1).toString(),date:moment(y).add(r+b,"days").subtract(S,"days").format("YYYY-MM-DD")});b-=7,s.days=n,this.errors=[],this.a=5,this.getEmployeeShifts(e,this.q,m,p).then(function(e){var n=t.getResponse(e);u=0==n.length,s.tableParams={reload:function(){},settings:function(){return{}}},s.tableParams=t.NgTableParams({},{getData:function(){return n},counts:[]})})["catch"](function(e){t.errors.push("no dates were registered for current week")})}},{key:"changeShift",value:function(t,e,n){var r=_.filter(s.days,function(t){return t.id==n}),o=_.filter(s.shifts,function(e){return e.shiftname==t})[0].id;w[e+r[0].date]={userId:e,Shift:o,ShiftDate:r[0].date}}},{key:"submitData",value:function(){var t=this;if(0!=w.length){var e=[];_.each(w,function(t){e.push(t)}),this.updateShift(e).then(function(e){if(e.updateDone){t.dateRange=moment(y).add(1+b,"days").format("YYYY-MM-DD")+" to "+moment(y).add(7+b,"days").format("YYYY-MM-DD");for(var n=[],r=1;r<8;r++)n.push({id:"sday"+(r-1).toString(),date:moment(y).add(r+b,"days").format("YYYY-MM-DD")});s.days=n,t.errors=[],t.a=5,t.getEmployeeShifts(t.http,t.q,m,p).then(function(e){var n=t.getResponse(e);u=0==n.length,s.tableParams={reload:function(){},settings:function(){return{}}},s.tableParams=t.NgTableParams({},{getData:function(){return n},counts:[]}),t.isEditable=!1})["catch"](function(e){t.errors.push("no dates were registered for current week")})}})}}},{key:"updateShift",value:function(t){var e=new l["default"](this.http,this.q);return this.q(function(n,r){e.submitData(t).then(function(t){return n(t)})["catch"](function(t){return r(t)})})}},{key:"editShiftPlan",value:function(){var t=this;s.isEditable=!0,u&&this.getUserInfo(this.http,this.q).then(function(e){t.userInfo=e;var n=_.map(e,function(t){for(var e={},n=0;n<7;n++)e["sday"+n.toString()]="select";return _.extend(t,e)});n=i(n),s.tableParams=new t.NgTableParams({},{getData:function(){return n},counts:[]})})["catch"](function(e){t.errors.push("no user details found")})}},{key:"cancel",value:function(){s.isEditable=!1,u&&(s.tableParams=new this.NgTableParams({},{getData:function(){return[]},counts:[]}))}}]),t}();n["default"]=j},{"./../services/infoService.js":7,"./../services/loginService.js":8,"./../services/shiftService.js":9}],7:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=t("./../common/callApi.js"),a=r(s),u=t("./../common/constants.js"),c=r(u),f=function(){function t(e,n){o(this,t),console.log("into info service constructor: "),this.http=e,this.promise=n,this.api=new a["default"](e,n),this.constants=new c["default"]}return i(t,[{key:"getAllUserInfo",value:function(){var t=this;return this.promise(function(e,n){var r=t.constants.baseUrl+c["default"].info().allUserInfo;t.api.get(r).then(function(t){return e(t)})["catch"](function(t){return console.log("error occurred - get all user info infoService.js - line#21 "),n(t)})})}}]),t}();n["default"]=f},{"./../common/callApi.js":2,"./../common/constants.js":3}],8:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=t("./../common/callApi.js"),a=r(s),u=t("./../common/constants.js"),c=r(u),f=function(){function t(e,n){o(this,t),console.log("into service constructor: "),this.http=e,this.promise=n,this.api=new a["default"](e,n),this.constants=new c["default"],this.reponse=""}return i(t,[{key:"getLoginData",value:function(t,e){var n=this;return this.promise(function(r,o){var i={loginData:{loginId:t,psd:e}};console.log(i);var s=n.constants.baseUrl+c["default"].login().loginInfo;console.log(s),n.api.post(s,i).then(function(t){return n.reponse=t,console.log(t),r(t)})["catch"](function(t){return console.log("error occurred - post login loginService.js - line#26 "),o(t)})})}}]),t}();n["default"]=f},{"./../common/callApi.js":2,"./../common/constants.js":3}],9:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=t("./../common/callApi.js"),a=r(s),u=t("./../common/constants.js"),c=r(u),f=function(){function t(e,n){o(this,t),console.log("into service constructor: "),this.http=e,this.promise=n,this.api=new a["default"](e,n),this.constants=new c["default"]}return i(t,[{key:"getShiftMaster",value:function(){var t=this;return this.promise(function(e,n){var r=t.constants.baseUrl+c["default"].shift().shiftMaster;t.api.get(r).then(function(t){return e(t)})["catch"](function(t){return console.log("error occurred - get shift master shiftService.js - line#21 "),n(t)})})}},{key:"getEmployeeShifts",value:function(t,e){var n=this;return this.promise(function(r,o){var i={shiftInquiry:{weekNo:t,year:e}},s=n.constants.baseUrl+c["default"].shift().getShifts;n.api.post(s,i).then(function(t){return r(t)})["catch"](function(t){return console.log("error occurred - post employee shifts shiftService.js - line#26 "),o(t)})})}},{key:"submitData",value:function(t){var e=this;return this.promise(function(n,r){var o=e.constants.baseUrl+c["default"].shift().update;e.api.post(o,t).then(function(t){return n(t)})["catch"](function(t){return console.log("error occurred - get shift master shiftService.js - line#21 "),r(t)})})}}]),t}();n["default"]=f},{"./../common/callApi.js":2,"./../common/constants.js":3}]},{},[1]);
//# sourceMappingURL=app.js.map
