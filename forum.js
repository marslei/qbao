prefix = /(https?:\/\/[^\/]+\/)/.exec(location.href)[1];
index = 0;
var Q=new Array();

$("#nv").remove();
$(".z").remove();
$("#ft").remove();
$(".hdc").remove();
$("#asx_text").remove();
$("#j-forum-list").remove();
$(".qd-top").remove();
$(".pbn").remove();
$(".zxy").remove();
//$("#threadlist").siblings().remove();

function openNext(){
	delay = 100 * (index++);
    setTimeout(function() {
		url = Q.pop();
		if(url===undefined)
		{
			console.log("处理完了");
			nextPage();
			window.close();
		}
		else
		{
			console.log("处理"+index+":"+url);
            openNewBackgroundTab(url);
			openNext();
		}
    }, delay);
}

function getData(data){
    loc = $(data).attr("href");
    if(/^thread.+$/.exec(loc) == null){
        return;
    }
    loc = prefix + loc;
	return loc;
}

function isNotNull(v)
{
    return typeof v !== "undefined"
}

function isVain(s)
{
    if($.trim(s)==''){
        return true;
    }else{
        return false;
    }
}


function contains(raw, key)
{
    return raw.indexOf(key) != -1
}

interval = setInterval(function(){

    if($("body").find("tbody").size() > 0)
    {
       parse();
       window.clearInterval(interval);
    }
},1000);

keys= ["波多"];
function extractKey(raw)
{
    for (i = 0; i < keys.length; ++i) {
        // do something with `substr[i]`
        value = keys[i];
        if(contains(raw, value))
            {
                console.log(raw+"\t命中关键字:"+value);
                return value;
            }
    }
}

function parse()
{
	$("body").find("tbody").each(function(index,data){
		newtag = $(data).find(".new > em").text().trim();
		xst = $(data).find(".new > .xst");
		raw = $(xst).text();
        loc = getData(xst);
        itemkey = extractKey(raw);

		if(isNotNull(itemkey))
		{
			loc +="?key="+itemkey;
			Q.unshift(loc)
			console.log((Q.length) +":\tnewtag="+ newtag + $(xst).text() +"\tloc="+loc + "\tkey="+itemkey);
		}
	});
	openNext();
}
function nextPage()
{
	nxt = $("body").find("#fd_page_top > .pg >.nxt")
	loc = $(nxt).attr("href");
	window.open(loc,"_self")
}
