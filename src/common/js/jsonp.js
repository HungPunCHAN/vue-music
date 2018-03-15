import originJSONP from 'jsonp'

//封装jsonp
export default function jsonp(url, data, option) {
	url += (url.indexOf('?')<0 ? '?' :'&') + param(data)
	//返回一个promise对象
	return new Promise((resolve, reject) => {
		originJSONP(url, option, (err, data) => {
			if(!err){
				resolve(data)
			} else {
				reject(err)
			}
		})
	})
}

/*
encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
*/
function param(data) {
	let url = '';
	for (var k in data){
		let value = data[k] !== undefined ? data[k] : '';
		url += `&${k}=${encodeURIComponent(value)}`
	}
	return url ? url.substring(1) : ''
}