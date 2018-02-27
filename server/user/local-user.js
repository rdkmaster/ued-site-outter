/**
 * Created by 6396000843 on 2017/8/31.
 */

(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {

        var  sql = "SELECT email,headPicture,phoneNumber,company,vocation from ued_user where uid='"+ request.uid +"'";

        var postList = Data.fetch(sql);

        postList=utils.transformJson(postList);
        //表格数据格式
        //postList.header=["id","标题","类型","创建时间","发布状态"];
        return postList
    }
})();