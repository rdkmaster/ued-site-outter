(function() {
    var utils = require('$svr/util/util.js');

    /**
     * [给单个成员加权限]
     * @param  pid 项目id
     * @param  uid 成员id
     * @return {boolean} [true, 成功; false 失败;]
     */
    function _put(request, script) {

        if (!request.pid) {
            return "请传递参数: pid";
        }
        var pid = utils.formatParamer(request.pid);
        if (!request.uid) {
            return "请传递参数: uid";
        }
        var uid = utils.formatParamer(request.uid);
        var sql = "INSERT INTO ued_sys_role_privilege(roleID,resourcesID) VALUES ('" + uid + "','" + pid + "')";

        var a = Data.update(sql);


        return a

    }

    return {
        put:_put
    }


})();