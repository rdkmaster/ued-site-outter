(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {
        if(!request.pid) {
            return "请传递参数: pid";
        }
        var pid = utils.formatParamer(request.pid);

        var sql = "SELECT"
                + " p.creatorId"
                + " FROM"
                + " xplan_project_info p"
                + " WHERE"
                + " p.SerialNum = '"+pid+"'"
                + " UNION"
                + " SELECT"
                + " u.uId"
                + " FROM"
                + " ued_sys_user_team u"
                + " WHERE"
                + " u.uId REGEXP '^[0-9]{8,10}$' AND u.teamID IN (SELECT p.roleID FROM ued_sys_role_privilege p WHERE p.resourcesID = '"+pid+"' AND p.roleID REGEXP '^T[0-9]{4}$')"
                + " UNION"
                + " SELECT d.roleID FROM ued_sys_role_privilege d WHERE d.roleID REGEXP '^[0-9]{8,10}$' AND d.resourcesID = '"+pid+"'"
        var a = Data.fetch(sql);

        var usreIdArr = [];
        a.data.forEach(function(val){
            usreIdArr.push(val[0])
        });

        return {
            data: usreIdArr
        }
    }
})();