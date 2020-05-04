function GetQueryString(name)
{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

$(document).ready(function () {
    let articleID = GetQueryString("id");
    let content = "是内容呀" + articleID;
    $("#article-content").html(content)
})