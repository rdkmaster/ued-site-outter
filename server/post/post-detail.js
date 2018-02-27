/**
 * Created by 6396000843 on 2017/8/31.
 */

(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var id = request.articleId || "";

        var sql = "SELECT t1.*, IFNULL(t2.commentTotal,0) as commentTotal,IFNULL(t3.browserUsersId,'') as browserUsersId from"+
        " ued_article as t1"+
        " LEFT JOIN"+
        " (SELECT serialNum,COUNT(1) as commentTotal from ued_article_comment GROUP BY serialNum) as t2 " +
        " on t1.articleId=t2.serialNum"+
        " LEFT JOIN"+
        " (SELECT articleId,GROUP_CONCAT(DISTINCT(uid) ORDER BY visitDate desc) as browserUsersId"+
        " FROM ued_article_visit_record where uid <> '-1' GROUP BY articleId) as t3 " +
        " on t1.articleId=t3.articleId"+
        " where t1.articleId= '" + id+ "'";

        var postList = Data.fetch(sql);

        postList=utils.transformJson(postList);
        return postList
    }
})();