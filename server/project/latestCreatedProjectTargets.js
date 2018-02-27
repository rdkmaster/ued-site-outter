/**
 * Created by 6176000041 on 2017/8/4.
 */
(function() {

    return function(request, script) {
        var targets=[],
            target,
            name=JSON.stringify(request.target),
            a = Data.fetchWithDataSource("db.default","SELECT xplan_project_info.* FROM ued_project_keyword , xplan_project_info WHERE ued_project_keyword.MarketType =" + name + " AND xplan_project_info.SerialNum=ued_project_keyword.SerialNum"),
            lena=a.data.length,
            lenas= a.header.length;
        for(var i=0; i<lena;i++){
            target={};
            for(var k=0;k<lenas;k++){
                target[a.header[k]]=a.data[i][k];
            }
            targets.push(target);
        }
        return {
            data: targets
        }
    }
})();