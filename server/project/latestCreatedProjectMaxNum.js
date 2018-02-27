(function() {
    var utils = require('$svr/util/util.js');
    var sqlString = require('$svr/project/projectListSql.js');

    /**
     * 功能: 根据 项目的ID, 返回已经授权项目总数;
     * @params uid 人员ID;
     * @return 此人员授权项目总数
     */

    return function(request, script) {

        // var currentUser =  utils.getCurrentUser();
        // if(!currentUser){
        //     return '请登录再使用'
        // }
        // var uid = utils.formatParamer(currentUser.uid);

        var sql = "SELECT count(*) FROM"
            + " (" +sqlString.listSql()
            +") as a";
        var b = Data.fetch(sql);
        return {
            maxnum: b.data[0][0]
        } ;
    }
})();