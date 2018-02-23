prefix = /(https?:\/\/[^\/]+\/)/.exec(location.href)[1];
key = $.QueryString['key'];

body ="<a target='_blank' href='"+location.href + "'>"+document.title+"</a><hr/>";
$("body").find("img").each(function(index,data){
        loc = $(this).attr("file");
        console.log(loc);

        if(/^https?:.+$/.exec(loc) == null){
            return;
        }
		console.log(loc);
		body +="<img target='_blank' src='"+loc + "'/>"+loc+"<br/>";
});

$("a:contains('.torrent')" ).each(function(index, data){
        href = $(this).attr("href");
		href = prefix + href;
		console.warn(href);
        body +="<a target='_blank' href='"+href + "'>"+document.title+"</a>";

});
sendMail(key, body, null, function(){
    console.log("直接关闭!!");
    window.close();
});



$("#nv").remove();
$(".z").remove();
$("#ft").remove();
$(".hdc").remove();
$("#asx_text").remove();
$("#j-forum-list").remove();
$(".qd-top").remove();
$(".pbn").remove();
$(".zxy").remove();
$("iframe").remove();
