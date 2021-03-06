(function (webnian) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = webnian()
	} else {
		window.utils = webnian()
	}

})(function () {
	function addClass(ele, cls) {
		if (!hasClass(ele, cls)) ele.className += ' ' + cls
	}

	function isName(name) {
		return (/^[a-zA-Z\u4e00-\u9fa5]{0,30}$/).test(name)
	}

	function isMobile(n) {
		return (/^1(3|4|5|7|8)\d{9}$/).test(n)
	}

	function isChinese(str) {
		return (/^[\u4e00-\u9fa5]+$/).test(str)
	}

	function isIdNum(num) {
		num = num.toString().toUpperCase();
		if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) return false
		var len = num.length, re;
		if (len == 15) {
			re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
			var arrSplit = num.match(re)
			var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
			if (!(dtmBirth.getYear() == Number(arrSplit[2])
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
				&& dtmBirth.getDate() == Number(arrSplit[4]))) {
				return false
			} else {
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
				var nTemp = 0, i;
				num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
				for (i = 0; i < 17; i++) {
					nTemp += num.substr(i, 1) * arrInt[i]
				}
				num += arrCh[nTemp % 11]
				return true
			}
		}

		if (len == 18) {
			re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
			var arrSplit = num.match(re);
			var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
			if (!(dtmBirth.getFullYear() == Number(arrSplit[2])
				&& (dtmBirth.getMonth() + 1) == Number(arrSplit[3])
				&& dtmBirth.getDate() == Number(arrSplit[4]))) {
				return false
			} else {
				var valnum;
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
				var nTemp = 0, i;
				for (i = 0; i < 17; i++) {
					nTemp += num.substr(i, 1) * arrInt[i]
				}
				valnum = arrCh[nTemp % 11]
				if (valnum != num.substr(17, 1)) {
					return false
				}
				return true
			}
		}
		return false
	}

	function isEmail(str) {
		return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
	}

	function getUrlQueryString(url) {
		var reg = new RegExp("(^|&)" + url + "=([^&]*)(&|$)", "i");
		var arr = window.location.hash.split('?')
		var r = arr.length > 1 ? arr[1].match(reg) : null
		return r ? decodeURIComponent(r[2]) : ''
	}

	function copyObject(obj) {
		var result = {}
		for (var i in obj) {
			result[i] = (typeof obj[i]) == 'object' ? copyObject(obj[i]) : obj[i]
		}
		return result
	}

	function linkTo(url) {
		var a = document.createElement('a')
		a.href = url
		a.target = '_blank'
		a.click()
	}

	function download(url, param) {
		url = url + '?'
		for (var i in param) {
			url += i + '=' + param[i] + '&'
		}
		var a = document.createElement('a')
		a.href = url
		a.target = '_blank'
		//a.download = fileName
		a.click()
	}

	function toDouble(n) {
		return n.toString()[1] ? n : '0' + n
	}

	function getBirthdayById(id, split) {
		if (!this.isIdNum(id)) return
		var tmpStr = ''
		var split = split || '-'
		id = id.toString()
		if (id.length == 15) {
			tmpStr = "19" + id.substring(6, 12)
			tmpStr = tmpStr.substring(0, 4) + split + tmpStr.substring(4, 6) + split + tmpStr.substring(6)
		} else {
			tmpStr = id.substring(6, 14)
			tmpStr = tmpStr.substring(0, 4) + split + tmpStr.substring(4, 6) + split + tmpStr.substring(6)
		}
		return tmpStr
	}

	function getGenderById(id) {
		if (!this.isIdNum(id)) return ''
		id = id.toString()
		if (id.length === 18) {
			return id.substr(16, 1) % 2 == 1 ? 1 : 2
		} else if (id.length === 15) {
			return id.substr(14, 1) % 2 == 1 ? 1 : 2
		}
	}

	function birthDayAge(birth) {
		if (!birth) return ''
		if (birth) {
			var dis = new Date().getFullYear() - new Date(birth).getFullYear()
			var disM = new Date().getMonth() - new Date(birth).getMonth()
			var disD = new Date().getDate() - new Date(birth).getDate()
			if (dis < 0) return ''
			if (dis == 0) {
				if (disM == 0) {
					return disD >= 0 ? 0 : ''
				} else {
					return disM > 0 ? dis : ''
				}
			} else if (dis > 0) {
				if (disM == 0) {
					return disD >= 0 ? dis : dis - 1
				} else {
					return disM > 0 ? dis : dis - 1
				}
			}
		}
	}

	function mix(o, n) {
		var obj = o || {}
		for (var i in n) {
			if (n.hasOwnProperty(i) && !o.hasOwnProperty(i)) o[i] = n[i]
		}
		return obj
	}

	function cleanHtml(html) {
		return html.replace(/<\/?[^>]*>/ig, '').replace(/&nbsp;/ig, '')
	}

	function random(str, end) {
		return Math.random() * (end - str) + str
	}

	function date(date, format) {
		var date = new Date(date)
		var obj = {
			yyyy: date.getFullYear(),
			yy: date.getFullYear().toString().substring(2),
			MM: toDouble(date.getMonth() + 1),
			M: date.getMonth() + 1,
			dd: toDouble(date.getDate()),
			d: date.getDate(),
			hh: toDouble(date.getHours()),
			mm: toDouble(date.getMinutes()),
			ss: toDouble(date.getSeconds()),
			h: date.getHours(),
			m: date.getMinutes(),
			s: date.getSeconds()
		}
		format || (format = "yyyy-MM-dd hh:mm:ss")
		return format.replace(/[a-z]+/ig, function (n) {
			return obj[n]
		})
	}

	function scroll() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
		return { scrollTop: scrollTop, scrollLeft: scrollLeft }
	}

	function getStyle(ele, attr) {
		var style = window.getComputedStyle ? window.getComputedStyle(ele, null) : ele.currentStyle
		return style[attr]
	}

	function setCookie(obj) {
		// var str = encodeURIComponent(obj.name) + '=' + encodeURIComponent(obj.value)
		var str = (obj.name) + '=' + (obj.value)
		if (obj.expires) {
			var date = new Date()
			date.setDate(date.getDate() + obj.expires)
			str += ';expires=' + date
		}
		if (obj.path) {
			str += ';path=' + path
		}
		if (obj.domain) {
			str += ';demain=' + domain
		}
		if (obj.secure) {
			str += ';' + secure
		}
		document.cookie = str
	}

	function getCookie(name) {
		var arr = document.cookie ? decodeURIComponent(document.cookie).split('; ') : []
		for (var i in arr) {
			var arr2 = arr[i].split('=')
			if (arr2.length >= 2) {
				if (arr2[0] == name) return arr2[1]
			}
		}
		return ''
	}

	function removeCookie(name) {
		setCookie(name, 1, -1)
	}

	function ajax(obj) {
		obj.method = obj.method ? obj.method.toUpperCase() : 'POST'
		obj.async = obj.async || true
		obj.data = obj.data || null
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
		var params = []
		for (var i in obj.data) {   //特殊字符传参产生的问题使用encodeURIComponent()编码处理
			params.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj.data[i]))
		}
		var data = params.join('&')
		if (obj.method == 'GET') {
			xhr.open(obj.method, obj.url + '?' + data, obj.async)
		} else if (obj.method == 'POST') {
			xhr.open(obj.method, obj.url, obj.async)
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
			xhr.send(data)
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					obj.success && obj.success(xhr)
				} else {
					obj.error && obj.error(xhr)
				}
			}
		}
	}

	function scrollUnique(ele) {
		var type = document.mozHidden ? 'DOMMouseScroll' : 'mousewheel'
		ele.addEventListener(type, function (e) {
			var scrollTop = this.scrollTop,
				scrollHeight = this.scrollHeight,
				height = this.clientHeight,
				e = e || event;
			var delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0)
			if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
				this.scrollTop = delta > 0 ? 0 : scrollHeight
				e.preventDefault()
			}
		})
	}

	function querySelector(name) {
		if (!getElements) var getElements = {}
		return getElements[name] = getElements[name] || document.querySelectorAll(name)
	}

	function arrayEqual(arr1, arr2) {
		if (arr1 === arr2) return true
		if (arr1.length != arr2.length) return false
		for (var i = 0, len = arr1.length; i < len; i++) {
			if (arr1[i] !== arr2[i]) return false
		}
		return true
	}

	function hasClass(ele, cls) {
		return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className)
	}

	function removeClass(ele, cls) {
		if (!hasClass(ele, cls)) return
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
		ele.className = ele.className.replace(reg, '')
	}

	function offset(ele) {
		var pos = { left: 0, top: 0 }
		while (ele) {
			pos.left += ele.offsetLeft
			pos.top += ele.offsetTop
			ele = ele.offsetParent
		}
		return pos
	}

	function requestFullscreen(ele) {
		var docElm = document.documentElement
		ele.addEventListener("click", function () {
			if (docElm.requestFullscreen) {
				ele.requestFullscreen()
			} else if (docElm.msRequestFullscreen) {
				ele.msRequestFullscreen()
			} else if (docElm.mozRequestFullScreen) {
				ele.mozRequestFullScreen()
			} else if (docElm.webkitRequestFullScreen) {
				ele.webkitRequestFullScreen()
			}
		}, false)
	}

	function fullScreenStatus() {
		return document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || window.ieIsfSceen
	}

	function cancelFullScreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen()
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen()
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen()
		}
	}

	function onFullScreenEvent(callback) {
		document.addEventListener('fullscreenchange', function () {
			callback(fullScreenStatus())
		}, false)
		document.addEventListener('mozfullscreenchange', function () {
			callback(fullScreenStatus())
		}, false)
		document.addEventListener('webkitfullscreenchange', function () {
			callback(fullScreenStatus())
		}, false)
		document.addEventListener('msfullscreenchange', function () {
			callback(fullScreenStatus())
		}, false)
	}

	function camelCase(str) {
		return str.replace(/-+(.)?/g, function (match, chr) { return chr ? chr.toUpperCase() : '' })
	}

	function contains(parent, node) {
		if (document.documentElement.contains) {
			return parent !== node && parent.contains(node)
		} else {
			while (node && (node = node.parentNode))
				if (node === parent) return true
			return false
		}
	}

	function isArray(arr) {
		return Array.isArray(arr) || bject instanceof Array
	}

	function isNumeric(val) {
		var num = Number(val), type = typeof val
		return val != null && type != 'boolean' &&
			(type != 'string' || val.length) &&
			!isNaN(num) && isFinite(num) || false
	}

	function isFunction(value) { 
		return type(value) == "function" 
	}
	function isWindow(obj) { 
		return obj != null && obj == obj.window 
	}
	function isDocument(obj) { 
		return obj != null && obj.nodeType == obj.DOCUMENT_NODE 
	}
	function isObject(obj) { 
		return type(obj) == "object" 
	}
	function isPlainObject(obj) {
		return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function getUrlData(param) {
    var str = '?'
    for (var key in param) {
      var oValue = param[key]
      str += key + '=' + oValue + '&'
    }
    return str
  }
  function animationend() {
    var name = {
      AnimationEvent: "animationend",
      WebKitAnimationEvent: "webkitAnimationEnd"
    }
    for (var i in name) {
      if (/object|function/.test(typeof window[i])) return name[i];
    }
    return false;
  }

  function compact(array) {
    var index = -1, resIndex = 0, result = [], 
      length = array ? array.length : 0;
    while (++index < length) {
      var value = array[index];
      if (value) result[resIndex++] = value;
    }
    return result;
  }

  function endsWith(target, str, ignorecase) {
    var end = target.substring(target.length - str.length);
    return ignorecase ? end.toLowerCase() === str.toLowerCase() : end === str;
  }

  function escapeHTML(html){
    return html.replace(/&/ig, "&amp;").replace(/</ig, "&lt;").replace(/>/ig, "&gt;")
      .replace(/("|\")/ig, "&quot;").replace(/'/ig, "&#39;")
  }

  function isInWeixinApp() {
    return /MicroMessenger/.test(navigator.userAgent);
  }

  function loadScript(url) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.body.appendChild(script)
  }

  function loadStyles(url) {
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    var head = document.head || document.getElementsByTagName('head')[0]
    head.appendChild(link)
  }

  function repeat(target, n) {
    var s = target, total = "";
    while(n > 0) {
      if (n % 2 == 1) total += s;
      if (n == 1) break;
      s += s;
      n = n >> 1;
    }
    return total;
  }
  
  function startsWith(target, str, ignorecase) {
    var start = target.substr(0, str.length);
    return ignorecase ? start.toLowerCase() === str.toLowerCase() : start === str;
  }

  function transitionend() {
    var el = document.createElement("bootstrap");
    var name = {
      WebkitTransition: 'WebkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    }
    for (var i in name) {
      if (el.style[i] !== undefined) return { end: name[i] }
    }
    return null
  }

  function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }

  function windowTop() {
    if (window != top) top.location.href = window.location.href;
  }

	return {
		isName: isName,           // 判断是不是姓名
		isChinese: isChinese,         // 判断是不是中文
		isMobile: isMobile,         // 判断是不是手机号
		isIdNum: isIdNum,       //判断是不是身份证号
		isEmail: isEmail,       // 判断是不是邮箱
		getUrlQueryString: getUrlQueryString,      // 获取URL上传的参数
		copyObject: copyObject,           // 深拷贝对象
		linkTo: linkTo,       // 连接到某个网址
		download: download,     // 下载相关
		toDouble: toDouble,     // 单位数转2位数
		getBirthdayById: getBirthdayById,    // 通过身份证获取生日
		getGenderById: getGenderById,       // 通过身份证获取性别
		birthDayAge: birthDayAge,   // 通过年月日获得年龄
		mix: mix,           // 合并2个对象
		cleanHtml: cleanHtml,    //将HTML标签净化为纯文本
		random: random,        // 获取一个范围内的随机数
		date: date,           // 毫秒数转年月日，时分秒
		scroll: scroll,         // 获取滚动元素的滚动距离
		getStyle: getStyle,     // 获取样式
		setCookie: setCookie,     // 设置cookie，传入一个对象
		getCookie: getCookie,      // 获取cookie
		removeCookie: removeCookie,    // 删除cookie
		scrollUnique: scrollUnique,   // 子级元素滚动不影响父级
		querySelector: querySelector,   // dom缓存
		arrayEqual: arrayEqual,         // 判断2个数组是否绝对相等
		ajax: ajax,
		hasClass: hasClass,             // 判断元素是否有某个class样式
		addClass: addClass,             // 向某个元素添加class样式
		removeClass: removeClass,       // 删除元素class样式
		offset: offset,                 // 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
		requestFullscreen: requestFullscreen,   // 全屏
		fullScreenStatus: fullScreenStatus,     // 判断是否全屏
		cancelFullScreen: cancelFullScreen,     // 退出全屏
		onFullScreenEvent: onFullScreenEvent,   // 全屏事件回调
		camelCase: camelCase,               //将一组字符串变成“骆驼”命名法的新字符串，如果该字符已经是“骆驼”命名法，则不变化。
		contains: contains,
		isArray: isArray,
		isNumeric: isNumeric,
		isFunction: isFunction,
		isWindow: isWindow,
		isDocument: isDocument,
		isObject: isObject,
    isPlainObject: isPlainObject,
    getUrlData: getUrlData,     //get请求传给后台的数据
    animationend: animationend,   //返回animationend事件
    compact: compact,   //创建一个新数组，包含原数组中所有的非假值元素。如false, null, 0, "", undefined, 和 NaN 都是假值
    endsWith: endsWith,
    escapeHTML: escapeHTML,   //<p class="greeting">Hello world!</p>
    isInWeixinApp: isInWeixinApp,   //判断是不是微信app环境
    loadScript: loadScript,     //加载js
    loadStyles: loadStyles,     //加载css
    repeat: repeat,     //字符串重复n次
    startsWith: startsWith,
    transitionend: transitionend,   //返回transitionend事件
    uuid: uuid,
    windowTop: windowTop,   //将top对象的网址自动导向被嵌入网页的网址
	}
})
