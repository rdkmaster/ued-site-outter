(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {
        if(!request.uId) {
            return "请传递参数: uId";
        }
        var userId = utils.formatParamer(request.uId);
        var a=Rest.get("http://api.zte.com.cn/api/zte-km-icenter-address/v1/rest/user/queryUserCardList",{"curEmployeeShortId":"","employeeShortIds":userId},{"curEmployeeShortId":"","employeeShortIds":userId});
        var result = JSON.parse(a).bo;
        if(!result || result.length == 0){
            return false;
        }
        var sql = "SELECT * FROM ued_sys_user AS a WHERE a.uId = '"+userId+"'"
        var b = Data.fetch(sql);
        if(b.data && !b.data.length){
            var sql = "INSERT INTO xplan.ued_sys_user (username, uId, mail, dept, sex) VALUES ('"+result[0].name+"', '"+result[0].employeeShortId+"', '"+result[0].email+"', '"+result[0].deptFullName+"', '"+result[0].sex+"');"
            var c = Data.update(sql);
        }
       return {
           data:c
       }
    }
})();
