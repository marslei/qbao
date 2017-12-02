console.log("taskType="+$.QueryString['taskType']);
taskType = $.QueryString['taskType'];
function startPageMonitor(){
	console.log("startPageMonitor");
	pageMonitor = setInterval(function(){
//		console.log("页面监控["+getNowFormatDate()+"]");
		if(checkProgress() == true){
			console.log('倒计时已启动，关闭页面监控');
			window.clearInterval(pageMonitor);
		}
	}, 1000);
}
function checkProgress(){
//	console.log("checkProgress "+getNowFormatDate());
    if(taskType == 0){
		progressNum = $(".progress-num").text();
		if(/3\/3/.test(progressNum)){
			console.log("checkProgress,关闭当前页面");
			closeThisWindow(0);
			return true;
		}
	}
	else {
		studyBtn = $(".study-btn").text();
		if(/已完成.*/.test(studyBtn)){
			console.log("checkProgress,关闭当前页面");
			closeThisWindow(0);
			return true;
		}
	}
	return false;
}
function closeThisWindow(timeout){
    if(timeout <= 0){
        window.close();
        return;
    }
	timeout = timeout/1000;
	console.log(timeout+"秒后关闭当前页面");
	setInterval(function(){
		timeout--;
		console.log("倒计时"+timeout)
		if(timeout <= 0){
			window.close();
		}
	},
	1000)
}
startPageMonitor();
if(taskType == 0){
	console.log('分销任务');
	gzh = setInterval(function(){
		if($(".gzh").text() == "已完成"){
			window.clearInterval(gzh);
			console.log('开工啦');
			startWork();
			return;
		}
		console.log("去关注");
		$(".gzh").click();
		console.log('先订阅');
	},1000);
}
else {
	console.log('广告任务');
	adTaskInterval = setInterval(function(){
		statusTxt = $(".status-txt").text();
		if(statusTxt == null){
			return;
		}
		window.clearInterval(adTaskInterval);
		console.log('开始处理');
		console.log(statusTxt);
		if(statusTxt == "今日未完成"){
			console.log('开工啦');
			startADTaskWork();
		}
	},
	1000);
}

function start2(){
	if($('.checkin-btn').hasClass('disabled') == false){
		$('.checkin-btn')[0].click();
		return;
	}
	if($('.study-btn').hasClass('disabled') == false){
		$('.study-btn')[0].click();
		return;
	}
	if($('.share-btn').hasClass('disabled') == false){
		$('.share-btn')[0].click();
		return;
	}
}
function startWork(){
	currentInterval = setInterval(function(){
		if($(".step-btn").is(":visible") == false){
			return;
		}
		var text = $(".step-btn").text();
		console.log(text);
		if (/下.*/.test(text)) {
			$('.timer .step-btn').click();
		} else if (/开始.*/.test(text)) {
			$('.timer .step-btn').click();
		}
		else if (/去答题.*/.test(text)) {
			$('.timer .step-btn').click();
			window.clearInterval(currentInterval);
			problem = $(".problem-answer .desc").text().trim();
			console.log(problem);
			bzj = $(".info .red").text();
			console.log("保证金"+bzj);
			bzj =/.*10,000.*/.test(bzj);
			bzj2 =/.*20,000.*/.test(bzj);
            libAnswer = getAnswer(problem);

			if(typeof libAnswer != 'undefined'){
                if(libAnswer == true){
                    $(".val-y").click();
                }
                else
                {
                    $(".val-n").click();
                }
            }
			else{
				$(".val-y").click();
				console.log("否3");
			}
			window.location = "javascript:$('.problem-answer .btn').click()";
		}
		if(/提交答案.*/.test(text)){
			window.clearInterval(currentInterval);
			if($(".val-n").hasClass("checked-radio") ||
			   $(".val-y").hasClass("checked-radio")){
				$(".answer-btn").click();
			}
		}
	},1000);
	progressNumInterval = setInterval(function(){
		if($(".progress-num").length = 0){
			return;
		}
		window.clearInterval(progressNumInterval);
		progressNum = $(".progress-num").text();
		console.log(progressNum);
		if(/3\/3/.test(progressNum)){
			console.log("今日已完成，关闭任务");
			window.clearInterval(currentInterval);
		}else{
			console.log("今日未完成，启动任务");
			start2();
		}
	},1000);
	checkinInterval = setInterval(function(){
		if($(".checkin-img-wrapper .checkin-icon").is(":visible") == false){
			return;
		}
		window.clearInterval(checkinInterval);
		window.location = "javascript:+$('.checkin-img-wrapper .checkin-icon').click()";
	},1000);
	setInterval(function(){
		if($(".continue-btn").is(":visible") == false){
			return;
		}
		continueBtn = $(".continue-btn:visible").text();
		console.log(continueBtn);
		if(/继续任务.*/.test(continueBtn)){
			window.location = "javascript:+$('.continue-btn:visible').click()";
		}else{
			console.log("今日已完成");
		}
	},1000);
	shareInterval = setInterval(function(){
		if($(".share-to").is(":visible") == false){
			return;
		}
		window.clearInterval(shareInterval);
		window.location = "javascript:var qq = $('.qq'); qq.removeClass('qq'); qq.click();";
	},1000);
	sliderInterval = setInterval(function(){
		if($(".slider-wrap").is(":visible") == false){
			return;
		}
		window.clearInterval(sliderInterval);
		console.log('绕过滑块');
		setTimeout(function(){
			$('.slider-wrap').hide();
			$('.timer').show();
			$('.timer .progress-bar').css({'width':'100%'});
			$('.timer .step-btn').attr('step-state','end').html('去答题').addClass('active');			
		},2000);
	},1000);
	failInterval = setInterval(function(){
		if($(".problem-failed").is(":visible") == false){
			return;
		}
		location.reload()
	},1000);	
}
function startADTaskWork(){
	window.location = "javascript:$('.study-btn').click();";
	currentInterval = setInterval(function(){
		if($(".step-btn").is(":visible") == false){
			return;
		}
		var text = $(".step-btn").text();
		console.log(text);
		if (/下.*/.test(text)) {
			$('.timer .step-btn').click();
		} else if (/开始.*/.test(text)) {
			$('.timer .step-btn').click();
		} else if (/完成.*/.test(text)) {
			$('.timer .step-btn').click();
		}
	},1000);
	sliderInterval2 = setInterval(function(){
		if($(".slider-wrap").is(":visible") == false){
			return;
		}
		window.clearInterval(sliderInterval2);
		console.log('绕过滑块');
		setTimeout(function(){
			$('.slider-wrap').hide();
			$('.timer').show();
			$('.timer .progress-bar').css({'width':'100%'});
			$('.timer .step-btn').attr('step-state','end').html('完成').addClass('active');
		},2000);
	},1000);
	failInterval2 = setInterval(function(){
		if($(".problem-failed").is(":visible") == false){
			return;
		}
		location.reload()
	},1000);	
}

function getAnswer(question){
    for(var p in questionLib){//遍历json数组时，这么写p为索引，0,1
       title = questionLib[p].title;
       if(question.indexOf(title) >= 0){
           return questionLib[p].answer;
       }
    }
    return undefined;
}

var questionLib = [
  {
    "title": "商家名称是鑫洋家居馆吗",
    "answer": true
  },
  {
    "title": "商家名称是鑫洋家居馆吗",
    "answer": true
  },
  {
    "title": "该分销周期是23天吗",
    "answer": true
  },
  {
    "title": "店铺主营家居类商品吗",
    "answer": true
  },
  {
    "title": "商家名称是大午集团吗",
    "answer": true
  },
  {
    "title": "店铺主营各种卤制品吗",
    "answer": true
  },
  {
    "title": "该分销周期是29天吗",
    "answer": true
  },
  {
    "title": "店铺主推商品是大米吗",
    "answer": true
  },
  {
    "title": "店铺主营食品吗",
    "answer": true
  },
  {
    "title": "店铺主推商品是榴梿干吗",
    "answer": true
  },
  {
    "title": "商家名称是小颖五常大米吗",
    "answer": true
  }
  ,
  {
      "title": "1",
      "answer": false
  }
];