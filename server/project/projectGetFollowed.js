(function() {
    var utils = require('$svr/util/util.js');
    return function (request, script) {
        var currentUser =  utils.getCurrentUser();
        if(!currentUser){
            return '请登录再使用'
        }

        if(!request.SerialNum) {
            return "请传递参数: SerialNum";
        }
        var results;
        var uId = utils.formatParamer(currentUser.uid);
        var SerialNum = utils.formatParamer(request.SerialNum);
        var sql = "SELECT * FROM ued_favorite_record b WHERE b.SerialNum = '"+SerialNum+"' and b.uId = '"+uId+"'";
        var a = Data.fetchWithDataSource("db.default",sql);
        if(a.data.length){
            a.header.forEach(function(value,index,arr){
                if(value == "state"){
                    results = a.data[0][index];
                }
            })
        }else {
            results = 0;
        }
        return {
            data: results
        }
    }
})();