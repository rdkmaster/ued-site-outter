(function(){
    function _listSql(){

        // var sql1 = "SELECT  * from ued_sys_user_team a where a.uId = '"+uid+"' AND a.teamID = 'T1001'";
        // var b = Data.fetch(sql1);
        //
        // var sql = "SELECT * FROM (SELECT"
        //     + " *"
        //     + " FROM"
        //     + " xplan_project_info t"
        //     + " WHERE"
        //     + " t.creatorId = '"+uid+"' or"
        //     + " t.SerialNum IN ("
        //     + " SELECT"
        //     + " t.resourcesID"
        //     + " FROM"
        //     + " ued_sys_role_privilege t"
        //     + " WHERE"
        //     + " t.roleID IN ("
        //     + " SELECT"
        //     + " b.teamID"
        //     + " FROM"
        //     + " ued_sys_user_team b"
        //     + " WHERE"
        //     + " b.uId = '"+uid+"'"
        //     + "     )"
        //     + " )"
        //     + " UNION"
        //     + " SELECT"
        //     + " *"
        //     + " FROM"
        //     + " xplan_project_info t"
        //     + " WHERE"
        //     + " t.SerialNum IN ("
        //     + " SELECT"
        //     + " p.resourcesID"
        //     + " FROM"
        //     + " ued_sys_role_privilege p"
        //     + " WHERE"
        //     + " p.roleID = '"+uid+"')) as f WHERE LENGTH(f.SerialNum) <= 16";

        var sql1 = "SELECT * FROM xplan_project_info as f WHERE LENGTH(f.SerialNum) <= 16";

        // var result = b.data.length >0 ? sql1 : sql;


        return sql1;
    }
    return{
        listSql: _listSql
    }
})()