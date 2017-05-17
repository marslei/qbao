log("付款页面");

checkInterval = setInterval(function(){
	if(勾选宝券支付选项()){
		window.clearInterval(checkInterval);
	}
},
100);


function 勾选宝券支付选项(){
	if($("#payBaoqId").hasClass("check-no") == true){
		log("选中【"+$("#payBaoqId").parent().text().trim() + "】");
		$("#payBaoqId").click();
	}
	return true;
}

log
log

勾选宝券支付选项();
