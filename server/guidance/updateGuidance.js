(function(){
    var utils = require('$svr/util/util.js');
    function _post(request, script){
        request = request.data;
        var uid,sql,sql1,sql2,result,currentUser =  utils.getCurrentUser();
        if(!currentUser){
            return '请登录再使用';
        }
        uid = utils.formatParamer(currentUser.uid);
        sql = "INSERT INTO ued_project_guidance ("+
            " uid,"+
            " collection,"+
            " subscribe,"+
            " download,"+
            " label) "+
            " VALUES ";
        if(request.collection===1){
            sql1 = "('"+uid+"',1,0,0,0)";
            result=Data.update(sql+sql1);
            return result;
        }else if(request.subscribe===1){
            sql2 = "UPDATE ued_project_guidance set collection = 1,subscribe=1,download=0,label=0 WHERE uid = '"+uid+"'";
        }else if(request.download===1){
            sql2 = "UPDATE ued_project_guidance set collection = 1,subscribe=1,download=1,label=0 WHERE uid = '"+uid+"'";
        }else{
            sql2 = "UPDATE ued_project_guidance set collection = 1,subscribe=1,download=1,label=1 WHERE uid = '"+uid+"'";
        }

        result=Data.update(sql2);

        return result;
    };
    return {
        post: _post
    }
})();