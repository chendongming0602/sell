
(function(){
    $("[data-show=9]").on("mouseenter","img",function(){
        $(this).addClass("show_9_jq")
    });
    $("[data-show=9]").on("mouseleave","img",function(){
        $(this).removeClass("show_9_jq")
    });
    var none=document.querySelectorAll("[data-none=none]")//获取整个灰色背景的div
    for(var no of none){
        no.onmouseover=function(){
            var no=this;
            var div_none=no.children[0]
            div_none.className="none"
            var p=div_none.children[1]
            p.className="none_p"
            var a=div_none.children[2]
            a.className="none_a"
        };
    };

    for(var no of none){
        no.onmouseout=function(){
            var no=this;
            var div_none=no.children[0]
            div_none.className=""
            var p=div_none.children[1]
            p.className=""
            var a=div_none.children[2]
            a.className=""
        }
    };
})()

