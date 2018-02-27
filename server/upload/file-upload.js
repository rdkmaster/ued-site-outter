/**
 * Created by 6396000843 on 2017/9/18.
 *
 * 功能：提供UED文件上传接口
 */
(function() {
    function _post(request, script) {
        log("file upload...............");
        log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");


        //File.loadProperty("app/ued/ued.cfg");
        var data=new Date().format("yyyy/MM/dd");

        var uid="6176000041"; //6176000041  6396000843
        var a=File.save("app/upload/files/"+data+"/test2.txt",request.files);
        var a=File.save("app/upload/images/head/"+data+"/test3.txt",request.file);
        var a=File.save("app/upload/images/head/"+uid.toString().substr(-3, 3)+"/u"+uid+".txt",request);

        return Request.getContextHeader()
    }
    return {
        post: _post
    }
})();