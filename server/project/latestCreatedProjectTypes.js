/**
 * Created by 6176000041 on 2017/8/7.
 */
(function() {

    return function(request, script) {
        var types =[],
        a = Data.fetchWithDataSource("db.default","SELECT distinct b.MarketType FROM ued_project_keyword b");
        for(var i=0;i< a.data.length;i++){
            types.push(a.data[i][0])
        }
        return {
            data: types
        }
    }
})();