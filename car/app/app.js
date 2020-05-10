const express=require("express");

const bodyparser=require("body-parser");//body中间件
const userrouter=require("./router/user.js");//用户信息路由
const cors=require("cors");//解决跨域的中间件
var server=express();
server.listen(8080);
server.use(cors({//统一伪装跨域，之后不用再res.writeHead
	origin:["http://127.0.0.1:5501","http://127.0.0.1:5500","http://localhost:5501","http://localhost:5500","http://localhost:8080","http://127.0.0.1:8080"]
  }))
server.use(express.static("public/html"));//用户的静态资源

server.use(bodyparser.urlencoded({//body中间件
	extended:false
}));
server.use("/user",userrouter);//挂载用户信息路由