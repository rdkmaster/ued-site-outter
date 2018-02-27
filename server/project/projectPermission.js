(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var  a = Data.fetch("SELECT ued_sys_team.teamName FROM ued_sys_team WHERE ued_sys_team.status = '1'");
        var teamArr = [], teams = [];
        a.data.forEach(function(val){
            teamArr.push(val[0])
        });
        teamArr.forEach(function(val){
            var team = {};
            team["team"] = val;
            var sql = "SELECT"
            + " a.*"
            + " FROM"
            + " ued_sys_user AS a,"
            + " ued_sys_team AS b,"
            + " ued_sys_user_team AS c"
            + " WHERE"
            + " b.STATUS = '1'"
            + " AND b.teamName = '"+val+"'"
            + " AND c.STATUS = '1'"
            + " AND c.uId = a.uId"
            + " AND b.teamID = c.teamID";
             var data = Data.fetch(sql);
             var temp =  utils.transformJson(data);
             var items = [];
             temp.forEach(function(val){
                 var item={};
                 item["username"] = val["username"];
                 item["uId"] = val["uId"];
                 item["mail"] = val["mail"];
                 item["dept"] = val["dept"];
                 items.push(item);
             });
            team["content"] = items;
            teams.push(team);
        });
        return {
            data: teams
        } ;
    }
})();