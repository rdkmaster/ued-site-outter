(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {
        var sql = "SELECT * FROM ued_sys_user";
        var a = Data.fetch(sql);
        a = utils.transformJson(a);
        a.forEach(function(val,index){
            var b=Rest.get("http://api.zte.com.cn/api/zte-km-icenter-address/v1/rest/user/queryUserCardList",{"curEmployeeShortId":"","employeeShortIds":val.uId},{"curEmployeeShortId":"","employeeShortIds":val.uid});
            var result = JSON.parse(b).bo;
            if(!!result.length){
                Data.update("UPDATE ued_sys_user SET mail ='"+result[0].email+"',dept ='"+result[0].deptFullName+"' WHERE uId = "+val.uId)
            }
        });

       return {
           data: a[1]
       }
    }
})();
