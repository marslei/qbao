console.log("付款页面");

checkInterval = setInterval(function(){
	if(勾选宝券支付选项()){
		window.clearInterval(checkInterval);
	}
},
100);


function 勾选宝券支付选项(){
	if($("#payBaoqId").hasClass("check-no") == true){
		console.log("选中【"+$("#payBaoqId").parent().text().trim() + "】");
		$("#payBaoqId").click();
	}
	return true;
}

//$("#pwd").val("****");
//console.log("密码"+$("#pwd").val());

勾选宝券支付选项();
