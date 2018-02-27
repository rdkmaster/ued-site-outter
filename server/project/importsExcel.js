(function(){

    return function(){
        //TODO 文件必须为'xls'格式，表格内的内容也必须一致 "用户名", "用户工号"，"所属团队"
        //在xls中记得里面的 “工号” 要是设置成文本数字，不是数字，简单说就是字符串
        var a = File.readExcel("$svr/data/importList.xls",{"encoding":"UTF-8"});
        if(!a || !!(a.Sheel1 && a.Sheel1.length)){
            return "不是'xls'文件 或 文件内容为空"
        }
        var valueStr =a.Sheet1.slice(1).reduce(function(val,val1){
            var temp = val1.slice(0,3).join("','");
            val1 = "'" +temp+ "'";
            return val +'(' + val1+"),"
        },[]).slice(0,-1);
        var sql = "SET FOREIGN_KEY_CHECKS=0;";

        var sql1 = " DROP TABLE IF EXISTS `ued_sys_user`;";
            var sql2 = " CREATE TABLE  `ued_sys_user` ("
            + " `username` varchar(50) NOT NULL COMMENT '用户ID',"
            + " `uId` varchar(15) NOT NULL COMMENT '用户名',"
            + " `team` varchar(50) NOT NULL DEFAULT '' COMMENT '所属团队',"
            + " `mail` varchar(50) DEFAULT NULL COMMENT '邮箱',"
            + " `roles` varchar(50) DEFAULT NULL COMMENT '职位名称',"
            + " `state` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '1',"
            + " `lastLogin` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近登录时间',"
            + " `dept` varchar(64) DEFAULT NULL COMMENT '公司',"
            + " `phoneNumber` varchar(32) DEFAULT NULL COMMENT '电话号码',"
            + " `headPicture` varchar(255) DEFAULT NULL COMMENT '头像',"
            + " `sex` enum('1','0') DEFAULT NULL COMMENT '性别',"
            + " `vocation` varchar(32) DEFAULT NULL COMMENT '职业'"
    + " ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';"
        var sql3 = "INSERT INTO ued_sys_user(username,uId,team) VALUES " +valueStr;
        var a =  Data.update([sql,sql1,sql2,sql3]);

        var index;

        var teamData = Data.fetch("SELECT DISTINCT b.team FROM ued_sys_user AS b").data;
        teamData.forEach(function(val,ind){
           if(val[0] == "灵点"){
               index = ind
           }
        });
        if(!!index || index===0){
            teamData.splice(index,1)
        }
        teamData.unshift(['灵点']);
        teamData.push(['其它']);

        teamData.map(function(val,ind){

            var ordinalNumber = "T" +(1001+ind)

            return val.unshift(ordinalNumber);
        });

        var teamDataStr = teamData.reduce(function(val,val1){
            var temp = val1.join("','");
            val1 = "'" +temp+ "'";
            return val +'(' + val1+"),"
        },[]).slice(0,-1);

        var sql4 = " DROP TABLE IF EXISTS `ued_sys_team`;";
        var sql5 = "CREATE TABLE `ued_sys_team` ("
            + " `teamID` varchar(12) NOT NULL COMMENT '分组ID',"
            + " `teamName` varchar(100) NOT NULL COMMENT '分组名称',"
            + " `description` varchar(500) DEFAULT '' COMMENT '描述',"
            + " `status` tinyint(1) DEFAULT '1' COMMENT '0, 停用; 1, 启用',"
            + " PRIMARY KEY (`teamID`)"
            + " ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统-分组表';";
        var sql6 = "INSERT INTO ued_sys_team(teamID,teamName) VALUES " +teamDataStr;

        var b =  Data.update([sql,sql4,sql5,sql6]);

        var sql7 = " DROP TABLE IF EXISTS `ued_sys_user_team`;";
        var sql8 = "CREATE TABLE `ued_sys_user_team` ("
            +"  `uId` varchar(32) NOT NULL COMMENT '人员ID',"
            +"  `teamID` varchar(32) NOT NULL COMMENT '分组ID',"
            +"  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '‘1’为存在‘2’为不存在',"
            +"  KEY `PRIMARY KEY` (`uId`,`teamID`)"
            +") ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统-用户与分组关系表';"
        var sql9 = "INSERT INTO ued_sys_user_team(uId,teamID)"
            + " SELECT b.uId,a.teamID FROM ued_sys_team as a,ued_sys_user as b WHERE a.teamName = b.team"
        var c =  Data.update([sql,sql7,sql8,sql9]);
        return true

    }
})();