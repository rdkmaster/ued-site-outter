/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var id = request.postId || "";
        var sql = "select * from ued_article_comment    where  serialNum='"+ id +"' order by time";
        var commentList = Data.fetch(sql);
        commentList=utils.transformJson(commentList);
        return commentList
    }
})();