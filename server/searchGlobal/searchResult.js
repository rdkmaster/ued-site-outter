/**
 * Created by 6176000041 on 2017/9/15.
 */
(function() {
    var utils = require('$svr/util/util.js');
    var sqlString = require('$svr/project/projectListSql.js');

    /**
    * 功能 全局搜索，返回符合条件的所有数据
    * @params keyword   搜索的关键字
    * @return 返回 符合条件的所有数据，是个对象，分三个类，分别为： 项目、组件、文章
    */

    return function(request, script) {
        if(!request.keyword){
            return {
                menus: [],
                articles: [],
                projects: []
            };
        }
        var keyword = utils.formatParamer(request.keyword);
        var sql = "SELECT * FROM ued_component_menu_nav AS a WHERE a.label LIKE '%"+keyword+"%' OR a.name LIKE '%"+keyword+"%'";
        var a = Data.fetch(sql);
        var _menus = utils.transformJson(a);
        var  sql2 = "SELECT * FROM ued_article AS a WHERE a.title LIKE '%"+keyword+"%' OR a.subTitle LIKE '%"+keyword+"%'";
        var b = Data.fetch(sql2);
        var _articles = utils.transformJson(b);

        var currentUser =  utils.getCurrentUser();

        if(!currentUser){
            var _projects = [];
        }else{
            var uid = currentUser.uid;
            var  sql3 =  "SELECT * from "
                +" (" +sqlString.listSql(uid)+ ")"
                +"as g WHERE g.ProjectName LIKE '%"+keyword+"%'";
            var c = Data.fetch(sql3);
            var _projects = utils.transformJson(c);
        }
        return {
            menus: _menus,
            articles: _articles,
            projects: _projects
        }
    }
})();