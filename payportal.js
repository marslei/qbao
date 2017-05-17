$(".num").click(function(){
	$(this).selectText();
	log($(this).text());
	document.execCommand('copy');
	notifyMe($(this).text() +" 已复制");

});