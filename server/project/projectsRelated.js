(function(){

    var sqlString = require('$svr/project/projectListSql.js');

    var utils = require('$svr/util/util.js');

    return function(request, script){
        var currentUser =  utils.getCurrentUser();

        if(!currentUser){
            return '请登录再使用'
        }

        var uid = utils.formatParamer(currentUser.uid)

        var keyword = decodeURIComponent(request.keyword);
        var projectRelated = [];
        if(keyword !== ""){
            var  sql =  "SELECT * from "
                +" (" +sqlString.listSql(uid)+ ")"
                +"as g WHERE g.ProjectName LIKE '%"+keyword+"%'";
            var c = Data.fetch(sql);

            projectRelated = utils.transformJson(c);
        }

        return {
            data: projectRelated
        }

    }

})()