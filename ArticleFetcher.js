let blockRows = 7;

function GetQueryString(name)
{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

$(document).ready(function () {
    let articleID = GetQueryString("id");

    $.getJSON("./article_abstract.json", function (result) {
        for(let i = 0; i < result.length; i++){
            if($.trim(result[i].id.toString()) === $.trim(articleID)){
                readFile(result[i].address);
                let title = result[i].title;
                $("#article-title").html(title);


                break;
            }
        }
    })
})

function readFile(filepath){
    let text = $.ajax({
        url : filepath,
        async: false
    })

    let paragraphArray = text.responseText.split(/\r?\n/);

    let finalText = "";
    for(let i = 0; i < paragraphArray.length; i++){
        finalText += "<p>" + paragraphArray[i] + "</p>";
    }
    $("#testArticle").html(finalText);
}