/**
 * Created by 6396000843 on 2017/8/31.
 */

(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {
        var uid = request.uid;
        var  sql = "SELECT articleId as serialNum,title,subTitle,headPicture,type,createdate,updatedate,status from ued_article where uid='"+ uid +"' order by updatedate desc";

        var postList = Data.fetch(sql);
        postList=utils.transformJson(postList);
        //表格数据格式
        //postList.header=["id","标题","类型","创建时间","发布状态"];
        return postList
    }
})();