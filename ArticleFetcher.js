let blockRows = 7;

function GetQueryString(name)
{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

$(document).ready(function () {
    let articleID = GetQueryString("id");
    let content = "url的文章id" + articleID;
    $("#article-title").html(content);

    readFile("./articles/prophet/ch1.txt");
})

function readFile(filepath){
    console.log("reading");
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