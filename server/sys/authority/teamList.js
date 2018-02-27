(function() {
	var utils = require('$svr/util/util.js');

	/**
	 * 功能: 返回所有的分组信息;
	 * @params pid 项目编号;
	 * @return {[返回值: teamID teamName userNum authorized?]}
	 */
    return function(request, script) {
    	var pid = "";

    	if(request.pid) {
    		var pid = utils.formatParamer(request.pid);
    	}

        var sql = "SELECT t.teamID, t.teamName, COUNT(ut.uId) AS userNum"
				  +" FROM ued_sys_team t,ued_sys_user_team ut"
				  +" WHERE t.teamID = ut.teamID AND t.STATUS = '1' AND ut.status='1'"
				  +" GROUP BY t.teamID,t.teamName";
        var allTeam = Data.fetchWithDataSource("db.default",sql);
        if(!pid) return allTeam;

        // 2. 如果有pid, 则加上是否这个工程已授权;
        var sql2 = "SELECT p.roleID"
				   +" FROM ued_sys_role_privilege p"
				   +" WHERE p.resourcesID = '"+ pid +"'";
		var authorizedTeam = Data.fetchWithDataSource("db.default",sql2);
		// var authorized = false;
		// 将返回结果展开.
		authorizedTeam = _.reduce(authorizedTeam.data, function(a, b) {
			return a.concat(b);
		}, []);
		var tag=[],table=[],objectItem={};
		_.map(allTeam.data, function(item){
			objectItem = {id:item[0],name: item[1],total:item[2]}
			if(_.contains(authorizedTeam, item[0])) {
				tag.push(objectItem)
			} else {
				table.push(objectItem)
			}
		});
        return {
        	tag:tag,
        	table:table
		};
    }

})();