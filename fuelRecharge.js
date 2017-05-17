pageMonitor = setInterval(function(){
	owerMoney = $(".ower-money").text();
	log(owerMoney);


	baoquan = /.+?(\d+)宝券/.exec(owerMoney)[1];
	if(baoquan > 0){
		window.clearInterval(pageMonitor);
		log(baoquan);
	}
	else
	{
		return;
	}


	if(baoquan >= 140000){
		log("选择充1000");
		$(".check div:contains(1000元)").click();
	}
	else if(baoquan >= 70000){
		log("选择充500");
		$(".check div:contains(500元)").click();
	}	
	else if(baoquan >= 14000){
		log("选择充100");
		$(".check div:contains(100元)").click();
	}


	$("#bind").click();
	$("#jlgm").click();


	log
},
300);