/**
 * Created by sum123456 on 2016/9/11.
 */
$(function(){

   $("#name").blur(function(){
       ajaxCheck($(this).val())

   })
    $(".logn-2").click(function(){
        ajaxMatch();
    })
    /********当用户输入手机号 就去检查是否存这个手机号***********/
    function ajaxCheck(result){
        var xhr;
        if(window.XMLHttpRequest){
            xhr=new XMLHttpRequest()
        }else{
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    if(xhr.responseText=="true"){
                        $("#err").text("");
                    }else{
                       $("#err").text("用户不存在！")
                    }
                }else{
                    alert("连接错误，错误码："+xhr.status);
                }
            }
        }
        xhr.open("get","http://localhost:8081/users?user="+result,true);
        xhr.send();
    }
/*************** 检查用户名和密码是否匹配 ********************/
  function ajaxMatch(){
      $.get("http://localhost:8081/checkInf?user="+$("#name").val()+"&"+"possword="+$(".login-com").val(),function(date){
              if(date){
                  $("#err").text("");
                   loginSuccess();

              }else{
                  $("#err").text("密码错误！");
              }
      })
  };

  /**********  登录成功　在cookie 中设置标识，并回退到上一个界面*******/
    function loginSuccess(){
         cookieUtil.setCookie("login",$("#name").val(),30);
        window.history.back();

    }


})