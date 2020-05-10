 const express=require("express");
var router=express.Router();
const pool=require("../pool.js");

//用户注册
router.post("/reg",(req,res)=>{
	var obj=req.body,code=400;
	for(var key in obj){
		code++;
		if(!obj[key]){
			res.send({code:code,msg:key+" required"});
			return;
		};
	};
	var sql="INSERT INTO car_user(uname,upwd,phone,sex) VALUES(?,md5(?),?,?)";
	pool.query(sql,[obj.uname,obj.upwd,obj.phone,obj.sex],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			//res.send({code:200,msg:"注册成功"});
			res.send({code:1,msg:"注册成功"});//跳转 想要跳转的页面
		}else{
			res.send({code:-1,msg:"注册失败"})
		}
	});
});


//验证用户名是否存在
router.post("/verify",(req,res)=>{
	var sql="SELECT uid FROM car_user WHERE uname=?";
	pool.query(sql,[req.body.uname],function(err,result){
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		};
	});
});

//用户登录

router.post("/login",(req,res)=>{
	var obj=req.body,code=400;
	for(var key in obj){
		code++;
		if(!obj[key]){
			res.send({code:code,msg:key+" required"});
			return;
		};
	};
	var sql="SELECT uid FROM car_user WHERE uname=? AND upwd=md5(?)";
	pool.query(sql,[obj.uname,obj.upwd],function(err,result){
		if(err) throw err
		if(result.length>0){
			//res.send({code:200,msg:"登录成功"});
				res.send({code:1,msg:"登录成功"});//跳转 想要跳转的页面
			}else{
				res.send({code:-1,msg:"用户名或者密码错误"});
		};
	});
});

//res.send("alert('登录成功');location.href='index.html'");

/*
//全部用户查询
router.get("/select",(req,res)=>{
	var sql="SELECT * FROM at_user";
	pool.query(sql,function(err,result){
		res.send(result);
	});
});



//删除数据
router.get("/delect",(req,res)=>{
	var sql="DELETE FROM at_user WHERE uid=?";
	pool.query(sql,[req.query.uid],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("删除成功");
		}else{
			res.send("删除失败");
		};
	});
});


//修改数据
router.post("/update",(req,res)=>{
	res.send("修改")
});
*/
module.exports=router;
