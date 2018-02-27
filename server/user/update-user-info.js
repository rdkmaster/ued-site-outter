/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    var utils = require('$svr/util/util.js');
    function _post(request, script) {
        var user = request.data;
        //更新用户信息
        var sql = "update ued_user set " +
            "headPicture='"+user.headPicture+"'," +
            "company='"+user.company+"'," +
            "email='"+user.email+"'," +
            "vocation='"+user.vocation+"'," +
            "phoneNumber='"+user.phoneNumber+"'," +
            "sex='"+user.sex+"'" +
            "where uid ='"+user.uid+"'";

        var result = Data.update(sql);
        return {
            status:result
        };
    }

    return {
        post: _post
    }

})();