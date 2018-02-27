(function() {
	var utils = require('$svr/util/util.js');

	/**
	 * 功能: 根据 项目的ID, 返回已经授权的分组或者个人;
	 * @params pid 项目编号;
	 * @return {[返回值: id name type| 1,团队; 2. 个人;]}
	 */
    return function(request, script) {
    	// 校验参数;
    	if(!request.pid) {
    		return "请传递参数: pid";
    	}

    	// 安全校验过滤
    	var pid = utils.formatParamer(request.pid);

        var sql = "SELECT"
        +" t.teamID AS id,"
        +" t.teamName AS name,"
        +" '1' AS type,"
        +" t2.total"
        +" FROM"
        +" ued_sys_team t,"
        +" (SELECT a.*,COUNT(1) as total FROM ued_sys_team as a , ued_sys_user_team as b  WHERE b.status='1' AND a.teamID=b.teamID GROUP BY(b.teamID)) as t2"
        +" WHERE"
        +" t.status='1' AND"
        +" t.teamID IN ("
        +" SELECT"
        +" p.roleID"
        +" FROM"
        +" ued_sys_role_privilege p"
        +" WHERE"
        +" p.resourcesID = '"+pid+"')"
        +" and t.teamID = t2.teamID"
        +" UNION ALL"
        +" SELECT"
        +" distinct"
        +" u.uId AS id,"
        +" u.username AS name,"
        +" '2' AS type,"
        +" '0' AS total"
        +" FROM"
        +" ued_sys_user u"
        +" WHERE"
        +" u.uId IN (SELECT p.roleID FROM ued_sys_role_privilege p WHERE p.resourcesID = '"+pid+"')";
        var result = Data.fetch(sql);
        var projects = utils.transformJson(result);
        return {
        	data:projects
        };
    }

})();