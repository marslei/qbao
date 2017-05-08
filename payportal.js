$(".num").click(function(){
	$(this).selectText();
	console.log($(this).text());
	document.execCommand('copy');
	notifyMe($(this).text() +" 已复制");

});