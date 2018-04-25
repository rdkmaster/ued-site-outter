/**
 * Created by 6396000843 on 2017/8/14.
 */

var resourcePath;
if (!resourcePath) {
    resourcePath = File.loadProperty("app/ued/ued.cfg").getProperty("ued_resource_path") + "/ued-resource/开发/";
}


(function() {
    var utils = require('$svr/util/util.js');
    return function(request, script) {

        var contentPath = resourcePath + request.content;
        var mdSource = File.readString(contentPath);
        //文件内容权限处理(不对外展示的:被注释掉的<!--xxx-->);  外部用户role="-1"
        var currentUser = utils.getCurrentUser();
        log(currentUser);
        if (currentUser != null && currentUser.role != "-1") {
            mdSource = mdSource.replace(/<!--[\w\W\r\n]*?-->/gmi,function(str){
                str = str.replace(/<!--/gmi,"");
                str = str.replace(/-->/gmi,"");
                return str;
            });
        } else {
            mdSource = mdSource.replace(/<!--[\w\W\r\n]*?-->/gmi,"");
        }

        return mdSource
    }
})();