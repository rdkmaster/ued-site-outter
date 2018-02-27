(function() {
    var utils = require('$svr/util/util.js');

    return function (request, script) {
        log(!!request.uid,"+++++++++++++++");
        if(!!request.uid){
            var uid = utils.formatParamer(request.uid)
        }else{
            var currentUser = utils.getCurrentUser();
            if (!currentUser) {
                return '请登录再使用'
            }
            log(uid,"+++++++++++++++++++++");
            uid = utils.formatParamer(currentUser.uid);
        }
        log(uid,"+++++++++++++++++++++")
        var a=Rest.get("http://api.zte.com.cn/api/zte-km-icenter-address/v1/rest/user/queryUserCardList",{"curEmployeeShortId":"","employeeShortIds":uid},{"curEmployeeShortId":"","employeeShortIds":uid});
        var result = JSON.parse(a).bo;
        if(!result || result.length == 0){
            return "中兴外部用户，没有此项权限";
        }

       return {
           data:{
               uid: result[0].employeeShortId,
               name: result[0].name,
               dept: result[0].deptFullName,
               email: result[0].email
           }
       }
    }
})();
