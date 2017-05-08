/**
 * @author Administrator
 */
function closeCurrentTask(){
	console.log("closeCurrentTask "+ getTime());
	window.open('', '_self', ''); //bug fix
	window.close();
}
nextTask = [];
function pushDoTaskNext(f){
	nextTask.push(f);
	setTimeout(function(){console.log('执行doTaskNext');nextTask.pop()();},getTimeout(''));
}
function doTask(){
	var finish =false;
	finish = $(".doTaskNext").is(':visible');
	console.log("doTaskNext "+ finish);
	if(finish){
		if(nextTask.length <=0 ){
			pushDoTaskNext(function(){performClickOnLink($("#doNexGroupTask")[0]);});
		}
		return;
	}
	
	finish = $("#curTaskTodayFinished").is(':visible');
	console.log("curTaskTodayFinished "+ finish);
	if(finish){
		closeCurrentTask();
		return;
	}
	
	finish =  $("#curTaskCompleted").is(':visible');
	console.log("curTaskCompleted "+ finish);
	if(finish){
		closeCurrentTask();
		return;
	}
	
	finish = $("#todayTaskListFinished").is(':visible');
	console.log("todayTaskListFinished "+ finish);
	if(finish){
		closeCurrentTask();
		return;
	}

	errorInfo = $("#errorInfo").text()
	finish = /完成/.test(errorInfo)
	console.log("errorInfo"+ errorInfo);
	if(finish){
		closeCurrentTask();
		return;
	}
}
var timerId = 0;
function init(){
	console.log("init toDoAdvTask.js")
	timerId = setInterval(doTask,1000);
}
checkExtensionStatus(init);