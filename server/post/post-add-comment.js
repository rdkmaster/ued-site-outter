/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    function _post(request, script) {
        var comment = request.data;
        var sql ;
        if(comment.replyId){
            sql = "insert into ued_article_comment (uId,userName,content,time,serialNum,replyId,replyName) VALUES ( '"+comment.uId+"','"+comment.userName+"','"+comment.content+"','"+comment.time+"','"+comment.serialNum+"','"+comment.replyId+"','"+comment.replyName+"')";
        }else{
            sql = "insert into ued_article_comment (uId,userName,content,time,serialNum) VALUES ( '"+comment.uId+"','"+comment.userName+"','"+comment.content+"','"+comment.time+"','"+comment.serialNum+"')";
        }
        return Data.update(sql);
    }

    return {
        post: _post
    }

})();