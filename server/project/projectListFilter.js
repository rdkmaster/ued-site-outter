/**
 * Created by 6176000041 on 2017/7/28.
 */
(function () {
    var utils = require('$svr/util/util.js');
    var sqlString = require('$svr/project/projectListSql.js');

    /**
     * 功能: 根据 项目的ID, 返回已经授权项目列表;
     * @params uid 人员ID;
     * @return 此人员授权项目列表
     */

    return function (request, script) {

        var currentUser = utils.getCurrentUser();

        if (!currentUser) {
            return '请登录再使用'
        }

        var uid = utils.formatParamer(currentUser.uid), projects, a,keyword;

        var sql = sqlString.listSql(uid);

        if (!!request && !!request.keyword) {
            keyword = decodeURIComponent(request.keyword);
            a = Data.fetch(sql + " AND f.ProjectName LIKE '%"+keyword+"%'  ORDER BY f.UpdateTime desc");
            projects = utils.transformJson(a);
        }else if(!!request){
            a = Data.fetch(sql + " ORDER BY f.UpdateTime desc");
            projects = utils.transformJson(a);
        }

        return {
            data: projects
        };
    }
})();