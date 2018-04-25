(function(){
    /**
     * @param  request {data:[]}数组中为人员和团队ID
     * @param  script   请求的url
     * @returns {members: members} members[]为得到的所有人ID
     */
    function _post(request, script) {
        var sql = '';
        var members = [];
        var fetchData;
        if(request.data && request.data.length){
            request.data=request.data.filter(function(val){
               if(/^\d{8,10}/.test(val)){
                   members.push(val);
                   return false;
               }
               return true;
            });
            request.data.forEach(function(val,index){
                if(index){
                    sql+=" OR teamID='"+val+"'";
                }else{
                    sql+=" teamID='"+val+"'"
                }
            });
            fetchData = Data.fetch("SELECT uid from ued_sys_user_team WHERE"+sql);

            fetchData.data.forEach(function(val){
                members.push(val[0]);
            });

            return {
                members: members
            }
        }
        return {
            members: members
        }
    }

    return {
        post: _post
    }
})();