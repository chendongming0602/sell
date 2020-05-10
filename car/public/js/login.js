$(function(){
    var $reg_text=$("[data-login=login]");//得到输入框的父元素
    var $login_button=$(".reg_btn");
    var $uname=$("#uname");
    var $upwd=$("#upwd");
    
    

    $reg_text.on("focus","input:not(:checkbox)",function(){//获得焦点，
        $(this).next("label").addClass("label_shang");
        $(this).css("border-color","#1c69d4")
    });
    
    $reg_text.on("blur","input:not(:checkbox)",function(){//失去焦点
        if($(this).val()==""){
            $(this).next("label").removeClass("label_shang")
            $(this).css("border-color","#757575")
        }
    });
    $(".bg_left>p").addClass("bg_p")//欢迎登录的 几个大字


    $login_button.click(function(){
        if($uname.val()==""){
            alert("用户名不能为空");
        }else if($upwd.val()==""){
            alert("用户密码不能为空");
        }else{
           $.ajax({
                url:"http://127.0.0.1:8080/user/login",
                type:"post",
                data:{
                uname:$uname.val(),
                upwd:$upwd.val(),
                },
                success: function(result) {
                    // open("http://127.0.0.1:5501/index.html","_self")
                    if(result.code==1){
                        location.replace("http://127.0.0.1:5500/public/index.html")
                    }else{
                        alert(result.msg)
                    } 
                    
                }
            });
        }
    })
})