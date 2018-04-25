(function() {
    var resourcePath,rdkPath,name,name1,a,result,utils,configFile;
    utils = require('$svr/util/util.js');
    configFile=File.loadProperty("app/ued/ued.cfg");
    return function(request, script) {
         resourcePath=configFile.getProperty("ued_resource_path");
         rdkPath=configFile.getProperty("ued_site_path");
        if(!request.name) {
            return "请传递参数: name";
        }

        name = utils.formatParamer(decodeURIComponent(request.name));
        name1 ="原型-"+ name.replace(/\[.+\]/,"");
        a = resourcePath+"/ued-resource/项目/"+name+"/2原型";
        result = Shell.execute("sh "+rdkPath+"/rdk/app/ued/build/scripts/zip.sh "+a+" "+name1, 1);

        return !!result?true:false;
    };

})();
