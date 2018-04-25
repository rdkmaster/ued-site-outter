(function() {
    var utils = require('$svr/util/util.js');

    /**
     * [根据 根据项目id 找出有权限的 SM 人员]
     * @param  pid 项目id
     * @return 数组对象，对象里一个username 人员名;一个uid 人员id [{userName: 人名，uid: 人员id}]
     */
    function _get(request, script) {
        // request.pid = "abf7f6457bf8dd29";
        if (!request.pid) {
            return "请传递参数: pid";
        }
        var pid = utils.formatParamer(request.pid);

        var sql = "SELECT DISTINCT p.username, p.uId"
        +" FROM"
            +"  ("
            +" SELECT c.username,c.uId"
            +" FROM ued_sys_role_privilege AS a,"
            +" ued_sys_user_team AS b,"
            +" ued_sys_user AS c"
            +" WHERE a.resourcesID = '"+pid+"' AND a.roleID = b.teamID AND b.uId = c.uId AND c.roles = 'SM' UNION ALL"
            +" SELECT u.username,u.uId"
            +" FROM xplan_project_info d, ued_sys_user u"
            +" WHERE d.SerialNum = '"+pid+"' AND u.uId = d.creatorId) p";
         var b = Data.fetch(sql);
         b = utils.transformJson(b);
        return b

    }

    return {
        get:_get
    }


})();