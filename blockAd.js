function blockAd(suspectedAd,attr){
	target=suspectedAd.attr(attr);
	if(!isAbsoluteUrl(target)){
		return;
	}
	if(is_qianbao666(target)){
		return;
	}
	log("block "+target);
	suspectedAd.remove();
}

function isAbsoluteUrl(url){
	return /^https?:\/\/.+/.test(url);
}
function is_qianbao666(url){
	return /^https?:\/\/([^.]+\.)?(qianbao666|qbao|qbcdn|qianwang365|wozhongla).+/.test(url);
}
$("body").bind("DOMSubtreeModified", function() {
    $("iframe").not('[src*="qianbao666"]').not('[src*="qianwang365"]').not('[src*="qbcdn"]').remove();
    $("#ft_left_couplet").remove();
    $("#ft_right_couplet").remove();
    $("#aswift_0_anchor").remove();
    $(".adNewBox").remove();
    $(".ad").remove();
    $("[usemap=#Map2]").parent().remove();
    $('.posTitle').nextUntil('.box', 'div:has(iframe)').remove();
    srcList = $("[src]");
    srcList.each(function(index) {
        blockAd($(this),"src");
    });
    hrefList = $("[href]");
    hrefList.each(function(index) {
        blockAd($(this),"href");
    });
});
