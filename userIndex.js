pageInterval = setInterval(function(){
	if($(".num").size() >0){
		window.clearInterval(pageInterval);
	}
	$(".num").click(function(){
		$(this).selectText();
		log($(this).text());
		document.execCommand('copy');
		notifyMe($(this).text() +" 已复制");

	});


	$(".site_frame_top").on('dblclick', function () {
		screenShot($(".u_num_list"), '个人资产['+getNowFormatDate()+']', $(".u_num_list").outerHTML());
	});


},500);	


打开分销任务 = setInterval(function(){
	href = $("a:contains(进行中的分销)").attr("href");
	if(href != null){
		openNewBackgroundTab(href);
		log('打开分销任务');
		window.clearInterval(打开分销任务);
	}
},2000);