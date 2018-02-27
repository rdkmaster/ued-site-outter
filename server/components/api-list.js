/**
 * Created by 6396000843 on 2017/9/6.
 */
(function() {
    return function(request, script) {
        var sql = "select * from ued_component_menu_api where parentName='" + request.menuName +"'";
        var apiLists = Data.fetch(sql);
        apiLists=transformJson(apiLists);
        return {
            data:apiLists
        }
    }
})();