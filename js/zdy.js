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
  if (document.visibilityState == "hidden") {
    var d = new Date();
    OriginTitle = document.title;
    link.href = "../../../js/2.svg";
  } else {
    document.title = OriginTitle;
    link.href = "../../../js/1.svg";
  }
  document.getElementsByTagName("head")[0].appendChild(link);
});

// 阅读时间

// function init() {
//   var d = new Date();
//   document.title = "Using Geochemical Data ⏱ " + d.toLocaleString();
//   setTimeout("init()", 1000);
// }

// 添加元素

var second = 0;
var minute = 0;
var hour = 0;
window.setTimeout("interval();", 1000);
function interval() {
  second++;
  if (second == 60) {
    second = 0;
    minute += 1;
  }
  if (minute == 60) {
    minute = 0;
    hour += 1;
  }
  document.form1.textarea.value = hour + "时" + minute + "分" + second + "秒";
  window.setTimeout("interval();", 1000);
}
