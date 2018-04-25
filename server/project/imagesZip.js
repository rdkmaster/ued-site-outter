(function() {
    var utils = require('$svr/util/util.js');
    var configFile=File.loadProperty("app/ued/ued.cfg");
    return function(request, script) {
        var resourcePath=configFile.getProperty("ued_resource_path");
        var rdkPath=configFile.getProperty("ued_site_path");
        if(!request.name) {
            return "请传递参数: name";
        }
        var name = utils.formatParamer(decodeURIComponent(request.name));

        var name1 ="效果图-" + name.replace(/\[.+\]/,"");
        var a = resourcePath+"/ued-resource/项目/"+name+"/3效果图";
        var result = Shell.execute("sh "+rdkPath+"/rdk/app/ued/build/scripts/zip.sh "+a+" "+name1, 1);
         return !!result?true:false;
    };

})();

