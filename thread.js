prefix = location.href;
prefix = /(https?:\/\/[^\/]+\/)/.exec(prefix)[1];

body = "";
body +="<a href='"+location.href + "'>"+document.title+"</a><hr/>";
$("body").find("img").each(function(index,data){
        loc = $(this).attr("file");
        console.log(loc);

        if(/^https?:.+$/.exec(loc) == null){
            return;
        }
		console.log(loc);
		body +="<img src='"+loc + "'/>"+loc+"<br/>";
});

$("a:contains('.torrent')" ).each(function(index, data){
        href = $(this).attr("href");
		href = prefix + href;
		console.warn(href);
        body +="<a href='"+href + "'>"+document.title+"</a>";

});
sendMail("公司中秋福利,"+location.href, body, null);

setTimeout(function() {
    window.close();
}, 500);
