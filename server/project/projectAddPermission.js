(function() {
    var utils = require('$svr/util/util.js');
    function _post(request, script) {
        var data=request.data;
        var teamName = data[0]["team"];
        var sql1 = "SELECT"
            + " ued_sys_team.teamID,ued_sys_team.teamName"
            + " FROM"
            + " ued_sys_team";
        var allTeam = Data.fetch(sql1);
        var teamArr = [],teamID,a,max,teamNameArr=[];
            allTeam.data.forEach(function(val){
                teamArr.push(val[0]);
                teamNameArr.push(val[1]);
            });
            if(teamNameArr.indexOf(teamName)< 0 ){
                max = utils.transformMax(teamArr,1);
                teamID= "T" + (max+1);
            }else{
                Data.update("UPDATE ued_sys_team as b SET b.status = 1 where b.teamName = '"+teamName+"'");
                a = Data.fetch("SELECT a.teamID FROM ued_sys_team as a WHERE a.teamName = '"+teamName+"'");
                teamID = a.data[0][0];
            }

           Data.update("INSERT INTO ued_sys_team( teamID,teamName) VALUES ('"+teamID+"','"+teamName+"')");
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
            var result = Data.update(updateSql);
            return result

    }
    return {
        post: _post
    }
})();