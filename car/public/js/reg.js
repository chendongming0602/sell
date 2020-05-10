$(function(){
    var $reg_text=$("[data-reg=reg]");//得到输入框的父元素
    var $reg_button=$("#reg_button");//获取到注册的按钮
    var $uname=$("#uname");//获取用户名输入框
    var $upwd=$("#upwd");//获取密码输入框
    var $upwd_2=$("#upwd_2")//获取确认密码输入框
    var $phone=$("#phone");//获取手机号输入框
    var $man=$("#man");//获取到性别：男
    var $wman=$("#wman");//获取到性别：女
    var $note=$("#note");//获取短信的按钮
    var $ver=$("#ver");//获取短信输入框
    var $pdu=$("#pdu")//获取到协议单选按钮
    var num="";//接收验证码
    var sum_pd=false;//给ajax判断
    var upwd_pd=false;//给ajax判断
    var ver_pd=true;//给ajax判断
    var uname_verify=true;//给ajax判断
  
    $(".bg_left>p").addClass("bg_p");                                      //用户注册的 几个大字
    $reg_text.on("focus","[data-text=text]",function(){//                     所有获得焦点事件，
        $(this).css("border-color","#1c69d4")//为输入框添加边框颜色
        .next("label").addClass("label_shang");//移动占位符

    
    });

    $reg_text.on("blur","[data-text=text]",function(){//                      所有失去焦点事件，
        if($(this).val()==""){
            $(this).css("border-color","#888")//为输入框添加边框颜色
            .next("label").removeClass("label_shang")//移动占位符
            
        }
    });
    $uname.on("input",function(){
        var $this=$(this)                                     //用户名的正则判断事件
        var reg=/^[\w\u4e00-\u9fa5]{4,12}$/
        reg_reg.call($this,reg)//替换this 正则

        $.ajax({
            url:"http://127.0.0.1:8080/user/verify",
            type:"post",
            data:{
                uname:$uname.val(),  
            },
            success: function(result) {                            //判断用户名是否已经存在
                if(result==1){
                    $this.css("border-color","#d80808")//为输入框边框颜色变为红色
                    .next("label").css("color","#d80808")//占位符颜色
                    .parent().next().css({//提示文字
                        display:"block",
                        color:"#d80808"
                    }).html("该用户名已被注册");
                    uname_verify=false;
                }else{
                    $this.next(). parent().next()
                    .html("请输入4~12位不包含空格、特殊符号的用户名");
                    uname_verify=true; 
                };
            },
        });
    });
    
    $upwd.on("input",function(){                                          //密码的正则判断事件
        var $this=$(this)        
        var reg=/^[\w!@#$%^&*?.]{6,16}$/
        reg_reg.call($this,reg)//替换this 正则判断
       
        var upwd_a=$this.val()!==$upwd_2.val()
        var upwd_b=$upwd_2
        upwd_upwd.call($this,upwd_a,upwd_b)//替换this 调用密码是否相同的函数

        
    });
    $upwd_2.on("input",function(){                                         //确认密码相同的事件
        var $this=$(this)
        var upwd_a=$this.val()!==$upwd.val()
        var upwd_b=$this
        upwd_upwd.call($this,upwd_a,upwd_b)//替换this 调用共用函数
           
    })

    function upwd_upwd(upwd_a,upwd_b){                                  //  密码相同确认的共用函数
        var $this=$(this)
        if($upwd_2.val()!==""){//只有确认密码不为空时才调用这个函数
            if(upwd_a){//不通过时
                upwd_b.css("border-color","#d80808")//为输入框边框颜色变为红色
                .next("label").css("color","#d80808")//占位符颜色
                .parent().next().css({//提示文字
                    display:"block",
                    color:"#d80808"
                
                });
               upwd_pd=false;
            }else{
                upwd_b.css("border-color","#1c69d4")
                .next("label").css("color","#1c69d4")
                .parent().next().css("display","none")
                upwd_pd=true;
            }
        }
    }
   
    $phone.on("input",function(){                                         //手机号码的正则判断事件
        var reg=/^((\+86|0086)\s+)?1[3-8]\d{9}$/
        reg_reg.call($(this),reg) //替换this  正则
 
        if(reg.test($(this).val())){//手机号码验证通过按钮启用
            
            $note.attr("disabled",false)//开启按钮
            .css({
                background:"#0653b6",
                color:"#fff"
            });
        }else{
            $note.attr("disabled",true)//关闭按钮
            .css({
                background:"#ddd",
                color:"#b1b1b1"
            });
            
            
        }
    });

    


    
    $note.click(function(){                                           //短信按钮事件
        // do
        // out = Math.floor(Math.random()*10000);
        // while( out < 1000 )
        var $this=$(this)
        var n=4;//进行倒计时
        
        $this.attr("disabled",true)//关闭按钮
        .css({
            background:"#ddd",
            color:"#b1b1b1"
        })
        var ds=setInterval(function(){//定时器
           n--;
           if(n==0){
               clearInterval(ds);//删除定时器
               for(var i=0;i<4;i++){//随机生成4个数字
                    num+=Math.floor(Math.random()*9+1)
                };
                num=parseInt(num)//取整
                $ver.attr("disabled",false)//启用短信输入框
                .val(num)//给短信输入框传值
                $ver.css("border-color","#1c69d4")//短信输入框的颜色
                .next("label").css("color","#1c69d4")//改变提示符颜色
                $ver.parent().next().css("display","none")//短信提示文字
              
                

                if($ver.val()!==""){
                    $ver.css("border-color","#1c69d4")//为短信输入框添加边框颜色
                    .next("label").addClass("label_shang")//移动占位符
                    
                };
                $this.html("发送验证码")//结束后，将按钮的值该回来
                .attr("disabled",false)//开启按钮
                .css({
                    background:"#0653b6",
                    color:"#fff"
                });

            }else{
               $this.html(`正在读取中...(${n})`)//改变按钮值   
            };
        },1000);
    });

    $ver.on("input",function(){                                            //短信输入框判断事件
        var $this=$(this)
        if($this.val()==num){//输入框的值等于验证码时 (正确时)
           $this.css("border-color","#1c69d4")
           .next("label").css("color","#1c69d4")
           .parent().next().css("display","none")
           ver_pd=true;
        }else{
           $this.css("border-color","#d80808")//为输入框边框颜色变为红色
           .next("label").css("color","#d80808")//占位符颜色
           .parent().next().css({//提示文字
               display:"block",
               color:"#d80808"
           });
           ver_pd=false;
        }
   });


    function reg_reg(reg,reg_2){                                           //正则判断的总函数
        var $this=$(this)
        if(!reg.test($this.val())){//不通过时
            $this.css("border-color","#d80808")//为输入框边框颜色变为红色
            .next("label").css("color","#d80808")//占位符颜色
            .parent().next().css({//提示文字
                display:"block",
                color:"#d80808"
            });
            sum_pd=false
        }else{ 
            $this.css("border-color","#1c69d4")
            .next("label").css("color","#1c69d4")
            .parent().next().css("display","none")
           sum_pd=true; 
        };
    };

    $pdu.click(function(){                                               //协议选中判断事件
        if($(this).prop("checked")==true){
            $reg_button.prop("disabled",false)
            .css({
                background:"#0653b6",
                color:"#fff"
            })
        }else{
            $reg_button.prop("disabled",true)
            .css({
                background:"#ddd",
                color:"#999"
            })
        };
    });

    var sex=1                                                              //性别的判断
    $man.click(()=>{
        sex=1 
    });
    $wman.click(()=>{
        sex=0
    });
    
    
    
    
    $reg_button.click(function(){                            //注册事件（连接数据库）
            
        if($uname.val()==""||$upwd.val()==""||$upwd_2.val()==""||$phone.val()==""||$ver.val()==""){
            alert("注册信息不能为空")
        }else if(sum_pd==false||upwd_pd==false||ver_pd==false||uname_verify==false){
            alert("请再次确认注册信息")
        }else{
            $.ajax({
                url:"http://127.0.0.1:8080/user/reg",
                type:"post",
                data:{
                    uname:$uname.val(),
                    upwd:$upwd.val(),
                    phone:$phone.val(),
                    sex,
                    
                },
                success: function(result) {
                    if(result.code==1){
                        location.replace("http://127.0.0.1:5500/public/login.html")
                    }else{
                        alert(result.msg)
                    }
                }
            });
        }       
    });

    
})