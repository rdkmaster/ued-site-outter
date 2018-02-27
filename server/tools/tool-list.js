(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var sql= "select * from ued_tools";
        var postList = Data.fetch(sql);
        postList=utils.transformJson(postList);
        return postList
    }
})();