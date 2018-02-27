(function() {
    var utils = require('$svr/util/util.js');

    /**
     * [根据 人员id 找出其所在的所有团队]
     * @param  uid 成员id
     * @return 对象数组，[{teamName: ,teamId ,}]
     */
    function _get(request, script) {
        request.uid = '6176000041';
        if (!request.uid) {
            return "请传递参数: uid";
        }
        var uid = utils.formatParamer(request.uid);

        var sql = "SELECT a.teamID,a.teamName FROM ued_sys_team as a,ued_sys_user_team as b WHERE b.uId='"+uid+"' and b.teamID = a.teamID AND b.`status`=1 ";

        var b = Data.fetch(sql);
        b = utils.transformJson(b);

        return b

    }

    return {
        get:_get
    }


})();