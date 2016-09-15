/**
 * Created by Administrator on 2016/9/14.
 */
/**
 * Created by Administrator on 2016/9/14.
 */
$(function () {

    /******从cookies中取数据，加载到购物车*************/

    ajaxGetDate();
    function ajaxGetDate() {
        $.get("http://localhost:8081/allDate?pageCount=2", function (date) {
            var temp = eval("(" + date + ")");
            setDateOn(temp);
        })
    }

    function setDateOn(date) {
        $(".shopBox").empty();
        var oldCookie = cookieUtil.getCookie("shopCars");
        if (oldCookie) {
            var arrCookie = oldCookie.split("||");
            for (var i = 0; i < arrCookie.length; i++) {
                var arrSubCookie = arrCookie[i].split("&&");
                addDiv(arrSubCookie[0], arrSubCookie[1], arrSubCookie[2], date)

            }
        }
        setEvent();

    }

    function addDiv(page, size, count, date) {
        for (var i = 0; i < date.length; i++) {
            if (date[i].id == "no" + page) {
                break;
            }
        }
        var object = date[i];
        var arrU = object.url.split(",")[0];
        var dec = object.dec;
        var singP = parseInt(object.price.split(",")[0]);
        var shp1 = $(
            '<div class="'+'sn'+page+' shop1 ' +'" >' +
            '<ul>' +
            '<li class="shop110"><input class="check" type="checkbox" ></li>' +
            '<li class="shop470">' +
            '<img src="images/' + arrU + '">' +
            '<div class="imgR">' +
            '<span class="decro">' + dec + '</span>' +
            '<span class="shopSize">尺码： <i>' + size + '</i></span>' +
            '</div>' +
            '</li>' +
            '<li class="shop110">' +
            '<p id="singp">¥' + singP + '</p>' +
            '</li>' +
            '<li class="shop240">' +
            '<a href="#" class="jian">-</a>' +
            '<a href="#" class="shopC">' + count + '</a>' +
            '<a href="#" class="jia">+</a>' +
            '</li>' +
            '<li class="shop110">' +
            '<p id="allCount">¥' + (parseInt(count) * singP) + '</p>' +
            '</li>' +
            '<li class="shop140">' +
            '<span class="delete"></span>' +
            '</li>' +
            '</ul>' +
            '</div>'
        )
        $(".shopBox").append(shp1);
    }

    function setEvent() {
        $(".shop240 .jia").click(function () {
            addAnd($(this), 1)
        })
        $(".shop240 .jian").click(function () {
            addAnd($(this), -1);
        })
        $(".delete").click(function(){
            $(this).parent().parent().parent().remove();
            var oldCookie=cookieUtil.getCookie("shopCars");
            var page=parseInt($(this).parents(".shop1").attr("class").substring(2));
            var size=$(this).parent().siblings(".shop470").find(".shopSize i").text();
            var num=parseInt($(this).parent().siblings(".shop240").find(".shopC").text());

            updateCookie([page,size,-num],oldCookie,-num)


        })
        $(".shopBox .shop1 input.check").click(function(){
            checkAll()
        })
        $(".shopCon .tabUl input").click(function(){
            if($(this).prop("checked")){
                $(".shopBox .shop1 input.check").prop("checked",true);
            }else{
                $(".shopBox .shop1 input.check").prop("checked",false);
            }
            checkAll();
        })
    }

    // 加 和减
    function addAnd($this, num) {
        var sourNum = parseInt($this.siblings(".shopC").text());
        var finall = sourNum + num;
        if (finall<=0) {
            finall = 1;
        }
        var sinng=parseInt($this.parent().siblings(".shop110").find("#singp").text().substring(1));
        $this.siblings(".shopC").text(finall);
        $this.parent().siblings(".shop110").find("#allCount").html("¥" + (finall * sinng));

        checkAll();
        var oldCookie=cookieUtil.getCookie("shopCars");
        var page=parseInt($this.parents(".shop1").attr("class").substring(2));
        var size=$this.parent().siblings(".shop470").find(".shopSize i").text();
        updateCookie([page,size,num],oldCookie,num)
        console.log();
    }

    function updateCookie(arr, oldCookie, num) {
        var page = arr[0];
        var size = arr[1];
        var coun = arr[2];
        var arr1 = oldCookie.split("||");
        var flag = true;
        for (var i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split("&&");
            if (arr2[0] == page && arr2[1] == size) {
                flag = false;
                arr2[2] = parseInt(arr2[2]) + coun;
                if (arr2[2] == 0) {
                    arr1.splice(i, 1);
                } else {
                    arr1[i] = page + "&&" + size + "&&" + arr2[2];
                }
                break;
            }
        }
        if (flag) {
            oldCookie = oldCookie + "||" + page + "&&" + size + "&&" + coun;
            cookieUtil.setCookie("shopCars", oldCookie, 30);
        } else {
            var news = arr1.join("||");
            cookieUtil.setCookie("shopCars", news, 30);
        }
    }

    /*************  对总价进行计算***********/
    function checkAll(){
        var all=0;
        $(".shopBox .shop1").each(function(){
            $this=$(this);
            if($this.find("input.check").prop("checked")){
                   var sing=parseInt($this.find("#allCount").text().substring(1));
                   all+=sing;
            }
        })
        $(".shopCal .spL1 i").text("¥"+all);
    }


})