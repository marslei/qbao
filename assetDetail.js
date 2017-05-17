var 日支出表;
var 日收益表;
var 签到收益表;

function init() {
	console.log("init assetDetail.js");
	setupPage();
	setupListener();
}

init();

function setupPage() {
	location.href = 'javascript:$("a:contains(个人资产明细)").click();';
	
	var qbaoUtils = $("<div id='qbaoUtils'></div>");
	qbaoUtils.addClass("qbaoUtils");
	
	var numTJ = $("<div id='numTJ' class='time'></div>");
	log
	$(qbaoUtils).append(numTJ);
	log

	var left = $("<div id='left'></div>");
	left.addClass("floatLeft");
	$(qbaoUtils).append(left);
	log
	
	var right = $("<div id='right'></div>");
	right.addClass("floatRight");
	$(qbaoUtils).append(right);
	log
	
	log
	$(qbaoUtils).insertBefore(".site_frame_foot");log
	
	
	
	$("#p_assetType .access").append(function() {
	  return $('<a class="goldBtn">开始统计</a>').click(staticHandler);
	});
	
	$("#p_assetType .access").append(function() {
	  return $('<a class="goldBtn">发邮件</a>').click(handler3);
	});
	$("#p_assetType .access").append(function() {
	  return $('<a class="goldBtn">本地打开</a>').click(printHandler);
	});
}
function handler3(){
	t = [];
	$("#qbaoUtils").find("tbody").each(function(index){
			
			caption = $(this).parent().find("caption").text();
			Subject = caption + '['+getNowFormatDate()+']';
			body = $(this).parent().outerHTML();
			snapshotTarget = $(this).parent();
			
			var item = {};
			item.Subject = Subject;
			item.body = body;
			t[index]=item;
		log
	});
	
	$.each(t,function(k, v){
		setTimeout(function(){
			sendMail(v.Subject, v.body, null);
		}, 1500*k);
	});
}
function setupListener() {
	构造日收益表();
	构造签到收益表();
	构造日支出表();
	log
	
	
	$("#qbaoUtils").find("tbody").dblclick(function(){
		
		$(this).selectText();
		
		snapshotTarget = $(this).parent();
		document.execCommand('copy');
	});
}
var pageInterval;
function startWork(){
	if(pageInterval != null){
		return;
	}
	pageInterval = setInterval(function(){
		statistics();
	},500);	
}

function staticHandler(){
	prePage = "";
	obj = {};
	array = [];
	
	
	if(日支出表!=null){
		日支出表.clear().draw();
	}
	if(日收益表!=null){
		日收益表.clear().draw();
	}	
	if(签到收益表!=null){
		签到收益表.clear().draw();
	}
	startWork();
}

function printHandler(){
	t = [];
	$("#qbaoUtils tbody").each(function(index){
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

var obj = {};
var array = [];
var nextPressed = false;

function checkIsFinish(){
	流水数 =parseInt(/共搜索到(.+)\s*条/.exec($("span:contains(共搜索到)").text())[1]);
	if(Object.keys(obj).length ==流水数 && pageInterval !=null){
		console.log('统计完毕');
		speak('统计完成，一共'+流水数 +'条流水');
		notifyMe('统计完成，一共'+流水数 +'条流水');
		

		window.clearInterval(pageInterval);
		pageInterval = null;
		
		return true;
	}
	return false;
}
function statistics(){
	if(checkIsFinish() == true){
		return;
	}
	流水数 = /共搜索到(.+)\s*条/.exec($("span:contains(共搜索到)").text())[1];
	$(".dt-table tbody tr").each(function(index, data){
		流水号 = $($(this).find("td")[0]).text();
		
		if(obj.hasOwnProperty(流水号)){
			if(checkIsFinish()){
				return;
			}
			
			if(nextPressed == false){
				console.log('下一页');
				location.href='javascript:$(".dt-pagination a:last").click();';
				nextPressed = true;
			}
			return;
		}
		
		时间 = $($(this).find("td")[1]).text();
		时间 = /(\S+)\s+\S+/.exec(时间)[1];
		
		流水事项 = $($(this).find("td")[2]).text();
		转入= $($(this).find("td")[3]).text();
		转出= $($(this).find("td")[4]).text();
		
		
		nextPressed = false;
		currentPage = $(".dt-pagination .active").text();
		console.log('解析第'+currentPage+'页');
		
		log
		
		var item = {};
		item.时间=时间;
		item.流水事项=流水事项;
		item.转入=转入;
		item.转出=转出;

		obj[流水号]=item;

		array[Object.keys(obj).length-1] = item;
		
	});
	
	var 支出小计 = {};
	var 日收益小计 = {};
	var 日签到小计 = {};
	$.each(array, function(index,data){
		if(/.*(保证金|冻结|借记卡提现-可提现账户).*/.exec(data.流水事项) != null){
			return;
		}
		
		if(parseFloat(data.转出) < 0){
			
					
			key = data.时间;
			log
			if(支出小计[key] == null){
				
				var 支出Item = {};
				
				支出Item.时间=data.时间;
				支出Item.流水事项=data.流水事项;
				支出Item.转入=data.转入;
				支出Item.转出=data.转出;
				支出小计[key] =支出Item;
			}
			else
			{
				var 支出Item =支出小计[key];
				
				支出Item.转出= (parseFloat(支出Item.转出) + parseFloat(data.转出)).toFixed(2);
				支出Item.转入= (parseFloat(支出Item.转入) + parseFloat(data.转入)).toFixed(2);
				支出小计[key] =支出Item;
			}
			log
		}

		
		
		if(/.*(收益|奖励).*/.exec(data.流水事项) == null){
			log
			return;
		}

		key = data.时间;
		if(日收益小计[key] == null){
			
			var 日收益Item = {};
			
			日收益Item.时间=data.时间;
			日收益Item.流水事项=data.流水事项;
			日收益Item.转入=data.转入;
			日收益Item.转出=data.转出;
			日收益小计[key] =日收益Item;
		}
		else
		{
			var 日收益Item =日收益小计[key];
			
			日收益Item.转出= (parseFloat(日收益Item.转出) + parseFloat(data.转出)).toFixed(2);
			日收益Item.转入= (parseFloat(日收益Item.转入) + parseFloat(data.转入)).toFixed(2);
			日收益小计[key] =日收益Item;
		}
		
		
		if(/.*(签到).*/.exec(data.流水事项) == null){
			log
			return;
		}
		
		key = data.时间;
		if(日签到小计[key] == null){
			
			var 签到Item = {};
			
			签到Item.时间=data.时间;
			签到Item.流水时间=data.流水时间;
			签到Item.流水事项=data.流水事项;
			签到Item.转入=data.转入;
			签到Item.转出=data.转出;
			日签到小计[key] =签到Item;
		}
		else
		{
			var 签到Item =日签到小计[key];
			
			签到Item.转出= (parseFloat(签到Item.转出) + parseFloat(data.转出)).toFixed(2);
			签到Item.转入= (parseFloat(签到Item.转入) + parseFloat(data.转入)).toFixed(2);
			日签到小计[key] =签到Item;
		}
	});
	
	
	日支出表.clear().draw();
	$.each(支出小计, function( k, v ) {
		日支出表.row.add([
				null,
				v.时间,
				toThousands(v.转出)
				]
			).draw();
	});
	
	日收益表.clear().draw();
	$.each(日收益小计, function( k, v ) {
		发放日期 = new Date();
		发放日期.setTime(new Date(v.时间).getTime() + 2 * 86400000 );
		发放日期STR = 发放日期.getFullYear()+"-" + (发放日期.getMonth() + 1) + "-" + 发放日期.getDate();
		日收益表.row.add([
				null,
				v.时间,
				toThousands(v.转入),
				发放日期STR,
				toThousands(v.转入 * 0.06)
				]
			).draw();
	});
	签到收益表.clear().draw();
	$.each(日签到小计, function( k, v ) {
		签到收益表.row.add([
				null,
				v.时间,
				toThousands(v.转入)
				]
			).draw();
	});
	
	addTDClickListener();
	if(流水数!= null){
		$("#numTJ").text("[当前"+array.length+"条/合计"+流水数+"条]");	
	}
}	
function addTDClickListener(){
	$("#qbaoUtils th, #qbaoUtils td").on("click", function(){
		$(this).selectText();
		document.execCommand('copy');
		console.log($(this).text() +" 已复制")
	});
}

	
function 构造日支出表(){
	log
	t2 = $('<table id="t2" class="hover stripe cell-border dt-head-left dt-body-left myTable" align="left" cellspacing="0"></table>');
	
		
	caption = $('<caption style="display:none" align="left"></caption>');
	caption.append("【对账】日支出统计");
	
	t2.append(caption);
	
	thead = $('<thead></thead>');
	tfoot2 = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('编号');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('日期');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('转出(元)');
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
	log
	
	
	
	$("#left").append(t2);
	log
	log
	

	日支出表= $('#t2').DataTable({
		paging: false,
		log
		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[1, 'asc']],
		
		
		"footerCallback": function ( row, data, start, end, display ) {
			log
            var api = this.api(), data;
 
            log
            var intVal = function ( i ) {
				log
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            log
            total2 = api
                .column( 2 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            $( api.column( 2 ).footer() ).html(toThousands(total2));
        }		
	});
	
	
		
	日支出表.on( 'order.dt search.dt', function () {
        日支出表.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = "<span class='hide'>"+(i+1)+"</span>";
        } );
    } ).draw();
	
}
function 构造日收益表(){
	log
	t3= $('<table id="t3" class="hover stripe cell-border dt-head-left dt-body-left myTable" align="left" cellspacing="0"></table>');
	
		
	caption = $('<caption style="display:none" align="left"></caption>');
	caption.append("【对账】日收益表统计");
	
	t3.append(caption);
	
	thead = $('<thead></thead>');
	tfoot2 = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('编号');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('日期');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('转入(元)');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('发放日期');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('推广收益(元)');
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
	log
	
	
	
	$("#left").append(t3);
	log
	log
	

	日收益表= $('#t3').DataTable({
		paging: false,
		log
		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[1, 'asc']],
		
		
		"footerCallback": function ( row, data, start, end, display ) {
			log
            var api = this.api(), data;
 
            log
            var intVal = function ( i ) {
				log
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            log
            total2 = api
                .column( 2 )
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
            log
			log
            $( api.column( 2 ).footer() ).html(toThousands(total2));
            $( api.column( 4 ).footer() ).html(toThousands(total4));
            $( api.column( 1 ).footer() ).html(total2 > 0 ? "日均"+toThousands(total2/data.length) : "");
        }		
	});
	
	
		
	日收益表.on( 'order.dt search.dt', function () {
        日收益表.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = "<span class='hide'>"+(i+1)+"</span>";
        } );
    } ).draw();
	
}

function 构造签到收益表(){
	log
	t3= $('<table id="t4" class="hover stripe cell-border dt-head-left dt-body-left myTable" align="left" cellspacing="0"></table>');
	
		
	caption = $('<caption style="display:none" align="left"></caption>');
	caption.append("【对账】日签到收益统计");
	
	t3.append(caption);
	
	thead = $('<thead></thead>');
	tfoot2 = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('编号');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('日期');
	tr.append(th);
	
	th = $('<th align="left"></th>');
	th.append('转入(元)');
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
	log
	
	
	
	$("#right").append(t3);
	log
	log
	

	签到收益表= $('#t4').DataTable({
		paging: false,
		log
		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[1, 'asc']],
		
		
		"footerCallback": function ( row, data, start, end, display ) {
			log
            var api = this.api(), data;
 
            log
            var intVal = function ( i ) {
				log
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            log
            total2 = api
                .column( 2 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
            log
			log
            $( api.column( 1 ).footer() ).html(total2>0 ? "日均"+toThousands(total2/data.length) : "");
            $( api.column( 2 ).footer() ).html(toThousands(total2));
        }		
	});
	
	
		
	签到收益表.on( 'order.dt search.dt', function () {
        签到收益表.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = "<span class='hide'>"+(i+1)+"</span>";
        } );
    } ).draw();
	
}