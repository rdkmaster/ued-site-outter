/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    var utils = require('$svr/util/util.js');

    return function(request, script) {
        var currentUser = utils.getCurrentUser();
        return {
           "currentUser": currentUser
        }
    }
})();