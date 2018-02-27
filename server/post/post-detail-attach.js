/**
 * Created by 6396000843 on 2017/8/31.
 */

(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var id = request.articleId || "";
        var sql = "SELECT * from ued_article_attach where articleId= '" + id+ "'";

        var postList = Data.fetch(sql);

        postList=utils.transformJson(postList);
        return postList
    }
})();