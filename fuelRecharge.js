pageMonitor = setInterval(function(){
	owerMoney = $(".ower-money").text();
	console.log(owerMoney);
	
	baoquan = /.+?(\d+)宝券/.exec(owerMoney)[1];
	if(baoquan > 0){
		window.clearInterval(pageMonitor);
		console.log(baoquan);
	}
	else
	{
		return;
	}
	
	if(baoquan >= 140000){
		console.log("选择充1000");
		$(".check div:contains(1000元)").click();
	}
	else if(baoquan >= 70000){
		console.log("选择充500");
		$(".check div:contains(500元)").click();
	}	
	else if(baoquan >= 14000){
		console.log("选择充100");
		$(".check div:contains(100元)").click();
	}
	
	$("#bind").click();
	$("#jlgm").click();
	
	// 您当前可用余额为20.56元，宝券余额为88851宝券
},
300);