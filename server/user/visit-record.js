/**
 * Created by 6396000843 on 2017/11/23.
 */

(function() {
    function _post(request, script) {

        var sql = "update " + request.tbName + //项目，博文统计用户访问次数
            " set "+request.recordNumField  +
            " = " + request.recordNumField + "+1"+
            " WHERE "+ request.tbIdField +
            " ='"+ request.tbIdValue + "'";

        if(request.tbName=="ued_article"){ //博文的访问还要记录用户
            var articleSql = "insert into ued_article_visit_record(articleId,uid,visitDate)" +
                "VALUES ( " +
                "'"+request.tbIdValue+"'," +
                "'"+request.visitUserId+"'," +
                "'"+request.visitDate+"')";
            Data.update(articleSql)
        }

        return {
            status:Data.update(sql)
        };
    }
    return {
        post: _post
    }

})();