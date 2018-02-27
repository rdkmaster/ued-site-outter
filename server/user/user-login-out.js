/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    var utils = require('$svr/util/util.js');

    return function(request, script) {
        utils.removeCurrentUser();
        return {
            status:1,
            msg:"已退出登陆"
        }
    }
})();