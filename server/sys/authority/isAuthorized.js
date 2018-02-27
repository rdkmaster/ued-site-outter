(function() {
	var utils = require('$svr/util/util.js');

	/**
	 * [判断一个人员的ID, 对某个项目是否有权限]
	 * @param  {[type]} request [description]
	 * @param  {[type]} script  [description]
	 * @return {boolean} [true, 有权限; false 没有权限;]
	 */
    return function(request, script) {
        if(!request.pid) {
            return "请传递参数: pid";
        }
        var pid = utils.formatParamer(request.pid);
        if(!request.userId) {
            return "请传递参数: userId";
        }

        var userId = utils.formatParamer(request.userId);
        var url= "http://10.30.6.52:80/api/zte-km-icenter-address/v1/rest/user/queryUserCardList";
        var parm = {"curEmployeeShortId":"","employeeShortIds":userId};
        var option = {
            requestProperty:{
                "content-type":"application/json"
            },
        };
        var a=Rest.get(url,parm,option);

        if(!JSON.parse(a).bo || JSON.parse(a).bo.length == 0) {
            return false;
        }

        var sql1 = "SELECT  * from ued_sys_user_team a where a.uId = '"+userId+"' AND a.teamID = 'T1001'";
        var b = Data.fetch(sql1).data;

        // 安全校验过滤
        var sql = "SELECT p.*"
				  + " FROM ued_sys_role_privilege p"
				  + " WHERE (p.roleID IN ("
				  + " SELECT ut.teamID"
				  + " FROM ued_sys_user_team ut"
				  + " WHERE ut.uId = '" + userId + "') OR p.roleID = '" + userId + "') AND p.resourcesID = '" + pid +"'";

        var result = Data.fetch(sql).data;
        a= JSON.parse(a).bo[0];

        	return {
        		state:!!result.length || !!b.length,
        		data:{
        			uid : a.employeeShortId,
                    name : a.name,
                    email :a.email,
					result: result.data,
                    deptName: a.deptFullName
				}
        	}
    }

})();