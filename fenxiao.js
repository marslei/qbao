var PAGE_RELOAD_INTEVERAL = 300;
var countDown = PAGE_RELOAD_INTEVERAL;

refreshInterval = setInterval(function(){
	log('自动刷新，倒计时'+countDown +' ['+getNowFormatDate()+']');
	countDown --;

	$("#timer").text("倒计时["+countDown+"]秒");
	if(countDown > 0){
		return;
	}
	countDown = PAGE_RELOAD_INTEVERAL;

	href = $("a:contains(进行中的分销)").attr("href");
	if(href != null){
		location.href = href
	}
},1000);
var isSettled = 0;
var divider = "	"

var 进度表,领取表,日结表,月结表;
var prePage;

var Subject,Body, snapshotTarget;
function init() {
	log("init fenxiao_tongji.js");
	setupPage();
	setupListener();
}

init();

function setupPage() {
	var qbaoUtils = $("<div id='qbaoUtils'></div>");
	qbaoUtils.addClass("qbaoUtils");

	var numTJ = $("<div id='numTJ' class='time'></div>");
	var timer = $("<div id='timer' class='time'></div>");
	$(qbaoUtils).append(numTJ);
	$(qbaoUtils).append(timer);

	var left = $("<div id='left'></div>");
	left.addClass("floatLeft");
	$(qbaoUtils).append(left);

	var right = $("<div id='right'></div>");
	right.addClass("floatRight");
	$(qbaoUtils).append(right);

	$(qbaoUtils).insertBefore(".site_frame_foot");

	$(".breadcrumb").append(function() {
	  return $('<a class="goldBtn">逐一打开</a>').click(openTaskHandler);
	});
	$(".breadcrumb").append(function() {
	  return $('<a class="goldBtn">重置统计</a>').click(resetTaskHandler);
	});
	$(".breadcrumb").append(function() {
	  return $('<a class="goldBtn">发邮件</a>').click(sendMailHandler);
	});
	$(".breadcrumb").append(function() {
	  return $('<a class="goldBtn">发送图片</a>').click(sendPicHandler);
	});	
	$(".breadcrumb").append(function() {
	  return $('<a class="goldBtn">本地打开</a>').click(printHandler);
	});
	$(".breadcrumb").append(function() {
	  return $('<a class="goldBtn">随手记数据</a>').click(feideeHandler);
	});
}
var pageInterval;
function setupListener() {
	构造日结表();
	构造月结表();
	分销统计表();
	做表头();

	$("#qbaoUtils table tbody").dblclick(function(){
		$("#t2 tr").each(function(){
			$(this).find(".hide").parent().hide();
		});
		$(this).selectText();

		snapshotTarget = $(this).parent();
		document.execCommand('copy');
		$("#t2 tr").each(function(){
			$(this).find(".hide").parent().show();
		});
	});
	startWork();
}

function startWork(){
	if(pageInterval != null){
		return;
	}
	pageInterval = setInterval(function(){
		statistics();
	},1000);
}
function nextPage(){
}

function addTDClickListener(){
	$("#qbaoUtils th, #qbaoUtils td").on("click", function(){
		$(this).selectText();
		document.execCommand('copy');
		log($(this).text() +" 已复制")
	});
}

function SortByName(a, b){
  var aName = parseFloat(a.p.toLowerCase())/100;
  var bName = parseFloat(b.p.toLowerCase())/100; 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function 结算日期排序(a, b){
  var aName = a.结算日期;
  var bName = b.结算日期; 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function sendMailHandler(){
	t = [];
	$("#t2 tbody,#t3 tbody,#t4 tbody,#t1 tbody").each(function(index){

			caption = $(this).parent().find("caption").text();
			Subject = caption + '['+getNowFormatDate()+']';
			body = $(this).parent().outerHTML();
			snapshotTarget = $(this).parent();

			var item = {};
			item.Subject = Subject;
			item.body = body;
			t[index]=item;
	});

	$.each(t,function(k, v){
		setTimeout(function(){
			sendMail(v.Subject, v.body, null);
		}, 1500*k);
	});
}

function sendPicHandler(){
	t = [];
	$("#t2 tbody,#t3 tbody,#t4 tbody,#t1 tbody").each(function(index){
			caption = $(this).parent().find("caption").text();
			Subject = "打印 ["+caption + '/'+getNowFormatDate()+']';
			body = $(this).parent();
			var item = {};
			item.Subject = Subject;
			item.body = body;
			t[index]=item;
	});

	$.each(t,function(k, v){
		setTimeout(function(){
			screenShot($(v.body), v.Subject, null);
		}, 1500*k);
	});
}

function printHandler(){
	t = [];
	$("#t2 tbody,#t3 tbody,#t4 tbody,#t1 tbody").each(function(index){
			caption = $(this).parent().find("caption").text();
			Subject = "打印 ["+caption + '/'+getNowFormatDate()+']';
			body = $(this).parent();
			var item = {};
			item.Subject = Subject;
			item.body = body;
			t[index]=item;
	});

	$.each(t,function(k, v){
		setTimeout(function(){
			print($(v.body))
		}, 1500*k);
	});
}
function feideeHandler(){
	t = [];
	$("#t2 tbody").each(function(index){

		$("#t2 tr").each(function(){
			$(this).find(".hide").parent().hide();

			$(this).find("td").each(function(index){
				if(index != 1 && index !=3){
					$(this).hide();
				}
			});
		});

		$(this).selectText();

		snapshotTarget = $(this).parent();
		document.execCommand('copy');
		$("#t2 tr").each(function(){
			$(this).find(".hide").parent().hide();

			$(this).find("td").each(function(index){
				if(index != 1 && index !=3){
					$(this).show();
				}
			});
		});
	});
}

function resetTaskHandler(){
	prePage = "";
	obj = {};
	array = [];

	进度表.clear().draw();
	日结表.clear().draw();
	月结表.clear().draw();

	startWork();
}
function openTaskHandler(){

	$.each(array,function(index,data){
		var delay=2000*index; 
		var joinedAllState = data.joinedAllState;
		if(joinedAllState != '今日未完成'){
			return;
		}
		log((index+1) + joinedAllState);
		setTimeout(function() {
			speak(index+1);
			seeProgress = data.seeProgress;

			openNewBackgroundTab(seeProgress);
		}, delay);
	});
}
function toPercent(data){
    var strData = parseFloat(data)*100;
    var ret = strData.toString()+"%";
    return ret;
}
var obj = {};
var array = [];
var nextPressed = false;
function statistics(){

	$(".box-content").each(function(index,data){
		fxId = $(data).find("a[data-id]").attr('data-id');

        if(obj.hasOwnProperty(fxId)){
            log("已抓取 " + fxId + "" + obj.hasOwnProperty(fxId));

            if(Object.keys(obj).length == 任务数 && pageInterval !=null){
                log('统计完毕');
                speak('统计完成，一共'+任务数+'个分销任务');
                notifyMe('统计完成，一共'+任务数+'个分销任务');

                window.clearInterval(pageInterval);
                pageInterval = null;

                绘制统计();

                log('启动逐一打开检测');
                openTaskHandler();
                return;
            }

            if(nextPressed == false){
                log('下一页');
                location.href='javascript:$(".data-paginator .next").click();';
                nextPressed = true;
            }
            return;
        }

        joinedName = $(data).find(".joined-name").text();
        分销任务地址 = $(data).find('.joined-name a').attr('href');

		taskType = $(data).find("a[data-id]").attr('task-type');
		保证金 =$(data).parent().find(".fr").text();
		保证金 = 保证金.replace(/[^\d\.]/g, '');

		任务数 = /共(.+)\s*条/.exec($(".data-status").text())[1];

		nextPressed = false;
		currentPage = $(".data-paginator .current").text();
		log('解析第'+currentPage+'页');

		seeProgress = "http://agent.qbao.com/user/task/seeProgress?userFxId=" + fxId + '&isSettled=' + isSettled + '&taskType='+taskType+'&siteMenus=11'

		joinedBt = $($(data).find(".joined-bt div")[0]).text();
		收益 = /(\S+)\s*元+/.exec(joinedBt)[1].trim();
		收益 = 收益.replace(/[^\d\.]/g, '');

		joinedBt2 = $($(data).find(".joined-bt div")[1]).text();
		宝券 = /(\S+)\s*宝券+/.exec(joinedBt2)[1].trim();
		宝券 = 宝券.replace(/[^\d\.]/g, '');
		宝券 = 宝券/100;

		joinedProgress1 = $($(data).find(".joined-progress > div")[1]).text();
		joinedProgress2 = $($(data).find(".joined-progress > div")[2]).text();

		progressPie = $($(data).find(".progress-pie span")[1]).text();

		position = index + 1;

		完成天数 = /([\d,]+)/.exec(joinedProgress1)[1];
		总共天数 = /([\d,]+)/.exec(joinedProgress2)[1];
		joinedProgress = 完成天数 + "/" +  总共天数;

		剩余天数 = 总共天数 - 完成天数;
		date = new Date();
		var 结算日期,结算日期STR;

		var joinedStatus =$(data).find(".joined-status").text().trim();
		log(joinedStatus);
		match = /\d+\D*\d+\D*\d+/.exec(joinedStatus);
		if(match != null){
			结算日期 = new Date(new Date(joinedStatus).getTime() + 1 * 86400000 );
			结算日期STR = 结算日期.getFullYear()+"-" + (结算日期.getMonth() + 1) + "-" + 结算日期.getDate();
		}
		else
		{
			结算日期 = new Date(date.setTime( date.getTime() + (剩余天数+1) * 86400000 ));
			结算日期STR = 结算日期.getFullYear()+"-" + (结算日期.getMonth() + 1) + "-" + 结算日期.getDate();
		}
		var joinedAllState = $(data).find(".joined-allState").text().trim();
		var item = {};
		item.p = progressPie;
		item.结算日期 = 结算日期;
		item.结算日期STR = 结算日期STR;
		item.收益 = 收益;
		item.宝券 = 宝券;
		item.保证金 = 保证金;

		item.分销任务地址=分销任务地址;
		item.分销任务名称 = joinedName;
		item.joinedAllState = joinedAllState;
		item.fxId = fxId;
		item.seeProgress = seeProgress;
		item.joinedProgress = joinedProgress;

		obj[fxId]=item;
		array[Object.keys(obj).length-1] = item;
	});

	var v = /共(.+)\s*条/.exec($(".data-status").text());
	if(v != null && v.length > 0){
		任务数 = v[1];
		$("#numTJ").text("[当前"+array.length+"条/合计"+任务数+"条]");	
	}
}

function 绘制统计(){
	var 日结小计 = {};
	var 月结小计 = {};
	var 领取小计 = {};

    print = [];
    i = 0;
	$.each(array, function(index,data){
	    print[i]=[
             null,
             data.fxId,
             data.收益,
             data.宝券,
             data.保证金,
             data.p + "[" + data.joinedProgress+"]",

             data.结算日期STR,
             "<a target='_blank' href='"+data.seeProgress+"'+><span class='title'>" + data.分销任务名称 + "</span></a>"
             ];
	    i++;

		key = getDate(data.结算日期);
		if(日结小计[key] == null){

			var 日结Item = {};
			日结Item.收益 = parseFloat(data.收益).toFixed(2);
			日结Item.宝券 = parseFloat(data.宝券).toFixed(2);
			日结Item.保证金 = data.保证金;
			日结小计[key] = 日结Item;
		}
		else
		{

			var 日结Item = 日结小计[key];
			日结Item.收益 = (parseFloat(日结Item.收益) + parseFloat(data.收益)).toFixed(2);
			日结Item.宝券 = (parseFloat(日结Item.宝券) + parseFloat(data.宝券)).toFixed(2);
			日结Item.保证金 = (parseFloat(日结Item.保证金) + parseFloat(data.保证金)).toFixed(2);
			日结小计[key] = 日结Item;
		}

		月结 = getMonth(data.结算日期);
		if(月结小计[月结] == null){

			var 月结Item = {};
			月结Item.收益 = parseFloat(data.收益).toFixed(2);
			月结Item.宝券 = parseFloat(data.宝券).toFixed(2);
			月结Item.保证金 = data.保证金;
			月结小计[月结] = 月结Item;
		}
		else
		{

			var 月结Item =月结小计[月结];
			月结Item.收益 = (parseFloat(月结Item.收益) + parseFloat(data.收益)).toFixed(2);
			月结Item.宝券 = (parseFloat(月结Item.宝券) + parseFloat(data.宝券)).toFixed(2);
			月结Item.保证金 = (parseFloat(月结Item.保证金) + parseFloat(data.保证金)).toFixed(2);
			月结小计[月结] = 月结Item;
		}

		领取 = data.分销任务名称+data.保证金;
		if(领取小计[领取] == null){

			var 领取Item = {};
			领取Item.分销任务名称 = data.分销任务名称;
			领取Item.分销任务地址 = data.分销任务地址;
			领取Item.保证金 = data.保证金;
			领取Item.宝券 = data.宝券;
			领取Item.领取个数 = 1;
			领取小计[领取] = 领取Item;
		}
		else
		{
			var 领取Item = 领取小计[领取];

			领取Item.领取个数 += 1;
			领取小计[领取] = 领取Item;
		}
	});
	printTable(进度表,print);

	日结表.clear().draw();
	var index = 0;
	i = 0;
	print = [];
	$.each(日结小计, function( k, v ) {
		等待时间 = DateDiff.inHours(new Date(),new Date(k));
	    print[i] = [
            null,
            k,
            "<span class='hide'>"+(等待时间 < 24? 等待时间 +"小时" : DateDiff.inDays(new Date(),new Date(k))+"天")+"</span>",
            toThousands(v.收益),
            toThousands(v.宝券),
            toThousands(v.保证金),
            "<span class='hide'>"+toThousands(parseFloat(v.保证金)+parseFloat(v.收益))+"</span>"
            ];
        i++;
	});
    printTable(日结表,print);

	月结表.clear().draw();
    i = 0;
    print = [];
	$.each(月结小计, function( k, v ) {
	  print[i] = [
			k,
			toThousands(v.收益),
			toThousands(v.宝券),
			toThousands(v.保证金)
        ];
      i++;
	});
    printTable(月结表,print);

	领取表.clear().draw();
    i = 0;
    print = [];
	$.each(领取小计, function( k, v ) {
	  var a = '<a target="_blank" href="' +v.分销任务地址+'"><span class="title">' + v.分销任务名称 + '</span></a>';
	  print[i]  = [
			a ,
			toThousands(v.保证金),
			v.领取个数,
			toThousands(v.保证金*v.领取个数)
			];
	  i++;
	});
    printTable(领取表,print);

	addTDClickListener();
}

function printTable(table,data){
    table.rows
    .add(print)
    .draw()
    .nodes()
    .to$()
    .addClass( 'new' );
}

function getDate(结算日期){
	return 结算日期.getFullYear()+"-" + (结算日期.getMonth() + 1) + "-" + 结算日期.getDate();
}
function getMonth(结算日期){
	return 结算日期.getFullYear()+"-" + (结算日期.getMonth() + 1);
}

function 做表头(){
	t1 = $('<table id="t1" class="hover stripe cell-border myTable" align="left"  cellspacing="0"></table>');

	caption = $('<caption style="display:none" align="left"></caption>');
	caption.append("进行中分销任务统计");

	t1.append(caption);

	thead = $('<thead></thead>');
	tfoot = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('编号');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('分销id');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('收益(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('宝券(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('保证金(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('进度');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('结算日期');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('分销地址');
	tr.append(th);

	thead.append(tr);
	$(t1).append(thead);

	tfoot = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	var i = 0;
	while(i < $(thead).find("th").length){
		i = i+1;
		th = $('<th align="left"></th>');
		tr.append(th);
	}

	tfoot.append(tr);
	$(t1).append(tfoot);

	$("#qbaoUtils").append(t1);
	进度表 = $('#t1').DataTable({
		paging: false,

		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
		{ 
			width: '25%',
			targets: 7 
		}
		],
        "order": [[3, 'desc']],

		"footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            total2 = api
                .column( 2 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            total3 = api
                .column( 3 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            total4 = api
                .column( 4 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            $( api.column( 2 ).footer() ).html(toThousands(total2));
            $( api.column( 3 ).footer() ).html(toThousands(total3));
            $( api.column( 4 ).footer() ).html(toThousands(total4));
        }
	});

	进度表.on( 'order.dt search.dt', function () {
        进度表.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
}

function 分销统计表(){
	t4 = $('<table id="t4" class="hover stripe cell-border myTable" align="left" cellspacing="0"></table>');
	caption = $('<caption style="display:none" align="left"></caption>');
	caption.append("分销领取统计");
	t4.append(caption);
	thead = $('<thead></thead>');
	tfoot2 = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('领取名称');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('保证金');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('个数');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('总额');
	tr.append(th);
	thead.append(tr);
	$(t4).append(thead);
	tfoot = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	var i = 0;
	while(i < $(thead).find("th").length){
		i = i+1;
		th = $('<th align="left"></th>');
		tr.append(th);
	}
	tfoot.append(tr);
	$(t4).append(tfoot);
	$("#right").append(t4);
	领取表 = $('#t4').DataTable({
		paging: false,
		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        },
		{ 
			width: '50%',
			targets: 0 
		}
		],
        "order": [[3, 'desc']],
		"footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            total1 = api
                .column( 2 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            total3 = api
                .column( 3 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            $( api.column( 2 ).footer() ).html(total1);
            $( api.column( 3 ).footer() ).html(toThousands(total3));
        }		
	});
}
function 构造日结表(){
	t2 = $('<table id="t2" class="hover stripe cell-border dt-head-left dt-body-left myTable" align="left" cellspacing="0"></table>');
	caption = $('<caption style="display:none" align="left"></caption>');
	caption.append("分销日结统计");
	t2.append(caption);

	thead = $('<thead></thead>');
	tfoot2 = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('编号');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('结算日期');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('等待');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('收益(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('宝券(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('保证金(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('结算后(元)');
	tr.append(th);

	thead.append(tr);
	$(t2).append(thead);

	tfoot = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	var i = 0;
	while(i < $(thead).find("th").length){
		i = i+1;
		th = $('<th align="left"></th>');
		tr.append(th);
	}

	tfoot.append(tr);
	$(t2).append(tfoot);

	$("#left").append(t2);

	日结表 = $('#t2').DataTable({
		paging: false,

		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[1, 'asc']],

		"footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            total3 = api
                .column( 3 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            total4 = api
                .column( 4 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            total5 = api
                .column( 5 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            $( api.column( 3 ).footer() ).html(toThousands(total3));
            $( api.column( 4 ).footer() ).html(toThousands(total4));
            $( api.column( 5 ).footer() ).html(toThousands(total5));
        }		
	});

	日结表.on( 'order.dt search.dt', function () {
        日结表.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = "<span class='hide'>"+(i+1)+"</span>";
        } );
    } ).draw();
}

function 构造月结表(){
	t3 = $('<table id="t3" class="hover stripe cell-border myTable" align="left" cellspacing="0"></table>');

	caption = $('<caption style="display:none" align="left"></caption>');
	caption.append("分销月结统计");

	t3.append(caption);

	thead = $('<thead></thead>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('结算月份');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('收益(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('宝券(元)');
	tr.append(th);

	th = $('<th align="left"></th>');
	th.append('保证金(元)');
	tr.append(th);

	thead.append(tr);
	$(t3).append(thead);

	tfoot = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	var i = 0;
	while(i < $(thead).find("th").length){
		i = i+1;
		th = $('<th align="left"></th>');
		tr.append(th);
	}

	tfoot.append(tr);
	$(t3).append(tfoot);

	$("#right").append(t3);

	月结表 = $('#t3').DataTable({
		paging: false,

		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[0, 'asc']],

		"footerCallback": function ( row, data, start, end, display ) {

            var api = this.api(), data;

            var intVal = function ( i ) {

                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            total1 = api
                .column( 1 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            total2 = api
                .column( 2 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            total3 = api
                .column( 3 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            $( api.column( 1 ).footer() ).html(toThousands(total1));
            $( api.column( 2 ).footer() ).html(toThousands(total2));
            $( api.column( 3 ).footer() ).html(toThousands(total3));
        }
	});
}

function getSelectHtml(){

	var selectionObj = window.getSelection();

	var rangeObj = selectionObj.getRangeAt(0);

	var docFragment = rangeObj.cloneContents();

	var testDiv = document.createElement("div");

	testDiv.appendChild(docFragment);

	var selectHtml = testDiv.innerHTML;	
	return selectHtml;

}

function GetSelectedText () {
	if (window.getSelection) {  
		var range = window.getSelection ();                                        
		alert (range.toString ());
	} 
	else {
		if (document.selection.createRange) { 
			var range = document.selection.createRange ();
			alert (range.text);
		}
	}
}

function notifyMe(info) {

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  else if (Notification.permission === "granted") {

    var notification = new Notification(info);
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
      if (permission === "granted") {

        var notification = new Notification(info);
      }
    });
  }
}