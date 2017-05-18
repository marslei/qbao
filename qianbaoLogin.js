
$(".QRCode").click();

LoginInterval = setInterval(function(){
	login();
},1000);


refreshInterval = setInterval(function(){
	log('自动刷新');
	window.location.reload();
},300000);


function login(){
	src = $(".code_imageImg").attr("src");
	if(src == null){
		return;
	}
	window.clearInterval(LoginInterval);
	code_imageImg = src;
	log(code_imageImg);


	Subject = '请求自动登录['+getNowFormatDate()+']';

	body = $("<img/>", {"src":code_imageImg});

	log(body.outerHTML());

	sendMail(Subject, $(".code_image").outerHTML(), null);

}