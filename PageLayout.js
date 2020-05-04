

$(document).ready(function () {

})

$(window).resize(function(){
    //console.log($(document.body).width());
});

$(".article_box").click(function () {
    console.log("点击");
    $(location).attr("href", "./article.html?id=" + 143423)
})

