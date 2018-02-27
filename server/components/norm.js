/**
 * Created by 6396000843 on 2017/8/14.
 */

(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {

        //1.请求的方式获取文件
        //var url = encodeURI("http://localhost:4200/doc/ued-design/"+ request.name +".md");
        //var mdSource= Rest.get(url,null,option);
        //2.文件直接读取
        var componentMenuNav= request.name;

        var  sql = "select label,orderByNum,content from ued_component_menu_nav where menuId='"+ componentMenuNav.parent +"'";

        var parentMenu = utils.transformJson(Data.fetch(sql))[0];

        var parentFilePath = parentMenu.label+"["+ parentMenu.orderByNum +"]"+"["+ parentMenu.content +"]";
        var componentMenuFilePath =  componentMenuNav.label +"["+ componentMenuNav.name +"]"+"["+ componentMenuNav.orderByNum +"]"+"["+ componentMenuNav.content +"]";

        var configFile=File.loadProperty("app/ued/ued.cfg");
        var resourcePath=configFile.getProperty("ued_resource_path");
        var filePath = resourcePath + "/ued-resource/组件/"+ parentFilePath +"/"+ componentMenuFilePath +".md";

        var mdSource =File.readString(filePath);

        if(mdSource==""){
            componentMenuFilePath =  componentMenuNav.label +"["+ componentMenuNav.name +"]"+"["+ componentMenuNav.orderByNum +"]";
            filePath = resourcePath + "/ued-resource/组件/"+ parentFilePath +"/"+ componentMenuFilePath +".md";
            mdSource =File.readString(filePath)
        }

        //文件内容权限处理(不对外展示的:被注释掉的<!--xxx-->);  外部用户role="-1"
        var currentUser = utils.getCurrentUser();
        log(currentUser);
        if(currentUser!=null  && currentUser.role!="-1"){
            mdSource = mdSource.replace(/<!--[\w\W\r\n]*?-->/gmi,function(str){
                str =str.replace(/<!--/gmi,"");
                str =str.replace(/-->/gmi,"");
                return str;
            });
        }else{
            mdSource = mdSource.replace(/<!--[\w\W\r\n]*?-->/gmi,"");
        }

        return {
            data: mdSource
        }
    }
})();