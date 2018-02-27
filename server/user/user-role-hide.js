(function(){
    var utils = require('$svr/util/util.js');
    return function(){
        var currentUser =  utils.getCurrentUser();

        if(!currentUser){
            return false
        }else{
            var uid =utils.formatParamer(currentUser.uid);
            var sql = "SELECT a.uId FROM ued_sys_user_team AS a WHERE a.teamID = 'T1001'AND a.`status` =1";
            var a = Data.fetch(sql);
            var data = utils.transformJson(a);
            data = data.filter(function(val,index){
                return val.uId ===uid
            });
            return !!data.length
        }

    }

})();