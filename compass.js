$(".jl-detail em").click(function(){
	copyThis($(this));
});
function copyThis(element){
	$(element).selectText();
	log($(element).text());
	document.execCommand('copy');
	notifyMe($(element).text() +" 已复制");
}
i = setInterval(function(){
	if($(".fdjlValue span") == null){
		return;
	}
	window.clearInterval(i);
	$(".fdjlValue span").click(function(){
		copyThis($(this));
	});
},
1000);