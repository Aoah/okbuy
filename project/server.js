/**
 * Created by liqi on 2016/8/30.
 */

var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();


/***********非常重要****************/
//创建application/x-www-form-urlencoded 编码解析
var urlencodeParser = bodyParser.urlencoded({extended: false})

//主页输出“hello world”
/*app.get("/",function(request,response){
 // response.append(200,{"Access-Control-Allow-Origin":"http://localhost:63342"});
 //response.set({"Content-Type": "text/plain","Access-Control-Allow-Origin":"http://localhost:63342"});
 console.log("主页  GET 请求");
 fs.readFile("backManage/back.html",function(err,data){
 if(err){
 return console.error(err);
 }else{
 console.log("datafad");
 console.log(data);
 response.write(data);
 }
 })
 })*/
app.use(express.static("backManage"));
app.use(express.static("okBuy"));

/*app.use(express.static("okBuy"));*/
// 默认进入网站首页

app.get("/", function (request, response) {
    fs.readFile("okBuy/index.html", function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            response.write(data);
        }
    })
})
//进入后端管理界面
app.get("/back.html", function (request, response) {
    fs.readFile("backManage/back.html", function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            response.write(data);
        }
    })
})
//   根据传来的pageCount来返回数据
app.get("/allDate", function (request, response) {
    var filePath="my"+request.query.pageCount+".json";
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            response.send(data.toString());
        }
    })

})

//get 请求  验证用户是否存在添加用户  //
app.get("/users",function(request,response){
    var name=request.query.user;
    fs.readFile("users.json",function(err,date){
        if(err){
            console.error(err)
        }else{
            var ob=JSON.parse(date);
            var flag=true;
            for(var i=0;i<ob.length;i++){
                if(ob[i].user==name){
                    console.log(ob[i].user);
                    flag=false;
                    break;
                }
            }
            if(flag){
                response.send(false);
            }else{
                response.send(true);
            }
        }
    })
})
//get 方法 验证用户名和密码
app.get("/checkInf",function(request,response){
      var name=request.query.user;
    var poss=request.query.possword;
    fs.readFile("users.json",function(err,date){
        if(err){
            console.error(err);
        }else{
            var ob=JSON.parse(date);
            var flag=true;
            for(var i=0;i<ob.length;i++){
                if(ob[i].user==name&&ob[i].possword==poss){
                    flag=false;
                    break;
                }
            }
            if(flag){
                response.send(false);
            }else{
                response.send(true);
            }
        }
    })
})
//get 方法    注册用户
app.get("/setUserInf",function(request,response){
    var  infor=JSON.stringify(request.query);
    console.log(infor);
    fs.readFile("users.json",function(err,date){
        if(err){
            console.error(err);
        }else{
            var source =date.toString();
            var temp;
            if(source[source.length-2]=="}"){
                temp=source.substring(0,source.length-2)+"},"+infor+"]";
            }else{
                temp="["+infor+"]"
            }
            fs.writeFile("users.json",temp,function(err,date){
                if(err){
                    console.error(err);
                }else{
                }
            })
        }
    })
    response.send(null);
})


//POST 请求 添加数据
app.post("/addData_post", urlencodeParser, function (request, response) {
    var filePath="my"+request.query.pageCount+".json";
    var str = JSON.stringify(request.body);

    fs.readFile(filePath, function (err, date) {
        if (err) {
            console.error(err);
        } else {
            var source = date.toString();
            /*var text = source.substring(2, source.length - 2);
             var arr = text.split("},{");*/
            var temp;
            if (source[source.length - 2] == "}") {
                temp = source.substring(0, source.length - 2) + "}," + str + "]";
            } else {
                temp = "[" + str + "]";
            }
            fs.writeFile(filePath, temp, function (err, date) {
                if (err) {
                    console.error(err);
                } else {

                }
            })
        }
    })
 /*   response.send();*/
})
//post 请求 删除数据
app.post("/removeData_post", urlencodeParser, function (request, response) {
    var filePath="my"+request.query.pageCount+".json";
    console.log(filePath);
    var arr2 = request.body["data[]"];
    var bool = Array.isArray(arr2);
    /*  console.log(bool);*/
    fs.readFile(filePath, function (err, date) {
        if (err) {
            console.error(err);
        } else {
            var source = JSON.stringify(JSON.parse(date));
            //  console.log("###################");
            /* console.log(typeof date);   //object
             console.log( Array.isArray(date));    //false;
             console.log(date instanceof  Object);  //true*/
            /*var source=date*/
            var text = source.substring(2, source.length - 2);
            var arr = text.split("},{");

            // console.log("arr****"+arr);
            if (bool) {
                for (var j = 0; j < arr2.length; j++) {
                    for (var i = 0; i < arr.length; i++) {
                        var begin = arr[i].indexOf("d") + 4;
                        var end = arr[i].indexOf(",") - 1;
                        var id = arr[i].substring(begin, end);
                        if (id == arr2[j]) {
                            arr.splice(i, 1);
                            i--;
                            // console.log("ddd"+bool);
                            break;
                        }
                    }
                }
            }else{
                for (var i = 0; i < arr.length; i++) {
                    var begin = arr[i].indexOf("d") + 4;
                    var end = arr[i].indexOf(",") - 1;
                    var id = arr[i].substring(begin, end);
                    if (id == arr2) {
                        //  console.log(arr2);
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            var strReturn;
            if(arr.length){
                // console.log( "not null"+"arr.length")
                strReturn = "[{" + arr.join("},{") + "}]";
            }else{
                strReturn="null";
                // console.log(strReturn+arr);
            }
            //console.log(strReturn);
            fs.writeFile(filePath, strReturn, function (err, date) {
                if (err) {
                    console.error(err);
                } else {

                }
            })
        }
    })
    response.send();
})
  /*******验证码生成接口*******/
  app.get("/getCode",function(require,response) {
      var chars = [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      var str = "";
      for (var i = 0; i < 4; i++) {
          var c = parseInt(Math.random() * chars.length);
          str+=chars[c];
      }
      response.send(str);
  })




var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址端口为", host, port);
})


