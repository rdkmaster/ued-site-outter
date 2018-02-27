/**
 * Created by 6396000843 on 2017/9/8.
 */
(function() {
    var utils = require('$svr/util/util.js');
    function _post(request, script) {
        var authUser={};
        var requestUser=request.user;
        if(request.version=="outward"){  //外部版本登陆,自己注册用户，查询本机服务数据库
            if(requestUser.userID=="uxadmin"){
                authUser.tokens="test-outward-login";
                authUser.status="1";
                authUser.contents={  //返回一个测试用户
                    dept: "",
                    mail: "",
                    message: "登陆成功",
                    name:"uxadmin",
                    roleId: "",
                    roles: "-1", //注册时把用户角色全设为-1
                    team: "",
                    uid: "uxadmin"
                }
            }else {
                authUser.status="0";
                authUser.contents={  //返回一个测试用户
                    dept: "",
                    mail: "",
                    message: "对外登陆暂未实现..",
                    name:"",
                    roleId: "",
                    roles: "-1", //注册时把用户角色全设为-1
                    team: "",
                    uid: ""
                }
            }
        }else{ //内部版本登陆，

            if(requestUser.userID=="20150828"){ //测试用户
                authUser.tokens="test-user";
                authUser.status="1";
                authUser.contents={  //返回一个测试用户
                    dept: "",
                    mail: "",
                    message: "",
                    name:"testUser",
                    roleId: "",
                    roles: "99", //注册时把用户角色全设为-1
                    team: "vmax-o",
                    uid: "12345678"
                }
            }else{  //公司接口验证工号
                var userLoginURL = 'http://10.9.233.35:80/xplan/common/authentication';
                authUser = Rest.post(userLoginURL,requestUser);
                authUser =JSON.parse(authUser);
            }
            var sysUser = Data.fetch("SELECT * from ued_sys_user_team where teamId='T1001'");
            var sysUserArr=utils.transformJson(sysUser);
            authUser.contents.roles="99"; // roles : 内部用户99,外部用户,游客-1
            sysUserArr.forEach(function(user){
                if(authUser.contents.uid==user.uId){
                    authUser.contents.roles="199"; //ux灵点团队,特殊用户 roles:199
                }
            });
            //默认头像来源公司接口
            //http://zmail.zte.com.cn/Mapi/image/head/m${size || 1}/${uid.toString().substr(-3, 3)}/u${uid}.jpg
            authUser.contents.headPicture="http://zmail.zte.com.cn/Mapi/image/head/m1/"+ authUser.contents.uid.toString().substr(-3, 3) +"/u"+ authUser.contents.uid +".jpg";
            //首次工号登陆将此用户插入数据库
            var queryUser = "SELECT email,headPicture,phoneNumber,sex,company,vocation from ued_user where uid='"+ authUser.contents.uid +"'";
            var user = Data.fetch(queryUser);
            user=utils.transformJson(user);

            if(user.length==0){
                var sql = "insert into ued_user(uid,username,email,sex,phoneNumber,company,vocation,headPicture)" +
                    "VALUES ( " +
                    "'"+authUser.contents.uid+"'," +
                    "'"+authUser.contents.name+"'," +
                    "'"+authUser.contents.mail+"'," +
                    "''," +
                    "''," +
                    "''," +
                    "''," +
                    "'"+authUser.contents.headPicture +"')";
                    Data.update(sql);
            }else{
                //查询用户信息 --个人信息修改保存后数据库中的信息
                authUser.contents=_shallowCopy(authUser.contents,user[0])
            }
        }

         function _shallowCopy(target, source) {
            for (var key in source) {
                if(source[key]!=''){
                    target[key] = source[key];
                }
            }
            return target;
         }

        //保存当前登录用户

        Cache.aging.put(authUser.tokens,authUser.contents || null,3600*24*30);
        return authUser;
    }

    return {
        post: _post
    }

})();