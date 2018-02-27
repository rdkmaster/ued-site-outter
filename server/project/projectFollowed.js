(function() {
    var utils = require('$svr/util/util.js');
    function _post(request, script) {

        var currentUser =  utils.getCurrentUser();
        if(!currentUser){
            return '请登录再使用'
        }
        var uId = utils.formatParamer(currentUser.uid);


        if(!request.data.SerialNum) {
            return "请传递参数: SerialNum";
        }
        var SerialNum = utils.formatParamer(request.data.SerialNum);
        var state = request.data.state;
        var sql = "SELECT * FROM ued_favorite_record b WHERE b.SerialNum = '"+SerialNum+"' and b.uId = '"+uId+"'";
        var a = Data.fetchWithDataSource("db.default",sql)
        if(!a.data.length){
            sql="insert into ued_favorite_record (SerialNum,uId,time,state) VALUES ( '"+SerialNum+"','"+uId+"',null,'"+Number(state)+"')";
            Data.update(sql);
        }else{
           sql ="UPDATE ued_favorite_record as b SET state = '"+Number(state)+"' WHERE b.SerialNum = '"+SerialNum+"' and b.uId = '"+uId+"'"
            Data.update(sql)
        }

    }
    return {
        post: _post
    }
})();