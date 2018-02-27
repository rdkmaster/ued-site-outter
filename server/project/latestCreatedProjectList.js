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


        var  projects, a, b = 12;

        var sql = sqlString.listSql();
        if (!!request && !!request.nums) {
            a = Data.fetch(sql + " ORDER BY f.UpdateTime desc limit " + (request.nums - (request.nums % b == 0 ? b : request.nums % b)) + "," + (request.nums % b == 0 ? b : request.nums % b));
            projects = utils.transformJson(a);
        } else {
            a = Data.fetch(sql + " ORDER BY f.UpdateTime desc");
            projects = utils.transformJson(a);

        }

        return {
            data: projects
        };
    }
})();