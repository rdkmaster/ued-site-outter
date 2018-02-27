/**
 * Created by 6396000843 on 2017/8/17.
 */
(function() {
    return function(request, script) {
        var sql = "select a.*,b.label as parentLabel,b.orderByNum as parentOrder  from  ued_component_menu_nav as a LEFT JOIN ued_component_menu_nav as b  on a.parent=b.menuId ORDER BY level,orderByNum"
        //var sql = "select * from  ued_component_menu_nav ORDER BY level,orderByNum";
        var menuLists = Data.fetch(sql);
        menuLists=transformJson(menuLists);
        return menuLists
    }
})();