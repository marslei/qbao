function init() {
	log("init fenxiao_tongji.js");
	speak('分销统计');
	setupPage();
	setupListener();
	$("#adWraper table").dblclick(function(){
		$(this).find("tbody").selectText();
		document.execCommand('copy');
		sendMail('分销收益统计['+getNowFormatDate()+']',$(this).outerHTML(), null);
	});
}
init();
function setupPage() {
	$("#hallListId").append($("<div id='floatTips' class='footer2' style='width:100%;'/>"));
	$("#floatTips").append($("<div id='adWraper'/>"));
	$("#floatTips").append($("<a id='print' class='goldBtn'>本地打开</a>"));
}
var t ;
var pageInterval ;
function setupListener() {
	做表头();
	pageInterval = setInterval(function(){
		currentPage = $(".md_page_area_folio_current").text();
		test();
		log(currentPage);
	},500);
	$("#print").click(function(){
		log("打印");
		print($('#marsTable').parent());
	});
}
function 万元每天收益排序(a, b){
  var aName = parseFloat(a.万元每天收益);
  var bName = parseFloat(b.万元每天收益); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
//var array = [];
//var index = 0;
var obj = {};
function test() {
	//array = [];
	rows = $(".hall_list_data li");
	empty = true;
	currentIndex = 0;
	if (rows != null && rows.length) {
		$(rows).each(function() {
			url = $(this).find('a').attr('href');
			任务数 = /共(.+)\s*条/.exec($(".md_page_info").text())[1];
			if(obj.hasOwnProperty(url)){
				if(Object.keys(obj).length == 任务数 && pageInterval != null){
					log('统计完毕');
					window.clearInterval(pageInterval);
					pageInterval = null;
					speak('统计完成，一共'+任务数+'个任务');
					notifyMe('统计完成，一共'+任务数+'个任务');
					绘制统计();
//					window.scrollTo(0,document.body.scrollHeight+Number.MAX_SAFE_INTEGER);
					return;
				}
				return;
			}
			currentIndex ++;
			empty = false;
			任务名称 = $(this).find(".hall_list_data_title").text();
			收益 = $($(this).find(".hall_list_data_info .hall_list_data_label")[0]).find('.abs_word em').text().trim().replace(/[^\d\.]/g,'');
			保证金 = $($(this).find(".hall_list_data_info .hall_list_data_label")[2]).find('.hall_list_data_info_attr span').text().trim().replace(/[^\d\.]/g,'');
			任务天数 = $($(this).find(".hall_list_data_info .hall_list_data_label")[3]).find('.hall_list_data_info_attr span').text().trim().replace(/[^\d\.]/g,'');
			万元每天收益 = 收益 > 0 ? (((收益 / 保证金) / 任务天数) * 10000).toFixed(2) : 0;
			任务 = {};
			任务.任务名称 = 任务名称;
			任务.收益 = 收益;
			任务.保证金 = 保证金;
			任务.任务天数 = 任务天数;
			任务.万元每天收益 = 万元每天收益;
			任务.月_30天_收益率 = 万元每天收益*30/10000
			任务.年化收益率 = 万元每天收益*365/10000
			任务.年复利 = Math.pow(1.0 + 任务.月_30天_收益率, 12)-1;
			任务.url = url;
			obj[url]=任务;
		});
	}
	addTDClickListener();
	if(currentIndex >= $(rows).length){
		log("下一页");
		$(".md_page_area_fore_icon").click();
	}
}
function 绘制统计(){
    data = [];
    i = 0;
    $.each(obj, function(index,任务){
        data[i] = [null,
            "<a target='_blank' href='"+任务.url+"'+>" + 任务.任务名称 + "</a>",
            format(任务.收益),
            format(任务.保证金),
            任务.任务天数,
            format(任务.万元每天收益),
            toPercent(任务.月_30天_收益率),
            toPercent(任务.年化收益率),
            toPercent(任务.年复利)];
        i++;
    });
    t.rows.add(data)
    .draw()
    .nodes()
    .to$()
    .addClass( 'new' );
}
function addTDClickListener(){
	$("#marsTable th, #marsTable td").on("click", function(){
		$(this).selectText();
		document.execCommand('copy');
		log($(this).text() +" 已复制")
	});
}
function toPercent(data){
    var strData = parseFloat(data)*100;
    var ret = strData.toFixed(2).toString()+"%";
    return ret;
}
function format(num) {
    return (parseFloat(num).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
function 做表头(){
	statisticsTable = $('<table id="marsTable" align="left" width="95%" class="hover stripe" cellspacing="0"></table>');
	thead = $('<thead></thead>');
	tfoot = $('<tfoot></tfoot>');
	tr = $('<tr></tr>');
	th = $('<th align="left"></th>');
	th.append('编号');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('任务名称');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('收益(元)');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('保证金(元)');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('任务天数');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('万元日收益(元)');
	tr.append(th);
	th = $('<th align="left"></th>');
	th.append('月收益率(30天)');
	tr.append(th);
	thead.append(tr);
	th = $('<th align="left"></th>');
	th.append('年化收益率');
	tr.append(th);
	thead.append(tr);
	th = $('<th align="left"></th>');
	th.append('年化(复利)');
	tr.append(th);
	thead.append(tr);
	$(statisticsTable).append(thead);
	$('#adWraper').append(statisticsTable);
	t = $('#marsTable').DataTable({
		paging: false,
		"columnDefs": [ {
            "searchable": false,
            "orderable": false,
            "targets": 0
        } ],
        "order": [[5, 'desc']]
	});
	t.on( 'order.dt search.dt', function () {
        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
}
function speak(content) {
    var msg = new SpeechSynthesisUtterance(content);
	window.speechSynthesis.speak(msg);
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
