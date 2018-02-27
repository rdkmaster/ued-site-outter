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
    return {
        formatParamer: _formatParamer,
		transformJson:_transformJson,
        transformMax: _transformMax,
		getCurrentUser:_getCurrentUser,
		removeCurrentUser:_removeCurrentUser
    }
})();