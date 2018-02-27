(function() {
	var utils = require('$svr/util/util.js');

	/**
	 * [根据分组ID 返回分组中的成员列表;]
	 * @param  {[type]} request [description]
	 * @param  {[type]} script  [description]
	 * @return {[userID, userName]} [description]
	 */
    return function(request, script) {
    	var teamID = "";

    	if(!request.teamID) {
    		return "请传递参数: teamID";
    	}
		teamID = utils.formatParamer(request.teamID);
        var sql = "SELECT u.uId, u.username"
				  +" FROM ued_sys_user_team t, ued_sys_user u"
				  +" WHERE t.uId = u.uId AND t.teamID = '" + teamID + "'";

        var members = Data.fetchWithDataSource("db.default",sql);

        return members;
    }

})();