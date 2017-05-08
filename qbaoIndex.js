// LoginInterval = setInterval(function(){
	login();
// },2000);

function login(){
	if($("a[name=user_login01]").is(":visible") == true){
		loc = $("a[name=user_login01]").attr('href');
		openNewBackgroundTab(loc);
	}
	if($("a[name=user_center01]").is(":visible") == true){
		loc = $("a[name=user_center01]").attr('href');
		openNewBackgroundTab(loc);
	}
}