/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    function _post(request, script) {
        var articleId = request.data;
        var deleteArticleSql = "delete from ued_article  where articleId = '"+ articleId +"'";
        var deleteCommentSql = "delete from ued_article_comment  where serialNum = '"+ articleId +"'";

        var sqlArr = [];
        sqlArr.push(deleteArticleSql);
        sqlArr.push(deleteCommentSql);
        //删除评论的所有回复
        return Data.update(sqlArr);
    }

    return {
        post: _post
    }

})();