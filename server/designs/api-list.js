/**
 * Created by 6396000843 on 2017/9/6.
 */
(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var sql = "select * from ued_design_menu_api where parentName='" + request.menuName +"'";
        var apiLists = Data.fetch(sql);
        apiLists=utils.transformJson(apiLists);
        return {
            data:apiLists
        }
    }
})();