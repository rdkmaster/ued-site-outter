(function(){
    var utils = require('$svr/util/util.js');
    return function(request, script){
        var currentUser =  utils.getCurrentUser(),uid,sql,result,oResult,fResult={
            collection: 0,
            subscribe: 0,
            download: 0,
            label: 0,
        };
        if(!currentUser){
            return '请登录再使用';
        }
        uid = utils.formatParamer(currentUser.uid);
        function  compareTime(start,end){//比较时间是否在同一天,同一天为true
            start = utils.timeFormat('yyyy-MM-dd',start);

            end = utils.timeFormat('yyyy-MM-dd',end);
            return start.indexOf(end)===-1?false:true;
        }
        sql = "SELECT * from ued_project_guidance where uid='"+uid+"'";

        //yyyy-MM-dd hh-mm-ss 区分大小写;M表示月，m表示分，其它都小写

        // Data.update("UPDATE ued_project_guidance set lasttime = '"+utils.timeFormat('yyyy-MM-dd hh-mm-ss',new Date())+"' WHERE uid = '6176000041'")
        result = Data.fetch(sql);
        result = utils.transformJson(result);

        if(!result.length){
            fResult.collection=1;
        }else{
            oResult = result[0];
            if(oResult.subscribe==='0'){
                if(!compareTime(new Date(oResult.lasttime),new Date())){
                    fResult.subscribe=1;
                }
            }else if(oResult.download==='0'){
                if(!compareTime(new Date(oResult.lasttime),new Date())){
                    fResult.download=1;
                }
            }else if(oResult.label==='0'){
                if(!compareTime(new Date(oResult.lasttime),new Date())){
                    fResult.label=1;
                }
            }
        }
        return fResult;

    };
})();