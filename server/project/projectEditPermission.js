(function() {
    var utils = require('$svr/util/util.js');
    function _post(request, script) {
        var data=request.data;
        var oldTeam = request.teamName;
        var newTeam = data[0].team;
        var sql1 = "SELECT"
            + " a.teamID"
            + " FROM"
            + " ued_sys_team AS a WHERE a.status='1' AND a.teamName = '"+oldTeam+"'";
        var a = Data.fetch(sql1);
        var teamID = a.data[0][0];
           Data.update("UPDATE ued_sys_team AS a SET a.teamName='"+newTeam+"' WHERE a.teamName = '"+oldTeam+"' AND a.status = '1'");
        // 1. 删除原有队名下所有成员.
        var deleteSql ="DELETE" +
            " FROM" +
            " ued_sys_user_team" +
            " WHERE" +
            " teamID = '"+teamID+"';";
           var userID = [];
           data.forEach(function(val){
               userID.push(val.uId);
           })

            var valueStr = _.reduce(userID, function(str, id){
                if(str != 0) {
                    return str + ",('" + id + "', '"+teamID+"' )";
                } else {
                    return "('" + id + "','"+teamID+"')";
                }
            }, 0);
            var updateSql = "INSERT INTO ued_sys_user_team(uId,teamID) VALUES" + valueStr;

        var sql = [];

        try{
            // 为了保证事物, 用sql数组执行.
            sql.push(deleteSql);
            sql.push(updateSql);

            // 首先指定数据源
            Data.useDataSource("mysql");

            var result = Data.update(sql);

        } catch(e) {
            Log.error("删除数据报错:" + e);
        }

        return result
    }

    return {
        post: _post
    }
})();