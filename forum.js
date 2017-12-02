prefix = location.href;
prefix = /(https?:\/\/[^\/]+\/)/.exec(prefix)[1];

function openxx(url, delay){
    setTimeout(function() {
        openNewBackgroundTab(url);
    }, delay);
}
$("body").find("a:contains('MP4')").each(function(index,data){
    getData(index, data);
});
$("body").find("a:contains('HD')").each(function(index,data){
   getData(index, data);
});
$("body").find("a:contains('WMV')").each(function(index,data){
    getData(index, data);
});
$("body").find("a:contains('ALL')").each(function(index,data){
   getData(index, data);
});

function getData(index,data){
    loc = $(data).attr("href");
    if(/^thread.+$/.exec(loc) == null){
        return;
    }
    loc = prefix + loc;
    console.log(loc);
    var delay=1500*index;
    openxx(loc, delay);
}