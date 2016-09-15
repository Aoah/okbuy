/**
 * Created by liqi on 2016/8/12.
 */
var cookieUtil = {

    getCookie: function (name) {
        var cookieValue;
        var cooks = document.cookie;
        console.log(cooks);
       // document.write(cooks);
        var cookStr = cooks.split("; ");

        for (var i = 0; i < cookStr.length; i++) {
            var cookArr = cookStr[i].split("=");
            if (cookArr[0] == name) {

                cookieValue = cookArr[1];
            }
        }
        return cookieValue;
    },

    setCookie: function (name, value, day) {
        var date = new Date();

        date.setDate(date.getDate() + day);
        document.cookie =name + "=" +value + "; " + "expires=" + date;
    },

    removeCookie: function (name) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = name + "=" + " " + "; expires" + date;
    }

}

