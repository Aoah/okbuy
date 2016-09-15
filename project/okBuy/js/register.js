
$(function(){




            var check3=[];
          /***********ajax 获取验证码************/
          var code="";
          getChecked();
          function getChecked(){
              $.get("http://localhost:8081/getCode",function(date){
                 code=date;
                  $(".yangzhe").text(date);
              })
          }
          $(".change").click(function(){
              getChecked();
          })
          $(".yan1").blur(function(){
              var news=$(this).val();
               if(news==code){
                   $("#codeC").text("");
                   check3[2]=true;
               }else{
                   check3[2]=false;
                   getChecked();
                   $("#codeC").text("请输入正确的验证码！！")
               }
          })
              /*************点击注册按钮***********/
         $(".regist").click(function(){
             for(var i=0;i<check3.length;i++) {
                 if (!check3[i]) {
                     break;
                 }
             }
             if(i==3){
                 ajaxGetUp();
                 cookieUtil.setCookie("login",$("#phnum").val(),30);
                 window.history.back();
             }
         })
    /****************  密码安全级别设置  *************/

    $("#pps").keyup(function(){

        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");

        if(false==enoughRegex.test($(this).val())){
            $(".safeLine span").css("background","#d4d4d2");
        }else if(strongRegex.test($(this).val())){
            $(".safeLine span").css("background","#ff9b00")
        }else if(mediumRegex.test($(this).val())){
            $(".safeLine span").not(".safep3").css("background","#ff9b00")
        }else {
            $(".safep1").css("background","#ff9b00");
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
    /**********当注册手机号时 失去焦点就查找是否已被注册************/
    $("#phnum").on("blur",function(){
        var phone=$(this).val();
        var patten=/^[1-3]\d{10}$/;
        if(patten.test(phone)){
            ajaxCheck(phone);
        }else{
            $(".true").css("display","none");
            $("#ph1").text("请输入正确的11位手机号！")
        }

    })

    $("#pps").on("focus",function(){
           $(".safeLine").css("display","block");
         $("#pass").css("color","#999");
           $("#pass").text("请输入6-12位数字，字母，下划线");

    })

    $("#pps").blur(function(){
        if($(this).val().length<6){
            $("#pass").css("color","#d70057");
            $("#pass").text("密码最少6位");
            check3[1]=false
        }else{
            $("#pass").text("");
            check3[1]=true;
            $(".safeLine").css("display","none");
              $(".tru").css("display","block");

        }
    })


     /************ajax 验证手机号是否已经被注册*************/
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
                           $(".true").css("display","none");
                           $("#ph1").text("此手机号已使用")
                           check3[0]=false;
                       }else{
                           check3[0]=true;
                            $("#ph1").text("");
                           $(".true").css("display","block");
                       }
                 }else{
                     alert("连接错误，错误码："+xhr.status);
                 }
             }
         }
        xhr.open("get","http://localhost:8081/users?user="+result,true);
        xhr.send();
    }

    /***** ajax 提交注册信息  *****/
       function ajaxGetUp(){

           var name=$("#phnum").val();
           var poss=$("#pps").val();

           var object={
               user:name,
               possword:poss
           }
           ajaxSetDate(object);
       }
    function ajaxSetDate(object){
        var user=object.user;
        var possword =object.possword;
        $.get("http://localhost:8081/setUserInf?user="+user+"&"+"possword="+possword,function(date){

        })
    }
})