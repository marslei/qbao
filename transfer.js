/**
 * @author Administrator
 */
function removeSurvey(){
	log("removeSurvey");
	$("#user_shadow").remove();
	$("#tixianwenjuan").remove();
}
timerId = setInterval(removeSurvey,1000);
$("body").bind("DOMSubtreeModified", function() {
	removeSurvey();
});