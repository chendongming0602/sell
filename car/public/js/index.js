$(function(){
                                                             //展示图片的切换
	var $show_ul=$(".show_button>ul")//获得按钮的父元素
	var $show=$(".show_button>ul>li a")//得到所有展示的按钮
	var $map=$(".show_map>ul>li>a>div")//得到所有展示图片的div
	$show_ul.on("click","a",function(){
		var $this=$(this)
		var $show_index=$show.index($this)
		if($show_index==0){
			show.call($(this),1);	
		}else if($show_index==1){
			show.call($(this),2);
		}else if($show_index==2){
			show.call($(this),3);
		}else if($show_index==3){
			show.call($(this),4);
		}else if($show_index==4){
			show.call($(this),5);
		}
	})
	function show(sum){//展示图片更换的总函数
		$($map[0]).css("background-image",`url(../image/index/show/show-1-${sum}.jpg)`);
		$($map[1]).css("background-image",`url(../image/index/show/show-2-${sum}.jpg)`);
		$($map[2]).css("background-image",`url(../image/index/show/show-3-${sum}.jpg)`);
		$($map[3]).css("background-image",`url(../image/index/show/show-4-${sum}.jpg)`);
		$($map[4]).css("background-image",`url(../image/index/show/show-5-${sum}.jpg)`);
		$($map[5]).css("background-image",`url(../image/index/show/show-6-${sum}.jpg)`);
	};

	//轮播图
	var $carousel_ul=$(".carousel_ul");//获取整个轮播ul
	var $left_arr=$(".left_arr")//获取左边按钮
	var $right_arr=$(".left_arr").next()//获取左边按钮
	var car_juli=100;//每次移动的距离
	var car_ci=4;//移动的次数
	var car_i=0//现在表示第几张
	var $carousel=$(".carousel")//最外层父元素
	var $center_ul=$(".center_arr")//小圆点的ul
	var $center_li=$center_ul.children()//小圆点的li
	
	function car_fun(to){                                          //轮播总函数
		if(to==undefined){//1.如果没有传值，默认是1
			to=car_i+1
		};


		if(car_i==0){                                                //11.右移 
			if(to>car_i){//12.如果是往左
				$carousel_ul.addClass("car_ul")//13.添加过度
			}else{//14.否则
				$carousel_ul.removeClass("car_ul")//15.移除过度
				$carousel_ul.css("left",`-${car_juli*car_ci}%`)//16.将图片移到第三张
				setTimeout(function(){
					car_fun(car_ci-1)//17.将路径移到第三张
				},100);
				return;
			};
		};

		car_i=to;//2.将外面的car_i重新赋值
		if(car_i==0){
			$carousel_ul.addClass("car_ul")//4.为ul添加过度  10.
		};
		$carousel_ul.css("left",`-${car_juli*car_i}%`);//3.设置该ul的移动距离
		$center_li.each(function(i,elem){
			$(elem).removeClass("center_arr_bg")//5.清除所有小圆点的背景
		});

		if(car_i==car_ci){//6.当到最后一张时
			car_i=0;//7.将图片调回第一张
			setTimeout(function(){
				$carousel_ul.removeClass("car_ul")//8.等第五张图片过度走完，清除过度
				$carousel_ul.css("left","0px")//9.跳第一张
			},1000)//10.需要等第五张走完才能执行
		};
		
		$center_li.each(function(i,elem){//为小圆点添加class
			if(i==car_i){
				$(elem).addClass("center_arr_bg")
			};
		});
	}


	                                                              //左右箭头
	$right_arr.click(function(){
		car_button(1)
	})
	var kaiguan=true;
	function car_button(n){
		if(kaiguan){
			car_fun(car_i+n);
			kaiguan=false;
			setTimeout(function(){
				kaiguan=true
			},1100)
		}
	}
	
	$left_arr.click(function(){
		car_button(-1)
	})
	

	                                                                //定时器自动调用
	var interval=3000
	var timer=setInterval(function(){
		car_fun()
	},3000)

	$right_arr.hover(
		function(){
			clearInterval(timer)
		},
		function(){
			timer=setInterval(function(){
				car_fun()
			},3000)
		},
	);
	$left_arr.hover(
		function(){
			clearInterval(timer)
		},
		function(){
			timer=setInterval(function(){
				car_fun()
			},3000)
		},
	);

	$center_ul.hover(
		function(){
			clearInterval(timer)
		},
		function(){
			timer=setInterval(function(){
				car_fun()
			},3000)
		},
	);

	                                                                   //小圆点
	var isee=true;
	$center_ul.on("click","li",function(){
		var $this=$(this)
		if(isee){
			if($this.prop("class")!=="bg_li_1 center_arr_bg"){
				car_fun($center_li.index($this))//当时点中元素的下标
				isee=false;
	 			setTimeout(function(){
	 				isee=true
	 			},500)
			}
		}

	});


	                                                               //数据跑动
	var $data_ul=$(".data_ul");
	$data_ul.on("mouseenter","img",function(){
		var $this=$(this)
		var $data_pp=$this.parent().next().next()
		var sum=$data_pp.html();
		sum=parseInt(sum)
		var item=setInterval(()=>{
			sum+=4
			$data_pp.html(sum)
		},)
		

		$(window).bind("DOMNodeInserted",(e)=>{
			if($data_pp.html()>parseInt($data_pp.next().html())){
				clearInterval(item)
				$data_pp.html(parseInt($data_pp.next().html()))
			}
		});

		$data_ul.on("mouseout","img",function(){
			clearInterval(item)
			$data_pp.html(parseInt($data_pp.next().next().html()))
		})
		
	})

	

})

