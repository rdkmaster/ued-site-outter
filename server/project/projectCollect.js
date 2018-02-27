(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {

        var currentUser =  utils.getCurrentUser();
        if(!currentUser){
            return '请登录再使用'
        }
        var uid = utils.formatParamer(currentUser.uid);

        var sql = "SELECT * FROM xplan_project_info as b WHERE b.SerialNum IN"
            + " (SELECT"
            + " a.SerialNum"
            + " FROM"
            + " ued_favorite_record a"
            + " WHERE"
            + " a.uId = '"+uid+"' AND a.state = '1') ORDER BY b.UpdateTime desc";
        var a = Data.fetch(sql);
        var data = utils.transformJson(a);

        return {
            data: data
        }
    }
})();