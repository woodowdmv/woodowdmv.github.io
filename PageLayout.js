let articlesAbstract = [];

let icons = {
    "water" : './pics/tapwater.png',
    "car":'./pics/car.png',
    "sweat":'./pics/sweatdrops.png'
};

$(document).ready(function () {
    loadArticles();

});

$(window).resize(function () {
});

function abstractOnClick(obj) {
    let id = obj[0].id;
    $(location).attr("href", "./read.html?id=" + id)
}

function loadArticles() {
    $.getJSON("./article_abstract.json", function (result) {
        articlesAbstract = result;
        renderArticlesAbstract();
    })
}

function renderArticlesAbstract() {
    if (articlesAbstract.length > 0) {
        let abstractsHTML = "";
        for (let i = 0; i < articlesAbstract.length; i++) {
            let abstract = articlesAbstract[i];
            let id = abstract.id;
            let title = abstract.title;
            let icon = abstract.icon;

            if(icon !== "hide"){
                let abstractText = textToHTML(abstract.abstract);

                let currentHTML = '<div class="column">\n' +
                    '                <div id="'+id+'" class="article_box" onclick="abstractOnClick($(this))">\n' +
                    '                    <div class="article_box_header">\n' +
                    '                        <img class="article_box_header_ico" src="'+icons[icon]+'"/>\n' +
                    '                        <div class="article_box_header_text">\n' +
                    title +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <div class="article_box_abstract">\n' +
                    abstractText+
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>'

                abstractsHTML += currentHTML;
            }
        }
        $("#articlesContainer").html(abstractsHTML);
    }
}

function textToHTML(text) {
    let splittedText = text.split(/\r?\n/);
    let extractedHTML = "";
    for (let i = 0; i < splittedText.length; i++) {
        extractedHTML += "<p>" + splittedText[i] + "</p>";
    }
    return extractedHTML;
}