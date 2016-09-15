/**
 * Created by liqi on 2016/9/10.
 */
$(function () {
    var str = window.location.search;
    var page = parseInt(str.substring(str.indexOf("show") + 5)); //获取传过来的页码

    getDate();  //获取数据；

    /*********  设置列表上方的过滤效果*******************/
    $(".uls1 a").on("click", function () {
        var text = $(this).text();
        var textIndex = $(this).parents(".sex").index() - 1;
        var list = $(".sex");
        list.eq(textIndex).hide();

        $(".clearList span i").eq(textIndex).text(text);
        $(".clearList span").eq(textIndex).show();
        $(".hasSelected").show();

    })
    $(".clearList b").on("click", function () {
        $(".hasSelected").hide();
        $(".clearList span").hide();
        $(".sex").show();

    })
    $(".clearList em").on("click", function () {
        $(this).parent().hide();
        var index = $(this).parents("span").index();
        $(".sex").eq(index).show();
        var flag = true;
        $(".clearList span").each(function () {
                if ($(this).css("display") != "none") {
                    flag = false;
                }
            }
        )
        if (flag) {
            $(".hasSelected").hide();
        }
    })

    /****   通过ajax 获取列表中的数据******************/
    function getDate() {
        $.get("/allDate?pageCount=2", function (date) {
            var temp = eval("(" + date + ")");
            setDateOn(temp);
            fenye(temp);
        })
    }

    //根据首页传过来的show的数字来加载详情页的列表
    function setDateOn(result) {
        $(".listUL").empty();
        var set;
        for (var i = 0; i < result.length; i++) {
            if (result[i].id == "no" + page) {
                set = i;
                break;
            }
        }
       // console.log(result[set]);
        var object = result[set];
        var arr1 = object.url.split(",");
        var url1 = "/images/" + arr1[0];
        var url2 = "/images/" + arr1[1];
        var arr2 = object.price.split(",");
        var price1 = arr2[0];
        var price2 = arr2[1];
        var dec = object.dec;

        var li1 = $(
            '<li class="listNo1">' +
            '<a href="detail.html?page='+page+'">' +
            '<img class="list-top" src=' + url1 + '>' +
            '</a>' +
            '<span class="logobg">' +
            '<img class="list-mid" src=' + url2 + '>' +
            '</span>' +
            '<a class="list-tit1" href="#">' + dec +
            '</a>' +
            '<span class="list-pri">' +
            '¥<span class="reB">' + price1 + '</span>' +
            '<i>' + price2 + '</i>' +
            '</span>' +
            '</li>'
        )
        var frm = document.createDocumentFragment();
        for (var i = 0; i < 16; i++) {
            var li = li1.clone(true, true);   //参数1：复制元素上的事件处理函数，默认为false; 参数2：对事件处理程序和克隆元素的所有子元素的数据复制，默认为false;
            $(frm).append(li);
        }
        $(".listUL").append(frm);
    }

    /******分页获取数据*************/
    function fenye(result) {
        var sou = page;

        function reset(k){
            $(".fenyem ul li a").each(function(i){
                if(i!=k){
                    $(this).css({border:"1px solid #e8e8e8",color:"black"});
                }else{
                    $(this).css({border:"1px solid white",color:"red"});
                }
            })

        }
         //点击每个页数来获取数据
        $(".fenyem ul li a").each(function (i) {
            $this = $(this);
            (function (index) {
                $this.click(function (){
                    alert(index+"****"+sou);
                       reset(i);
                       page = (index + sou)>5?(index+sou-5):(index+sou);
                       setDateOn(result);
               })
            })(i)
        })
        //点击下一页按钮
        $("#next").click(function(){
             page++;
             page=page>5?1:page;
             setDateOn(result);
            var s;
            if(page-sou>=0){
                s=page-sou;
            }else{
                s=5+(page-sou);
            }
            reset(s);
        })
        //点击上一页按钮
        $("#last").click(function(){
            page--;
            page=page<1?5:page;
            setDateOn(result);
            var s;
            if(page-sou>=0){
                s=page-sou;
            }else{
                s=5+(page-sou);
            }
            reset(s);
        })

        $(".sureB").click(function(){
            var s=parseInt($(".txx1").val())-1;
            reset(s);
            page = (s + sou)>5?1:(s+sou);
            setDateOn(result);
        })

    }
})
