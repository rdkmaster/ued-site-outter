(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        if(!request.team) {
            return "请传递参数: team";
        }
        var team = utils.formatParamer(request.team);
        if(!request.uid){
            var b=Data.fetch("select a.teamID from ued_sys_team as a where a.teamName='"+team+"' AND a.`status`='1'");
            var teamID = b.data[0][0];
            var a=Data.update("UPDATE ued_sys_team as a SET a.status = '2' WHERE a.teamName ='"+team+"'");
            var sql1 = "UPDATE ued_sys_user_team AS a SET a. STATUS ='2'WHERE a.teamID = '"+teamID+"'"

            var c = Data.update(sql1);
        }else{
            var uid = utils.formatParamer(request.uid);
            var sql2 = "UPDATE ued_sys_user_team AS a"
                + " SET a. STATUS = '2'"
                + " WHERE"
                + " a.uId = '"+uid+"' AND"
                + " a.teamID IN ("
                + " SELECT"
                + " ued_sys_team.teamID"
                + " FROM"
                + " ued_sys_team"
                + " WHERE"
                + " ued_sys_team. STATUS = '1'"
                + " AND ued_sys_team.teamName = '"+team+"'"
                + " )";
            var a=Data.update(sql2);
        }
        return {
            data: true
        }
    }
})();