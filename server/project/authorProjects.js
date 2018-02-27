(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {
        /**
         * 功能: 根据 项目的ID, 返回已经授权项目列表;
         * @params uid 人员ID;
         * @return 此人员授权项目列表
         */
        var currentUser =  utils.getCurrentUser();

        if(!currentUser){
            return '请登录再使用'
        }
        var uid = utils.formatParamer(currentUser.uid);

        var sql = "SELECT" 
            + " *"
            + " FROM"
            + " xplan_project_info t"
            + " WHERE"
            + " t.SerialNum IN ("
            + " SELECT"
            + " f.resourcesID"
            + " FROM"
            + " ued_sys_role_privilege f"
            + " WHERE"
            + " f.roleID IN ("
            + " SELECT"
            + " c.teamID"
            + " FROM"
            + " ued_sys_team c"
            + " WHERE"
            + " c.teamName IN ("
            + " SELECT"
            + " b.team"
            + " FROM"
            + " ued_sys_user b"
            + " WHERE"
            + " b.uId = '"+uid+"'"
            + " )"
            + " )"
            + " )"
            + " UNION"
            + " SELECT"
            + " *"
            + " FROM"
            + " xplan_project_info t"
            + " WHERE"
            + " t.SerialNum IN ("
            + " SELECT"
            + " p.resourcesID"
            + " FROM"
            + " ued_sys_role_privilege p"
            + " WHERE"
            + " p.roleID = '"+uid+"'"
            + " )"
        var a = Data.fetch(sql);

        return {
            data: a
        }
    }
})();
