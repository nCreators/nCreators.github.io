function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}
function LoadedIframe() {
    const news = document.getElementById("news");
    news.style.width = news.contentWindow.document.body.scrollWidth + "px";
    news.style.height = news.contentWindow.document.body.scrollHeight + "px";
    // syncDelay(5000);
    console.log("iframe has resized");
}