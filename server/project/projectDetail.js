(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {
        if(!request.SerialNum) {
            return "请传递参数: pid";
        }
        var pid = utils.formatParamer(request.SerialNum);
        var sql = "SELECT"
            + " *"
            + " FROM"
            + " xplan_project_info p"
            + " WHERE"
            + " p.SerialNum = '"+pid+"'";
        var a = Data.fetch(sql);
        var data = utils.transformJson(a);

        return {
            data: data
        }
    }
})();