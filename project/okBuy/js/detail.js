/**
 * Created by Administrator on 2016/9/11.
 */
$(function () {

    var pp = parseInt(window.location.search.substring(window.location.search.indexOf("page") + 5));
    var size = 0;
    ajaxGet();


    /*********** 加入购物车 检查购物车   new***************/
    $(".proCar").click(function () {
        if (cookieUtil.getCookie("login")) {

            var str = $(".cart b").text();
            var begin = str.indexOf("(");
            var last = str.indexOf(")");
            var num = parseInt(str.substring(begin + 1, last));
            var total = num + parseInt($(".proCount ul li a").eq(1).text());
            $(".cart b").html("(" + total + ")");
            cookieUtil.setCookie("count", total, 20);
            addCookies(pp, size, parseInt($(".proCount ul li a").eq(1).text()))

        } else {
            alert("请先登录！！")
        }
    });

    /*********** 将详情页中的信息，存在cookies中 ***************/
    function addCookies() {
        var page = arguments[0];
        var size = arguments[1];
        var coun = arguments[2];
        var oldCookie=cookieUtil.getCookie("shopCars");
        var newCookie;
        if(oldCookie){
            updateCookie(arguments,oldCookie,1);
        }else{
            newCookie=page+"&&"+size+"&&"+coun;
            cookieUtil.setCookie("shopCars",newCookie,30);
        }
    }

    function updateCookie(arr,oldCookie,num){
        var page = arr[0];
        var size = arr[1];
        var coun = arr[2];
        var arr1 =oldCookie.split("||");
        var flag=true;
        for(var i=0;i<arr1.length;i++){
            var arr2=arr1[i].split("&&");
            if(arr2[0]==page&&arr2[1]==size){
                flag=false;
                arr2[2]=parseInt(arr2[2])+coun;
                if(arr2[2]==0){
                    arr1.splice(i,1);
                }else{
                    arr1[i]=page+"&&"+size+"&&"+arr2[2];
                }
              break;
            }
        }
        if(flag){
            oldCookie=oldCookie+"||"+page+"&&"+size+"&&"+coun;
            cookieUtil.setCookie("shopCars",oldCookie,30);
        }else{
            var news=arr1.join("||");
            cookieUtil.setCookie("shopCars",news,30);
        }
    }

    /**** 对商品的数量进行操作*  new**/
    $("#bgf9J").click(function () {
        var count = parseInt($(".proCount ul li a").eq(1).text());
        count--;
        if (count < 1) {
            count = 1;
        }
        $(".proCount ul li a").eq(1).text(count);
    })
    $("#bgf9add").click(function () {
        var count = parseInt($(".proCount ul li a").eq(1).text());
        count++;
        $(".proCount ul li a").eq(1).text(count);
    })
    /*********通过传过来的id 来  ajax获取服务器上的数据*****************/
    function ajaxGet() {
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
                    setDateOn(temp);
                    getLastDate();
                } else {

                    alert("连接错误，错误码：" + xhr.status);
                }
            }
        }
        xhr.open("get", "/allDate?pageCount=3");
        xhr.send();
    }

    function setDateOn(result) {
        var set;
        for (var i = 0; i < result.length; i++) {
            if (result[i].id == "T" + pp) {
                console.log(result[i]);
                set = i;
                break;
            }
        }
        var object = result[i];
        var dec = object.dec;
        var arrSize = object.price.split(",");
        var arrTemp = object.url.split(",");
        var num = parseInt(arrTemp[1]);
        //设置尺码  new

        for (var i = 0; i < arrSize.length; i++) {
            $(".sizeIn ul").append($(
                '<li><a href="#">' + arrSize[i] + '</a>' +
                '<i></i>' +
                '</li>'
            ))
        }
        $(".sizeIn ul li").click(function () {
            size = $(this).text();
            $(".sizeIn ul li i").css("display", "none");
            $(this).find("i").css("display", "block");

        })

        //设置放大镜对应的图像
        $(".proActive .proup").text(dec);
        $(".one img").attr("src", "/images/three/" + "Tmid" + pp + "-1" + ".jpg");
        $(".the img").attr("src", "/images/three/" + "Tbig" + pp + "-1" + ".jpg");
        for (var i = 0; i < num; i++) {
            var temp = $(
                '<li>' +
                '<img src="' + '/images/' + arrTemp[0] + (i + 1) + '.' + arrTemp[2] + '">' +
                '<i class="hoh"></i>' +
                '</li>'
            )
            $(".tt").append(temp);
        }
        $(".tt li").each(function (i) {
            var $this = $(this);
            (function (index) {
                $this.mouseenter(function () {
                    $(".one img").attr("src", "/images/three/" + "Tmid" + pp + "-" + (index + 1) + ".jpg");
                    $(".the img").attr("src", "/images/three/" + "Tbig" + pp + "-" + (index + 1) + ".jpg");
                })
            })(i)
        })
        $(".prop1 img").attr("src", '/images/' + arrTemp[0] + 1 + '.' + arrTemp[2]);
        //设置下方评论区的图片展示
        for (var i = 0; i < 8; i++) {

            $(".bigP").append($(
                '<img src="' + 'images/three/' + 'tit' + pp + "-" + (i + 1) + '.jpg"/>'
            ))
        }
    }

    /************通过传过来的id 来  ajax获取前一页的相关的数据***************/
    function getLastDate() {
        $.get("/allDate?pageCount=2", function (date) {
            var temp = eval("(" + date + ")");
            var set;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].id == "no" + pp) {
                    set = i;
                    break;
                }
            }
            var object = temp[set];
            var arr1 = object.price.split(",");
            var price1 = arr1[0];      //现价
            var price2 = arr1[1];      //原价

            var dec = object.dec;      //描述

            $(".xianqing .prodName").text(dec);
            $(".propic2").text("¥" + price1);
            $(".propic3").text("¥" + price2);
            var zhe = (parseFloat(price1) / parseFloat(price2) * 10).toFixed(1);
            console.log(zhe);
            $(".propriz span").text(zhe + "折");


        })
    }

    /************放大镜***********************/
    var ione = $(".one"),
        ithe = $(".the"),
        itwo = $(".two img"),
        tthe = $(".the img");


    ione.mousemove(function (a) {
        var evt = a || window.event
        ithe.css('display', 'block')
        var ot = evt.clientY - ($(".one").offset().top - $(document).scrollTop()) - 112;
        var ol = evt.clientX - ($(".one").offset().left - $(document).scrollLeft()) - 149;
        if (ol <= 0) {
            ol = 0;
        }
        if (ot <= 0) {
            ot = 0;
        }
        if (ol >= 300) {
            ol = 300
        }
        if (ot >= 225) {
            ot = 225
        }
        $(".wai span").css({'left': ol, 'top': ot})
        var ott = ot / 450 * 900
        var oll = ol / 600 * 1200
        tthe.css({'left': -oll, 'top': -ott})
    })
    ione.mouseout(function () {
        ithe.css('display', 'none')
    })


});