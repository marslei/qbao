/**
 * @author Administrator
 */
$(".userHyd").remove();
$(".baoquan").remove();
$(".contactUS").parent().remove();
$("#totlaAssets").bind("DOMSubtreeModified", function() {
	totlaAssets=Number($("#totlaAssets").text().replace(/,/g,""));
	totlaAssetsInRMB = fmoney((totlaAssets/100).toFixed(2),2);
	$("#totlaAssetsInRMB").remove();
	$("#totlaAssets").parent().append("<span id='totlaAssetsInRMB'>" + totlaAssetsInRMB + "</span>");
});
$("#todayTotalSignRecord").bind("DOMSubtreeModified", function() {
	todayTotalSignRecord=Number($("#todayTotalSignRecord").text().replace(/,/g,""));
	totlaAssets=Number($("#totlaAssets").text().replace(/,/g,""));

	rate = (todayTotalSignRecord/(totlaAssets-todayTotalSignRecord));
	$("#todayTotalSignRecord").parent().parent().append("<span>Rate:"+(rate).toFixed(8)+"</span>");
});
function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}