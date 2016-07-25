// sam.factory('constants', function(){
//   return {
//     btnType: {
//       LINK: "LINK",
//       FN: "FUNCTION",
//       METHOD: "METHOD"
//     }
//   }
// });

export default class constants{
  constructor(){
    this.baseUrl = "http://localhost:8080/"
  }

  static shift(){
    return {
      getShifts: "getShifts",
      shiftMaster: "shiftMaster",
      update:"updateShift"
    }
  }

  static info(){
    return {
      allUserInfo: "getAllUserInfo"
    }
  }
  static login(){
    return {
      loginInfo: "getLoginInfo"
    }
  }
}
