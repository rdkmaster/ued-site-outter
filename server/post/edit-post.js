/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    function _post(request, script) {
        var post = request.data;
        if(post.status==undefined){
            post.status=1;
        }
        var sql = "update ued_article set " +
            "title='"+post.title+"'," +
            "subTitle='"+post.subTitle+"'," +
            "headPicture='"+post.headPicture+"'," +
            "type='"+post.type+"'," +
            "content='"+post.content+"'," +
            "updatedate='"+post.updatedate+"'," +
            "status='"+post.status+"'"+
            "where articleId ='"+post.articleId+"'";

        if(post.attachment!=null || attachment!=''){
            var deleteAttchSql = "delete from ued_article_attach  where articleId=" + "'"+post.articleId+"'";
            Data.update(deleteAttchSql);
            var attachList = JSON.parse(post.attachment);
            for(var i= 0,len=attachList.length; i<len; i++){
                var attachSql="insert into ued_article_attach(articleId,attachName,attachDownloadUrl)" +
                    "VALUES (" + "'"+post.articleId+"'," + "'"+attachList[i].attachName+"'," + "'"+attachList[i].attachDownloadUrl +"')";
                Data.update(attachSql);
            }
        }

        var result = Data.update(sql);

        return {
            status:result
        };
    }

    return {
        post: _post
    }

})();