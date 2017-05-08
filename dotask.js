$("#advertisementWindow").remove();
function performFinishTask(){
    console.log("performFinishTask "+getTime());
    location.href="javascript:finishTask(); void 0";
}
function closeCurrentTask(){
	console.log("closeCurrentTask "+ getTime());
	window.open('', '_self', ''); //bug fix
	window.close();
}

function init(){
	console.log("init dotask.js")
	$("#finishButton").bind("DOMSubtreeModified", function() {
		var text = $(this).text();
		console.log(text);
		if (/已经?完成/.test(text)) {
			closeCurrentTask();
		} else if (/继续下一/.test(text)) {
			setTimeout(function(){performFinishTask()},getTimeout(''));
		}
	});
}
checkExtensionStatus(init);