/**
 * Created by liqi on 2016/9/2.
 */

window.onload = function () {
    var table = document.getElementById("out");
    var tb = document.getElementById("bbb");
    var add = document.getElementById("add");
    var dele = document.getElementById("remove");
    var changed=document.getElementById("change");
    var update = document.getElementById("upd");
    var ye=0;

    /*update.onclick = ajaxGet(ye);*/
    add.onclick = addDate;
    dele.onclick = getDelDate;
    changed.onclick=upchange;
    $("#add2").click(function(){
        $("#allform").slideToggle();
    })
     /**********首頁管理中 的首頁分頁加載數據************/
     $("#collapseOne p").each(function(index){
           var $this=$(this);
         (function(i){
             $this.click(function(){
                 ye=i;
               //  alert(i);
                 ajaxGet(i);
             })
         })(index)
     })
    /************修改数据*************/

    function upchange() {
        $("#allform").slideToggle();
        var idTemp,urlTemp,priceTemp,decTemp;

        $("#bbb input").each(function () {
            if ($(this).prop("checked")) {
                var td1 = $(this).parent();
                idTemp = td1.next().html();
                urlTemp=td1.next().next().html();
                priceTemp=td1.next().next().next().html();
                decTemp=td1.next().next().next().next().html();
            }
        });
        del([idTemp]);
        $(".right form input:eq(0)").val(idTemp);
        $(".right form input:eq(1)").val(urlTemp);
        $(".right form input:eq(2)").val(priceTemp);
        $(".right form input:eq(3)").val(decTemp);
    }
    /***********判断全选复选框*****************/
    $("#allCheck").change(function(){
        var input=$(this);
        if(input.prop("checked")){
            $("#bbb input").each(function(){
                $(this).prop("checked",true);
            })
        }else{
            $("#bbb input").each(function(){
                $(this).prop("checked",false);
            })
        }
    });
    /***********前台向服務器提交删除数据的请求*****************/
    function getDelDate() {
        var arr = [];
        $("#bbb input").each(function () {
            if ($(this).prop("checked")) {
                var td1 = $(this).parent();
                var temp = td1.next().html();
                arr.push(temp);
            }
        });
        del(arr);
    }
    function del(arr) {
        var confin = {
            url: "http://localhost:8081/removeData_post?pageCount="+ye,
            data: {data: arr},
            type: "post",
            success: function (data) {
                alert("ddd");
                 ajaxGet(ye);
            }
        }
        $.ajax(confin);


    }
    /******** 通过ajax 获取后台的数据*************/
    function ajaxGet(i) {
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
                    if(temp){
                        setDate(temp);
                    }else{
                        alert("數據為空！！")
                        var count = tb.children.length;
                        for (var i = 0; i < count; i++) {
                            tb.removeChild(tb.children[0]);
                        }
                    }
                } else {
                    alert(xhr.status);
                    alert("连接错误");
                }
            }
        }
        xhr.open("get", "/allDate?pageCount="+i, true);
        xhr.send(null);
    }
    /*********将后台的数据渲染到界面上***************/
    function setDate(date) {
        var count = tb.children.length;
        for (var i = 0; i < count; i++) {
            tb.removeChild(tb.children[0]);
        }
        var frm = document.createDocumentFragment();
        for (var i = 0; i < date.length; i++) {

            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML = "<input type='checkbox' value=''>";
            tr.appendChild(td1);
            var td2 = document.createElement("td");
            td2.innerHTML = date[i]["id"];
            tr.appendChild(td2);
            var td3 = document.createElement("td");
            td3.innerHTML = date[i]["url"];
            tr.appendChild(td3);
            var td4 = document.createElement("td");
            td4.innerHTML = date[i]["price"];
            tr.appendChild(td4);
            var td5 = document.createElement("td");
            td5.innerHTML = date[i]["dec"];
            tr.onclick=function(){
                var $ch= $(this.firstChild.firstChild);
                if($ch.prop("checked")){
                    $ch.prop("checked",false);
                }else{
                    $ch.prop("checked",true);
                }
            }
            tr.appendChild(td5);
            frm.appendChild(tr);
        }
        tb.appendChild(frm);
    }
    /*********** 通过jquery 的post方法向后台添加数据********************/
    function addDate() {
        $("#allform").slideToggle();
        var id = $(".right form input:eq(0)").val();
        var url = $(".right form input:eq(1)").val();
        var price = $(".right form input:eq(2)").val();
        var dec = $(".right form input:eq(3)").val();
        var date = {
            id: id,
            url: url,
            price: price,
            dec: dec
        }
        ajaxAdd(date);
    }
    function ajaxAdd(date) {
        var confin = {
            url: "http://localhost:8081/addData_post?pageCount="+ye,
            data: date,
            type: "post",
            success: function (data) {
                ajaxGet(ye);
                if (data.msg) alert(data);
            }
        }
        $.ajax(confin);
    }
}

