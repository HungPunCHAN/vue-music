//添加className方法
export function addClass(el, className){
	if(hasClass(el, className)){
		return
	}
	let newClass = el.className.split(' ')  //将className以空格拆开为数组
	newClass.push(className)
	el.className = newClass.join(' ')
}
//判断是否有className
export function hasClass(el, className){
	let reg = new RegExp('(^|\\s)'+ className + '(\\s|$)')
	return reg.test(el.className)
}

//获取自定义属性和值
export function getData(el, name, val) {
	const prefix = 'data-'
	name = prefix + name
	if(val){
		return el.setAttribute(prefix + name, val)
	}else{
		return el.getAttribute(name)
	}
} 

//封装css3属性兼容各浏览器写法  
let elementStyle = document.createElement('div').style

let vendor = (() => {
	let transformNames = {
		webkit: 'webkitTransform',
		Moz: 'MozTransform',
		O: 'OTransform',
		ms: 'msTransform',
		standard: 'transform'
	}

	for(let key in transformNames) {
		if(elementStyle[transformNames[key]] !== undefined){
			return key
		}
	}

	return false
})()

export function prefixStyle(style) {
	if(vendor === false) {
		return false
	}

	if(vendor === 'standard') {
		return style
	}

	return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}