/**
 * @author Administrator
 */
$(document).ready(function(){
	$("#tabs").tabs();
	$("#slider").slider({
		min: 1,
		max: 60,
	});
	$("#slider").on("slidechange", function(event, ui){
		frequencyInSeconds = $("#slider").slider("value");
		frequencyInSeconds = frequencyInSeconds + 1;log
		if(frequencyInSeconds <= 5 ){
        	alert("亲,"+frequencyInSeconds+"秒一个已经很快了，三思呀");
	    }
		frequencyInSeconds--;
        save_options_frequency(frequencyInSeconds);
	});

	requestAnnouncement('http://qianbao502.qiniudn.com/announcement.html');
    restore_options_frequency();
});

log
function save_options_frequency(frequencyInSeconds){
	save = {};
	save["frequencyInSeconds"] = frequencyInSeconds;
	chrome.storage.sync.set(save, function() {
    	console.log('Settings saved');
	    console.log("frequencyInSeconds= " + frequencyInSeconds);
		$("#freDisplay").text(frequencyInSeconds);
	});
}

log
function restore_options_frequency(){
	chrome.storage.sync.get("frequencyInSeconds", function (obj) {
    	console.log(obj);
	 	frequencyInSeconds = obj.frequencyInSeconds;
	    console.log("frequencyInSeconds= " + frequencyInSeconds);
	    if (!frequencyInSeconds) {
			frequencyInSeconds = 7;
			save_options_frequency(frequencyInSeconds);
	        return;
	    }
		$("#slider" ).slider({
			value: frequencyInSeconds,
			min: 1,
			max: 60
		 });
		$("#freDisplay").text(frequencyInSeconds);
	});
}

function requestAnnouncement(url){
	$.ajax({
		type: "POST",
        url: url,
		cache: false,
        success: function(response){
			$("#announcement").empty();
			$("#announcement").append(response);
        },
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log("请求出错了");
			alert("请求出错了");
		}
	});
}
