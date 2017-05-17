
pageMonitor = setInterval(function(){
	owerMoney = $(".money-many").text();
	log(owerMoney);


	baoquan = /.+?\s*(\d+)\s*宝券/.exec(owerMoney)[1];
	if(baoquan > 0){
		window.clearInterval(pageMonitor);
		log(baoquan);
	}
	else
	{
		return;
	}


	if(baoquan >= 70000){
		log("选择充500");
		$(".m-select dd:contains(500元)").click();
	}	
	else if(baoquan >= 42000){
		log("选择充300");
		$(".m-select dd:contains(300元)").click();
	}	
	else if(baoquan >= 28000){
		log("选择充200");
		$(".m-select dd:contains(200元)").click();
	}	
	else if(baoquan >= 14000){
		log("选择充100");
		$(".m-select dd:contains(100元)").click();
	}
	$(".m-select dd:contains(100元)").click();

	$("#activeOne").click();
	$("#recharge").click();


	log
},
1000);


confirmInterval = setInterval(function(){
	if($("#confirmBtnPay").is(":visible") == true){
		$("#confirmBtnPay").click();
	}

	if($(".error").is(":visible") == true){
		log("报错了，不提交");
		window.clearInterval(confirmInterval);
	}
},
1000);