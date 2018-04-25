(function() {
    var utils = require('$svr/util/util.js');
    function _post(request, script) {
        if(typeof request!=='string'){
            return '传参格式不对';
        }
        request=utils.qs(request);
        log(request);
        if(!request.uid){
            return '请传参数： uid';
        }
        var uid = utils.formatParamer(request.uid);

        if(!request.SerialNum) {
            return "请传递参数: SerialNum";
        }
        var SerialNum = utils.formatParamer(request.SerialNum);
        var sql = "SELECT * FROM ued_project_subscription b WHERE b.SerialNum = '"+SerialNum+"' and b.uId = '"+uid+"'";
        var a = Data.fetchWithDataSource("db.default",sql);
        if(!a.data.length){
            sql="insert into ued_project_subscription (SerialNum,uId,time) VALUES ( '"+SerialNum+"','"+uid+"',null)";
            a = Data.update(sql);
            return a
        }
        return a;
    }
    return {
        post: _post
    };
})();