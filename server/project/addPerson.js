(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {
        if(!request.uid) {
            return "请传递参数: uid";
        }
        var uid = utils.formatParamer(request.uid);

        if(!request.team) {
            return "请传递参数: team";
        }
        var team = utils.formatParamer(request.team);
        var sql1 = "SELECT" +
            " *" +
            " FROM" +
            " ued_sys_user_team AS a" +
            " WHERE" +
            " a.teamID in" +
            " (SELECT" +
            " b.teamID" +
            " FROM" +
            " ued_sys_team AS b" +
            " WHERE" +
            " b.teamName= '"+team+"' AND b.status = '1')"+
            " AND a.uId = '"+uid+"'" +
            " AND a.status = '1'";
        var a = Data.fetch(sql1);
        if(a.data && !a.data.length){
            var sql2 = "INSERT INTO ued_sys_user_team (uId, teamID, STATUS) SELECT" +
                " '"+uid+"'," +
                " c.teamID," +
                " '1'" +
                " FROM" +
                " ued_sys_team AS c" +
                " WHERE" +
                " c.teamName = '"+team+"'" +
                " AND c.status = '1'";
            var b = Data.update(sql2)
        }
        return {
            data:b
        }
    }
})();