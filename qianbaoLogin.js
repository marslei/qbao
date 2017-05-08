
$(".QRCode").click();

LoginInterval = setInterval(function(){
	login();
},1000);


refreshInterval = setInterval(function(){
	console.log('自动刷新');
	window.location.reload();
},300000);

// var code_imageImg;
function login(){
	src = $(".code_imageImg").attr("src");
	if(src == null){
		return;
	}
	window.clearInterval(LoginInterval);
	code_imageImg = src;
	console.log(code_imageImg);
	
	
	Subject = '请求自动登录['+getNowFormatDate()+']';
	// body = "<img src='"+code_imageImg+"' alert='扫码登录'/>"
	body = $("<img/>", {"src":code_imageImg});
	// body.attr('src', code_imageImg);

	console.log(body.outerHTML());
	// sendMail(Subject, body.outerHTML(), null);
	sendMail(Subject, $(".code_image").outerHTML(), null);
	// screenShot($(".site_foot_copr_txt"), Subject, $(".QRCode_login").outerHTML());
}