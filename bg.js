function printTable(table,data){
    table.rows
    .add(print)
    .draw()
    .nodes()
    .to$()
    .addClass( 'new' );
}
function log(info){
    console.log(info);
}
function getTimeout(pre){
    var timeout = Math.floor(Math.random() * 3000) + 5000;
    console.log(pre+"timeout is "+ timeout);
    return timeout;
}
function getTime(){
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() +" " +d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return strDate;
}
function getNextPage(nextFun,finalFun,timeout){
    console.log("getNextPage");
    if(nextPage()){
        setTimeout(function(){nextFun();},timeout);
    }
    else
    {
        finalFun();
    }
}
function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
} 
function performClickOnLink(a){
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}
function openNewBackgroundTab(targetUrl){
    var a = document.createElement("a");
    a.href = targetUrl;
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}
var config = {};
config.frequencyInSeconds = -1;
function setupOptions(callback){
	chrome.storage.sync.get("frequencyInSeconds", function (obj) {
    	console.log(obj);
	 	config.frequencyInSeconds = obj.frequencyInSeconds;
		console.log("setupOptions frequencyInSeconds= "+ config.frequencyInSeconds);
		if (config.frequencyInSeconds == null || config.frequencyInSeconds == -1) {
			console.log("setup frequencyInSeconds= "+ 7);
			save_options_frequency(7);
		}
		callback();
	});
}
function check(tokenUrl,callback){
	    $.ajax({
        url: tokenUrl,
        success: function(response){
			console.log(response);
			data =$.parseJSON(response);
			start = data.start;
			console.log("起始日期"+start);
			end = data.end;
			console.log("截止日日"+end);
			enable = data.enable;
			console.log("是否可用"+enable);
			if(enable == false){
				console.log("授权已过期");
				alert("当前授权已过期")
				return;
			}
			else{
				console.log("当前授权有效，可以继续使用");
			}
			setupOptions(callback);
			//setupPage();
			//setupListener();
        },
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("授权无效");
			alert("授权无效")
		}
    });	
}
tokenMap = {};
userName = '';
function checkAuth(callback){
	userName=/username\s*=\s*['"]([^'"]+)['"]/.exec($("script").text())[1];
	console.log(userName);
	tokenUrl = "http://qianbao502.qiniudn.com/"+userName;
	console.log(tokenUrl);
	check(tokenUrl,callback);
}
function checkExtensionStatus(callback){
	//checkAuth(callback);
	//callback();
	setupOptions(callback);
}
function save_options_frequency(f){
	config.frequencyInSeconds = f;
	save = {};
	save["frequencyInSeconds"] = f;
	chrome.storage.sync.set(save, function() {
    	console.log('Settings saved');
	    console.log("frequencyInSeconds= " + f);
	});
}
//alert("bg.js");
//$(".site_cmtop_status_info .site_cmtop_nav_txt").text("YOU CAN'T NEVER TRACE ME!");
// function speak(content) {
    // var msg = new SpeechSynthesisUtterance(content);
	// window.speechSynthesis.speak(msg);
// }
function getNowFormatDate() {
     // return new Date().yyyymmddhhmmss(); 
	var d = new Date,
	dformat = [d.getFullYear(),
	  (d.getMonth() + 1).padLeft(),
	  d.getDate().padLeft()
	].join('-') +
	' ' + [d.getHours().padLeft(),
	  d.getMinutes().padLeft(),
	  d.getSeconds().padLeft()
	].join(':');
	return dformat;
}
Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}
function sendMail(Subject,Body,Attachment){
	$.post("http://127.0.0.1/mailer/index.php", 
	{
		"Subject":Subject,
		"Body":Body,
		"Attachment":Attachment
	},
	function( data ) {
		console.log(data);
		notifyMe(data);
	});
}
function notifyMe(info) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    // var notification = new Notification("Hi there!");
    var notification = new Notification(info);
  }
  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Whatever the user answers, we make sure we store the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
      // If the user is okay, let's create a notification
      if (permission === "granted") {
        // var notification = new Notification("Hi there!");
        var notification = new Notification(info);
      }
    });
  }
  // At last, if the user already denied any notification, and you
  // want to be respectful there is no need to bother him any more.
}
jQuery.fn.outerHTML = function() {
    return jQuery('<div />').append(this.eq(0).clone()).html();
}
function screenShot(targetElement, title, bodyPrefix){
	var getCanvas; // global variable
	 html2canvas(targetElement, {
	 onrendered: function (canvas) {
			// $("#previewImage").append(canvas);
			getCanvas = canvas;
			// console.log(getCanvas.toDataURL("image/png"));
			dataURL = getCanvas.toDataURL("image/png");
			// body ='<img style="display:block;" src="'+dataURL+'"></img>';
			// if(bodyPrefix != null){
				// bodyPrefix += '<br>';
			// }
			sendMail(title,bodyPrefix, dataURL);
		 }
	 });	
}
function openImage(targetElement){
	var getCanvas; // global variable
	 html2canvas(targetElement, {
	 onrendered: function (canvas) {
			// $("#previewImage").append(canvas);
			getCanvas = canvas;
			// console.log(getCanvas.toDataURL("image/png"));
			dataURL = getCanvas.toDataURL("image/png");
			// body ='<img style="display:block;" src="'+dataURL+'"></img>';
			// if(bodyPrefix != null){
				// bodyPrefix += '<br>';
			// }
			// sendMail(title,bodyPrefix, dataURL);
			// location.href = dataURL;
			openNewBackgroundTab(dataURL);
		 }
	 });	
}

(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);
jQuery.fn.selectText = function(){
    var doc = document;
    var element = this[0];
    // console.log(this, element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();        
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
jQuery.fn.insertAt = function(index, element) {
  var lastIndex = this.children().size();
  if (index < 0) {
    index = Math.max(0, lastIndex + 1 + index);
  }
  this.append(element);
  if (index < lastIndex) {
    this.children().eq(index).before(this.children().last());
  }
  return this;
}
// @author Rich Adams <rich@richadams.me>
// Implements a triple-click event. Click (or touch) three times within 1s on the element to trigger.
;(function($)
{
    // Default options
    var defaults = {
        threshold: 1000, // ms
    }
    function tripleHandler(event)
    {
        var $elem = jQuery(this);
        // Merge the defaults and any user defined settings.
        settings = jQuery.extend({}, defaults, event.data);
        // Get current values, or 0 if they don't yet exist.
        var clicks = $elem.data("triclick_clicks") || 0;
        var start  = $elem.data("triclick_start")  || 0;
        // If first click, register start time.
        if (clicks === 0) { start = event.timeStamp; }
        // If we have a start time, check it's within limit
        if (start != 0
            && event.timeStamp > start + settings.threshold)
        {
            // Tri-click failed, took too long.
            clicks = 0;
            start  = event.timeStamp;
        }
        // Increment counter, and do finish action.
        clicks += 1;
        if (clicks === 3)
        {
            clicks     = 0;
            start      = 0;
            event.type = "tripleclick";
            // Let jQuery handle the triggering of "tripleclick" event handlers
            if (jQuery.event.handle === undefined) {
                jQuery.event.dispatch.apply(this, arguments);
            }
            else {
                // for jQuery before 1.9
                jQuery.event.handle.apply(this, arguments);
            }
        }
        // Update object data
        $elem.data("triclick_clicks", clicks);
        $elem.data("triclick_start",  start);
    }
    var tripleclick = $.event.special.tripleclick =
    {
        setup: function(data, namespaces)
        {
            $(this).bind("touchstart click.triple", data, tripleHandler);
        },
        teardown: function(namespaces)
        {
            $(this).unbind("touchstart click.triple", tripleHandler);
        }
    };
})(jQuery);
function getDateDiff(startDate,endDate)  {
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
    return  dates;    
}
var DateDiff = {
    inHours: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(3600*1000));
        // return parseFloat((t2-t1)/(24*3600*1000)).toFixed(2);
    },
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
        // return parseFloat((t2-t1)/(24*3600*1000)).toFixed(2);
    },
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000*7));
    },
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },
    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}
function toThousands(num) {
    // var num = (num || 0).toString(), result = '';
    // while (num.length > 3) {
        // result = ',' + num.slice(-3) + result;
        // num = num.slice(0, num.length - 3);
    // }
    // if (num) { result = num + result; }
    // return result;
	return formatNumber(num, 2);
}
function formatNumber(num, precision, separator) {
    var parts;
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        num = Number(num);
        // 处理小数点位数
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        // 分离数字的小数部分和整数部分
        parts = num.split('.');
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        return parts.join('.');
    }
    return NaN;
}
function speak(content) {
    var msg = new SpeechSynthesisUtterance(content);
	window.speechSynthesis.speak(msg);
}
