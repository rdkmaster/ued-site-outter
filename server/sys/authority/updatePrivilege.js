(function() {
	var utils = require('$svr/util/util.js');

	/**
	 * [_delete 删除权限]
	 * @param  {[type]} request [description]
	 * @param  {[type]} script  [description]
	 * @return  -1 数据库报错; 大于0 跟新更新成功.
	 */
	function _put(request, script) {
		// 校验参数;
    	if(!request.pid) {
    		return "请传递参数: pid";
    	}

    	// 安全校验过滤
    	var pid = utils.formatParamer(request.pid);

    	// 校验参数;
    	if(!request.teamIds) {
    		return "请传递参数: teamIds";
    	}
    	// 安全校验过滤
    	var teamIds = utils.formatParamer(request.teamIds);
    	
		var result = -1;

    	// 1. 删除这个项目下的所有授权.
    	var deleteSql = "DELETE"
				  + " FROM ued_sys_role_privilege"
				  + " WHERE resourcesID = '" + pid + "';";
				  
    	var valueStr = _.reduce(teamIds.split(","), function(str, id){ 
    		if(str != 0) {
    			return str + ",('" + id + "','" + pid + "')"; 
    		} else {
    			return "('" + id + "','" + pid + "')"; 
    		}
    	}, 0);

    	// 2. 保存新的授权信息.
    	var updateSql = "INSERT INTO ued_sys_role_privilege(roleID,resourcesID) VALUES" + valueStr;

    	var sql = [];

		try{
			// 为了保证事物, 用sql数组执行.
			sql.push(deleteSql);
			sql.push(updateSql);

			// 首先指定数据源
			Data.useDataSource("mysql");

			result = Data.update(sql);

		} catch(e) {
			Log.error("删除数据报错:" + e);
		}

		return result[1]
	}

    return {
    	put: _put
    }
})();