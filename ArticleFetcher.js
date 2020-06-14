function GetQueryString(name)
{
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

$(document).ready(function () {
    let articleID = GetQueryString("id");
    let linkAddress = GetQueryString("linkAddress");
    if(articleID !== undefined){
        $.getJSON("./article_abstract.json", function (result) {
            for(let i = 0; i < result.length; i++){
                if($.trim(result[i].id.toString()) === $.trim(articleID)){
                    // 读取文字
                    readFile(result[i].address);
                    let title = result[i].title;
                    $("#article-title").html(title);

                    // 读取链接
                    if(result[i].additionalLink !== undefined){
                        let linksHTML = "";
                        let links = result[i].additionalLink;
                        for(let j = 0; j < links.length; j++){
                            let cellHTML =
                                "<div class='linkcell' " +
                                "onclick='redirectToLink($(this))' " +
                                "data-value='"+links[j].linkID+"'>"
                                + links[j].linkName +
                                "</div>";
                            linksHTML = linksHTML + cellHTML;
                        }
                        $("#additionalLinks").html(linksHTML);
                    }
                    break;
                }
            }
        })
    }
})

function redirectToLink(obj) {
    $(location).attr("href", "./read.html?id=" + $(obj).data("value"))
}

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