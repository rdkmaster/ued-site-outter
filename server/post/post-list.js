/**
 * Created by 6396000843 on 2017/8/31.
 */

(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var sql="";
        if(request.category=="all"){
            sql = "SELECT articleId as serialNum,t.title,t.subTitle,t.headPicture,t.type,t.content,t.author,t.uid,t.createdate,t.updatedate,u.headPicture as userHeadPicture " +
                "from ued_article as t,ued_user as u " +
                "where t.status='1' " +
                "and type<>'ux内部' "+
                "and t.uid=u.uid order by createdate desc";
        }else{
            sql = "SELECT articleId as serialNum,t.title,t.subTitle,t.headPicture,t.type,t.content,t.author,t.uid,t.createdate,t.updatedate,u.headPicture as userHeadPicture " +
                "from ued_article as t,ued_article_category,ued_user as u " +
                "where type=categoryLabel and categoryName='"+ request.category +
                "' and t.status='1' and t.uid=u.uid order by createdate desc";
        }
        var postList = Data.fetch(sql);
        postList=utils.transformJson(postList);
        return postList
    }
})();