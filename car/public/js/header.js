$(function(){
    $.ajax({
        url:"head.html",//被引入的文件名字
        type:"get",
        success: function(html) {//这个html参数就被引入的html代码
            $(html).replaceAll($("#header"));//然后放在接受那个页面的id为header中
            $(`<link rel="stylesheet" href="css/head.css"/>`).appendTo("head")//将被引入的css文件一起引入进来，放到head标签里面
            
        }
    })
			
		.then(function(){
        var $map=$("#map");//用户头像
        var $user=$(".user");//注册和登录文字
        var $nav=$(".nav");//导航栏
        
        $map.hover(
            function(){
                $user.css("height","150px");
                $nav.css("border-radius","5px 5px 0px 5px");
            },
            function(){
                $user.css("height","0px");
                $nav.css("border-radius","5px 5px 5px 5px");
            }
        );

        $user.hover(
            function(){
                $(this).css({
                    height:150,
                    background:"rgba(0,0,0,0.7)"
                });
                $nav.css("border-radius","5px 5px 0px 5px");
                
            },
            function(){
                $(this).css({
                    height:0,
                    background:"rgba(0,0,0,0.2)"
                });
                $nav.css("border-radius","5px 5px 5px 5px");
            },

            (function(){//通过判断url来决定显示的时哪个页面
                var url=location.pathname//绝对路径
                $(".nav_ul>li").children().each(function(i,elem){
                    $(elem).removeClass("nav_url")
                });
                if(url.indexOf("index")!==-1){
                    bg_url(0)
                }else if(url.indexOf("engine")!==-1){
                    bg_url(1)
                }else if(url.indexOf("seat")!==-1){
                    bg_url(2)
                }else if(url.indexOf("tyre")!==-1){
                    bg_url(3)
                }else if(url.indexOf("reg")!==-1||url.indexOf("login")!==-1){
                    bg_url(7)
                }
                function bg_url(e){
                    $(".nav_ul>li").children().each(function(i,elem){
                        if(e==i){
                            $(elem).addClass("nav_url")
                        }
                       
                    });
                };
                var $head=$("#header")
                var	top=$(document).scrollTop();//获取滚动条的高度
                    if(url.indexOf("index")!==-1){
                        $(window).scroll(function(){//滚轮控制导航栏
                            var	top=$(document).scrollTop();//获取滚动条的高度
                            if(top>750){
                                $head.addClass("header_a")
                            }else if(top<50){
                                $head.removeClass("header_a")
                            };
                        });
                    }else{
                        if(top<750){
                            $head.addClass("header_a")
                        }else if(top<50){
                            $head.removeClass("header_a")
                        }; 
                    } 
            })()
        );  
    });
   
})