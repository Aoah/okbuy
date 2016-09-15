/**
 * Created by liqi on 2016/9/4.
 */
window.onload = function () {


    var top = document.querySelectorAll(".myll");  //登录栏动画
    var is = document.querySelectorAll(".navL i");
    var nolist = document.querySelector(".noticeList");


    var tupian = $(".Slid .slid1");  //获取轮播图的每个引用
    var count = 0;   //设置轮播图的序号
    banner();   //轮播图开始
    ballBanner(count);



    listAjax(0)
    listAjax(1)    //首页list  的界面开始通过ajax请求 服务器的数据



      //新加人的内容
    /******************/
       $(".navwrap li .cur").attr("href","index.html");

     /******检查登录注册***********/
    checkLogin();
    function checkLogin(){
        var name=cookieUtil.getCookie("login");
        if(name){
            $(".topHead .nav .login").html(
                '<a href="#" >'+name+',</a>'+
                    '<a id="outLogin" href="#">'+"退出"+'</a>'
            )
            $("#outLogin").click(function(){
                cookieUtil.setCookie("login","",0);
                window.location.reload(true)
            })
           var count=cookieUtil.getCookie("count");
            if(count){
                $(".cart b").html("("+count+")");
            }else{

            }
        }
    }
    /*************检查购物车*************/
    $(".cart").click(function(){
        var name=cookieUtil.getCookie("login");
        if(name) {
             window.location="/shopCars.html"
        }else{

            alert("请先登录！！");
        }
    })





    /***************输入框获得焦点后就会 清空里面的默认数据*************/
    $("input[type='text']").each(function(i){
        var defaul=$(this).val();
        var $this=$(this);
        $this.focus(function(){
            if($this.val()==defaul){
                $this.val("");
            }
        });
        $(this).blur(function(){
            if($this.val()==""){
                $this.val(defaul);
            }
        });
    })

    /*头部的登录栏设置动画*/
    for (var i = 0; i < top.length; i++) {

        (function (index) {
            top[index].onmouseover = function () {
                top[index].style.background = "white";
                top[index].style.border = "1px solid #dcdcdc";
                top[index].style.padding = "0 8px"
                if (index == 4) {
                    top[index].style.borderBottom = "none";
                    nolist.style.display = "block";
                }
                if (index < 4) {
                    top[index].getElementsByTagName("div")[0].removeAttribute("class");
                    is[index + 1].style.visibility = "hidden";
                }
                if (index > 0) {
                    /*alert("dd");*/
                    is[index].style.visibility = "hidden";
                }
            }
            top[index].onmouseout = function () {
                top[index].style.background = "#f2f2f2";
                top[index].style.border = "none";
                // top[index].style.borderBottom="1px solid red";
                top[index].style.padding = "0 10px";
                if (index == 4) {
                    nolist.style.display = "none";
                }
                if (index < 4) {
                    top[index].getElementsByTagName("div")[0].setAttribute("class", "arrow");
                    is[index + 1].removeAttribute("style");
                }
                if (index > 0) {
                    is[index].removeAttribute("style");
                }
            }
        })(i);
    }
    /*选项卡*/
    $(".nnav .marauto .hoverh a").each(function (index) {
        var $this = $(this);
        (function (i) {
            $this
                .mouseenter(function () {
                    $this.css("color", "red");
                    $(".nav1Sub").eq(i).css("display", "inline");
                    /*  document.getElementsByClassName("nav1Sub")[index].s;
                     alert(index);*/
                })
                .mouseleave(function () {
                    $this.css("color", "white");
                    var clear = setTimeout(function () {
                        $(".nav1Sub").eq(i).css("display", "none");
                    }, 50)
                    $(".nav1Sub").eq(i)
                        .mouseenter(function () {
                            clearTimeout(clear);
                        })
                        .mouseleave(function () {
                            $(this).css("display", "none");
                        })
                })
        })(index);
    })

    /*******轮播图********/

    var clear

    function banner() {
        // tupian.eq(count + 1).css("display", "block");
        clear = setInterval(bannerChange, 2000);
    }

    function bannerChange() {
        // tupian.eq(count+1).css({display:"block",opacity:1});
        tupian.eq(count + 1 > 7 ? 0 : count + 1).css("display", "block");
        ballBanner(count + 1 > 7 ? 0 : count + 1);
        tupian.eq(count).animate({opacity: 0}, 1000, function () {
            tupian.eq(count).removeClass("show");
            var temp = count + 1;
            if (count + 1 > 7) {
                temp = 0;
            }

            /*console.log(temp);*/
            tupian.eq(temp).addClass("show");
            tupian.eq(temp).css("display", "block");
            tupian.eq(count).css({opacity: 1, display: "none"});
            count++;
            if (count > 7) {
                count = 0;
            }
        });

    }

    function bannerLeft() {
        tupian.eq(count - 1 < 0 ? 7 : count - 1).css("display", "block");
        ballBanner(count - 1 < 0 ? 7 : count - 1);
        tupian.eq(count).animate({opacity: 0}, 1000, function () {
            tupian.eq(count).removeClass("show");
            var temp = count - 1;
            if (count - 1 < 0) {
                temp = 7;
            }
            console.log(temp);
            tupian.eq(temp).addClass("show");
            tupian.eq(temp).css("display", "block");
            tupian.eq(count).css({opacity: 1, display: "none"});
            count--;
            if (count < 0) {
                count = 7;
            }
        });
    }

    $(".rightSlid").click(function () {
        clearInterval(clear);
        bannerChange();
        clear = setInterval(bannerChange, 2000);
    })
    $(".leftSlid").click(function () {
        clearInterval(clear);
        bannerLeft();
        clear = setInterval(bannerChange, 2000);

    })

    /***  对每个小灰球实现 ****/
    $(".slidNum i").each(function (index) {
        var $this = $(this);
        (function (i) {
            $this
                .mouseenter(function () {
                    clearInterval(clear);
                    tupian.eq(i).css("display", "block");
                    ballBanner(i);
                    tupian.eq(count).animate({opacity: 0}, 1000, function () {
                        tupian.eq(count).removeClass("show");
                        var temp = i;

                        tupian.eq(temp).addClass("show");
                        tupian.eq(temp).css("display", "block");
                        tupian.eq(count).css({opacity: 1, display: "none"});
                        count = temp;

                    });
                })
                .mouseleave(function () {
                    clear = setInterval(bannerChange, 2000);

                })
        })(index)


    })
    function ballBanner(index) {
        $(".slidNum i").each(function () {
            $(this).css({opacity: 0.4, background: "black"});
        })
        $(".slidNum i").eq(index).css({opacity: 1, background: "red"});

    }

    /***********通过ajax获取list的内容** i表示页数****************/


    function listAjax(i) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var temp = eval("(" + xhr.responseText + ")");
                    if(i==0) {
                        setDateOnList1(temp);
                    }else if(i==1){
                        setDateOnList2(temp);
                    }
                } else {
                    alert("连接错误，错误码" + xhr.status);
                }
            }
        }
        xhr.open("get", "/allDate?pageCount=" + i, true);
        xhr.send(null);
    }

    function setDateOnList1(result) {

        var c=Math.floor((Math.random()*5)+1);

        for (var i = 0; i < result.length; i++) {
            var test = result[i];
            var url = "/images/" + test.url;
            var arr1 = test.price.split(",");
            var arr2 = test.dec.split(",");
            var str =$('<li>' +
                '<a href="subIndex.html?show='+c+'">' +
                '<img src='+url+'>' +
                '<span class=\"tit tit1 \">'+arr1[0]+'</span>' +
                '<p class=\"tit tit2\">'+arr1[1]+'</p>' +
                '<p class=\"tit tit3\">'+arr1[2]+'</p>' +
                '<span class=\"time\">' +
                '<span class=\"day\"><i>'+arr2[0]+'</i>天</span><span class=\"hour\">' +
                '<i>'+arr2[1]+'</i>时</span>' +
                '<span class=\"minute\">' +
                '<i>'+arr2[2]+'</i>分</span>' +
                '<span class=\"second\">' +
                '<i>'+arr2[3]+'</i>秒</span>' +
                '<i class=\"mm\">'+arr2[4]+'</i>' +
                '</span>' +
                '<div class="bor-top"></div>'+
                    '<div class="bor-right"></div>'+
                    '<div class="bor-bot"></div>'+
                    '<div class="bor-left"></div>'+
                '</a>' +
                '</li>');
            $(".inList1 ul").append(str);
        }
        $(".inList1 ul a").each(function(){
            var height=$(this).height();
            var width=$(this).width();
            $(this).hover(function(){
                $(this).find(".bor-left, .bor-right").stop().animate({
                    height:height+"px"
                },300)
                $(this).find(".bor-top, .bor-bot").stop().animate({width:width+"px"},400);
            },function(){
                $(this).find(".bor-left, .bor-right").stop().animate({
                    height:0
                },600)
                $(this).find(".bor-top, .bor-bot").stop().animate({width:0},500);
            })
        })
    }
    function setDateOnList2(result){
        var c=Math.floor((Math.random()*5)+1);

        for(var i=0;i<result.length;i++){
            var test = result[i];
            var url = "/images/" + test.url;
            var arr1 = test.price.split(",");
            var arr2 = test.dec.split(",");
            var str=$('<li>'+
                '<a href="detail.html?show='+c+'">'+
                '<img src='+url+'>'+
                '<p class="lt1">'+arr1[0]+'<span>'+arr1[1]+'</span></p>'+
                '<span class="time time2">'+
                '<span class="day"><i>'+arr2[0]+'</i>天</span><span class="hour">'+
                '<i>'+arr2[1]+'</i>时</span>'+
                '<span class="minute">'+
                '<i>'+arr2[2]+'</i>分</span>'+
                '<span class="second">'+
                '<i>'+arr2[3]+'</i>秒</span>'+
                '<i class="mm">'+arr2[4]+'</i>'+
                '</span>'+
                '<div class="bor-top"></div>'+
                '<div class="bor-right"></div>'+
                '<div class="bor-bot"></div>'+
                '<div class="bor-left"></div>'+
                '</a>'+
                '</li>');
            $(".ul2").append(str);
        }
        $(".ul2 a").each(function(){
            var height=$(this).height();
            var width=$(this).width();
            $(this).hover(function(){
                $(this).find(".bor-left, .bor-right").stop().animate({
                    height:height+"px"
                },300)
                $(this).find(".bor-top, .bor-bot").stop().animate({width:width+"px"},400);
            },function(){
                $(this).find(".bor-left, .bor-right").stop().animate({
                    height:0
                },600)
                $(this).find(".bor-top, .bor-bot").stop().animate({width:0},500);
            })
        })
    }




    /************  ajax 请求list2的数据**************/











    /*********倒计时效果**********/
    setTime();
    function setTime(arr) {

        /* var day=arr[0];
         var shi=arr[1];
         var min=arr[2];*/
        var shi = 60;
        var day = 2;
        var min = 59;
        var sec = 59;
        var mm = 9;

        setInterval(function () {
            if (mm == 0) {
                mm = 9;
                $(".time .mm").html(mm);
                if (sec == 0) {
                    sec = 59;
                    $(".second i").html(sec);
                    if (min == 0) {
                        min = 59;
                        $(".minute i").html(59);
                        if (shi == 0) {
                            shi = 24;
                            $(".hour i").html(shi);
                            if (day == 0) {
                                $(".day i").html(0);
                            } else {
                                $(".day i").html(day);
                                day--;
                            }
                        } else {
                            $(".hour i").html(shi);
                            shi--;
                        }
                    } else {
                        $(".minute i").html(min);
                        min--;
                    }
                }
                else {
                    $(".second i").html(sec);
                    sec--
                }
            } else {
                $(".time .mm").html(mm);
                mm--
            }
        }, 100)

    }


}
