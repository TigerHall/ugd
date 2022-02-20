// 网站标题操作
(function () {
  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = "../../../js/1.svg";
  document.getElementsByTagName("head")[0].appendChild(link);
})();

var link =
  document.querySelector('link[rel*="icon"]') || document.createElement("link");
link.rel = "shortcut icon";

document.addEventListener("visibilitychange", function () {
  var t = 0;
  if (document.visibilityState == "hidden") {
    link.href = "../../../js/2.svg";
  } else {
    link.href = "../../../js/1.svg";
  }
  document.getElementsByTagName("head")[0].appendChild(link);
});

// 阅读时间
var c = 1;
OriginTitle = document.title;
function showLogin() {
  if (document.visibilityState == "hidden") {
  } else {
    c++;
    t = "测试";
    if (c > 3600) {
      h = parseInt(c / 3600);
      m = parseInt((c - h * 3600) / 60);
      s = c - h * 3600 - m * 60;
      t = h + "小时 - " + m + "分钟 - " + s + "秒";
    } else if (c > 60) {
      m = parseInt(c / 60);
      s = c - m * 60;
      t = m + "分钟 - " + s + "秒";
    } else {
      s = c;
      t = s + "秒";
    }
    document.title = OriginTitle + " 已阅读 " + t;
  }
}
setInterval("showLogin()", "1000");

// 添加元素

document.write("<div id=zhanwei><div id=mulu><a href=./OEBPS/Text/coverpage.xhtml>封面</a><a href=./OEBPS/Text/toc.xhtml>目录</a><a href=./OEBPS/Text/book-part1.xhtml>第1章</a><a href=./OEBPS/Text/book-part2.xhtml>第2章</a><a href=./OEBPS/Text/book-part3.xhtml>第3章</a><a href=./OEBPS/Text/book-part4.xhtml>第4章</a><a href=./OEBPS/Text/book-part5.xhtml>第5章</a><a href=./OEBPS/Text/book-part6.xhtml>第6章</a><a href=./OEBPS/Text/book-part7.xhtml>第7章</a></div></div>")