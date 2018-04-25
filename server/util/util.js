(function() {

	/**
	 * [_formatURL 去掉SQL 参数中的非法字符; 主要出于安全考虑]
	 * @param  {[type]} params [待处理的参数]
	 * @return {[type]}        [去掉非法字符的参数.]
	 */
	function _formatParamer(param) {
		// 空值直接返回.
		if(!param) return "";

		// 安全校验过滤
    	return String(param).replace(/<|>|\'/g,"");
	}

	function _transformJson(rdkData){
		var result = [];
		rdkData.data.forEach(function(rowData){
			var item = {};
			rdkData.field.forEach(function(rowDataField,index){
				item[rowDataField] = rowData[index];
			});
			result.push(item);
		});
		return result;
	}
    function sequence(a,b){
		if (a>b) {
			return -1;
		}else if(a<b){
			return 1
		}else{
			return 0;
		}
	}
	function _transformMax(arr,begin){
		if(Object.prototype.toString.call(arr)=='[object Array]'){
		arr.forEach(function(val,index){
			arr[index] = parseInt(val.slice(begin));
		})
		var arr=arr.sort(sequence);
		return arr[0];
        }else{
			return "第一个参数要为数组"
		}
	}

	function _getCookie(cookie,name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=cookie.match(reg)){
			return unescape(arr[2]);
		}
		return null;
	}

	function _getCurrentUser(){
		var reqHeader=Request.getContextHeader();
		log(reqHeader);
		var cookie = reqHeader && reqHeader.Cookie;
		if(!cookie){
			return null;
		}
		var tokenVal = _getCookie(cookie,"token");
		log(tokenVal);
		return tokenVal && Cache.aging.get(tokenVal)
	}

	function _removeCurrentUser(){
		var reqHeader=Request.getContextHeader();
		var cookie = reqHeader && reqHeader.Cookie;
		if(!cookie){
			return null;
		}
		var tokenVal = _getCookie(cookie,"token");
		tokenVal && Cache.aging.del(tokenVal)
	}

    /**
     * @param fmt 格式化 如：yyyy-MM-dd hh-mm-ss 注意区分大小字
     * @param date 日期
     * @returns 格式化后的样式
     * @private
     */
	function _timeFormat(fmt,date){
            var o = {
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt;
    }

    /**
	 *
     * @param str attr1=value1&attr2=value2 这样结构的字符串，键值对字符串
     * @returns {} 字符串转对象 {attr1:value1,attr2: value2}
     * @private	 格式化请求参数
     */
	function _qs(str){
		if(typeof str!=='string'){
			return str;
		}else{
            var obj = {},arr = str.split('&'),tem;
            arr.forEach(function(val){
                tem = val.split('=');
                obj[tem[0]] = tem[1];
            });
            return obj;
		}

	}
    return {
        formatParamer: _formatParamer,
		transformJson:_transformJson,
        transformMax: _transformMax,
		getCurrentUser:_getCurrentUser,
		removeCurrentUser:_removeCurrentUser,
		qs:_qs,
        timeFormat: _timeFormat
    };
})();