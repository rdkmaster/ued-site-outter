/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    function _post(request, script) {
        var commentId = request.data;
        var deleteCommentSql = "delete from ued_article_comment  where commentId = '"+ commentId +"'";
        var deleteReplySql="delete from ued_article_comment  where replyId = '"+ commentId +"'";
        //删除评论的所有回复
        Data.update(deleteReplySql);
        //删除评论
        return Data.update(deleteCommentSql);
    }

    return {
        post: _post
    }

})();