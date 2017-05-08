
pageMonitor = setInterval(function(){
	owerMoney = $(".money-many").text();
	console.log(owerMoney);
	
	baoquan = /.+?\s*(\d+)\s*宝券/.exec(owerMoney)[1];
	if(baoquan > 0){
		window.clearInterval(pageMonitor);
		console.log(baoquan);
	}
	else
	{
		return;
	}
	
	if(baoquan >= 70000){
		console.log("选择充500");
		$(".m-select dd:contains(500元)").click();
	}	
	else if(baoquan >= 42000){
		console.log("选择充300");
		$(".m-select dd:contains(300元)").click();
	}	
	else if(baoquan >= 28000){
		console.log("选择充200");
		$(".m-select dd:contains(200元)").click();
	}	
	else if(baoquan >= 14000){
		console.log("选择充100");
		$(".m-select dd:contains(100元)").click();
	}
	$(".m-select dd:contains(100元)").click();

	$("#activeOne").click();
	$("#recharge").click();
	
	// 您当前可用余额为20.56元，宝券余额为88851宝券
},
1000);


confirmInterval = setInterval(function(){
	if($("#confirmBtnPay").is(":visible") == true){
		$("#confirmBtnPay").click();
	}

	if($(".error").is(":visible") == true){
		console.log("报错了，不提交");
		window.clearInterval(confirmInterval);
	}
},
1000);