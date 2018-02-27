/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    var utils = require('$svr/util/util.js');
    function _post(request, script) {
        var post = request.data;
        if(post.status==undefined){
            post.status=1;
        }

        var sql = "insert into ued_article(title,subTitle,headPicture,type,content,author,uid,createdate,updatedate,status,VisitRecord) " +
            "VALUES ( " +
            "'"+post.title+"'," +
            "'"+post.subTitle+"'," +
            "'"+post.headPicture+"'," +
            "'"+post.type+"'," +
            "'"+post.content+"'," +
            "'"+post.author+"'," +
            "'"+post.uid+"'," +
            "'"+post.createdate+"'," +
            "'"+post.createdate+"'," +
            "'"+ post.status +"',0)";
        var sqlId="select max(articleId) as id from ued_article";

        var result = Data.update(sql);
        var article = Data.fetch(sqlId);
        var articleId = utils.transformJson(article)[0].id;

        if(post.attachment!=null || attachment!=''){
            var attachList = JSON.parse(post.attachment);
            for(var i= 0,len=attachList.length; i<len; i++){
                var attachSql="insert into ued_article_attach(articleId,attachName,attachDownloadUrl)" +
                    "VALUES (" + "'"+articleId+"'," + "'"+attachList[i].attachName+"'," + "'"+attachList[i].attachDownloadUrl +"')";

                Data.update(attachSql);
            }
        }

       // return Data.batchFetchWithDataSource("db.default",sqlArr);
       // return Data.fetchWithDataSource("db.default",sql);
        return {
            status:result,
            articleId:articleId
        };
    }

    return {
        post: _post
    }

})();