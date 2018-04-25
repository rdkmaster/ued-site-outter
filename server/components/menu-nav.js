/**
 * Created by 6396000843 on 2017/8/17.
 */
 var uedPath;
if (!uedPath) {
    uedPath = File.loadProperty('app/ued/ued.cfg').getProperty('ued_resource_path');
}

(function() {
    return function(request, script) {
        var path = uedPath + '/ued-resource/开发/menu.json';
        return File.readString(path);
    }
})();