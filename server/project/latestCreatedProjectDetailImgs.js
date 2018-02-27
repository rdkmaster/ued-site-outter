/**
 * Created by 6176000041 on 2017/8/1.
 */
(function() {

    return function(request, script) {
        var sql="";
        if(!!request.id){
            sql="select * from xplan_prototype_images where SerialNum ="+JSON.stringify(request.id);
        }
        var b = Data.fetchWithDataSource("db.default",sql);
        var projectDetailImgs = [];
        for(var i=0;i< b.data.length;i++){
            if(b.data[i][3] == 1){
                projectDetailImgs.push(b.data[i][1])
            }
        }
        return {
            data: projectDetailImgs,
        } ;
    }
})();