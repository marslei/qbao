/**
 * @author Administrator
 */
function removeSurvey(){
	console.log("removeSurvey");
	$("#user_shadow").remove();
	$("#tixianwenjuan").remove();
}
timerId = setInterval(removeSurvey,1000);
$("body").bind("DOMSubtreeModified", function() {
	removeSurvey();
});