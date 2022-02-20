var gPosition = 0;
var gProgress = 0;
var gCurrentPage = 0;
var gPageCount = 0;
var gClientHeight = null;

const kMaxFont = 0;

function getPosition() {
  return gPosition;
}

function getProgress() {
  return gProgress;
}

function getPageCount() {
  return gPageCount;
}

function getCurrentPage() {
  return gCurrentPage;
}

/**
 * Setup the columns and calculate the total page count;
 */

function setupBookColumns() {
  var body = document.getElementsByTagName("body")[0].style;
  body.marginLeft = 0;
  body.marginRight = 0;
  body.marginTop = 0;
  body.marginBottom = 0;

  var bc = document.getElementById("book-columns").style;
  bc.width = window.innerWidth * 2 + "px !important";
  bc.height = window.innerHeight - kMaxFont + "px !important";
  bc.marginTop = "0px !important";
  bc.webkitColumnWidth = window.innerWidth + "px !important";
  bc.webkitColumnGap = "0px";
  bc.overflow = "visible";

  gCurrentPage = 1;
  gProgress = gPosition = 0;

  var bi = document.getElementById("book-inner").style;
  bi.marginLeft = "0px";
  bi.marginRight = "0px";
  bi.padding = "0";

  gPageCount = document.body.scrollWidth / window.innerWidth;

  // Adjust the page count to 1 in case the initial bool-columns.clientHeight is less than the height of the screen. We only do this once.2

  if (gClientHeight < window.innerHeight - kMaxFont) {
    gPageCount = 1;
  }
}

/**
 * Columnize the document and move to the first page. The position and progress are reset/initialized
 * to 0. This should be the initial pagination request when the document is initially shown.
 */

function paginate() {
  // Get the height of the page. We do this only once. In setupBookColumns we compare this
  // value to the height of the window and then decide wether to force the page count to one.

  if (gClientHeight == undefined) {
    gClientHeight = document.getElementById("book-columns").clientHeight;
  }

  setupBookColumns();
}

/**
 * Paginate the document again and maintain the current progress. This needs to be used when
 * the content view changes size. For example because of orientation changes. The page count
 * and current page are recalculated based on the current progress.
 */

function paginateAndMaintainProgress() {
  var savedProgress = gProgress;
  setupBookColumns();
  goProgress(savedProgress);
}

/**
 * Update the progress based on the current page and page count. The progress is calculated
 * based on the top left position of the page. So the first page is 0% and the last page is
 * always below 1.0.
 */

function updateProgress() {
  gProgress = (gCurrentPage - 1.0) / gPageCount;
}

/**
 * Move a page back if possible. The position, progress and page count are updated accordingly.
 */

function goBack() {
  if (gCurrentPage > 1) {
    gCurrentPage--;
    gPosition -= window.innerWidth;
    window.scrollTo(gPosition, 0);
    updateProgress();
  }
}

/**
 * Move a page forward if possible. The position, progress and page count are updated accordingly.
 */

function goForward() {
  if (gCurrentPage < gPageCount) {
    gCurrentPage++;
    gPosition += window.innerWidth;
    window.scrollTo(gPosition, 0);
    updateProgress();
  }
}

/**
 * Move directly to a page. Remember that there are no real page numbers in a reflowed
 * EPUB document. Use this only in the context of the current document.
 */

function goPage(pageNumber) {
  if (pageNumber > 0 && pageNumber <= gPageCount) {
    gCurrentPage = pageNumber;
    gPosition = (gCurrentPage - 1) * window.innerWidth;
    window.scrollTo(gPosition, 0);
    updateProgress();
  }
}

/**
 * Go the the page with respect to progress. Assume everything has been setup.
 */

function goProgress(progress) {
  progress += 0.0001;

  var progressPerPage = 1.0 / gPageCount;
  var newPage = 0;

  for (var page = 0; page < gPageCount; page++) {
    var low = page * progressPerPage;
    var high = low + progressPerPage;
    if (progress >= low && progress < high) {
      newPage = page;
      break;
    }
  }

  gCurrentPage = newPage + 1;
  gPosition = (gCurrentPage - 1) * window.innerWidth;
  window.scrollTo(gPosition, 0);
  updateProgress();
}

//Set font family
function setFontFamily(newFont) {
  document.body.style.fontFamily = newFont + " !important";
  paginateAndMaintainProgress();
}

//Sets font size to a relative size
function setFontSize(toSize) {
  document.getElementById("book-inner").style.fontSize =
    toSize + "em !important";
  paginateAndMaintainProgress();
}

//Sets line height relative to font size
function setLineHeight(toHeight) {
  document.getElementById("book-inner").style.lineHeight =
    toHeight + "em !important";
  paginateAndMaintainProgress();
}

//Enables night reading mode
function enableNightReading() {
  document.body.style.backgroundColor = "#000000";
  var theDiv = document.getElementById("book-inner");
  theDiv.style.color = "#ffffff";

  var anchorTags;
  anchorTags = theDiv.getElementsByTagName("a");

  for (var i = 0; i < anchorTags.length; i++) {
    anchorTags[i].style.color = "#ffffff";
  }
}

// 网页小图标
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
  var d = new Date();
  if (document.visibilityState == "hidden") {
    link.href = "../../../js/2.svg";
  } else {
    link.href = "../../../js/1.svg";
  }
  document.getElementsByTagName("head")[0].appendChild(link);
});

// 阅读时间
var c = 1;
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
    if (document.title.includes("秒")) {
    } else {
      OriginTitle = document.title;
    }
    document.title = OriginTitle + " 已阅读 " + t;
  }
}
setInterval("showLogin()", "1000");

// 添加目录

document.write("<div id=zhanwei><div id=mulu><a href=./OEBPS/Text/coverpage.xhtml>封面</a><a href=./OEBPS/Text/toc.xhtml>目录</a><a href=./OEBPS/Text/book-part1.xhtml>第1章</a><a href=./OEBPS/Text/book-part2.xhtml>第2章</a><a href=./OEBPS/Text/book-part3.xhtml>第3章</a><a href=./OEBPS/Text/book-part4.xhtml>第4章</a><a href=./OEBPS/Text/book-part5.xhtml>第5章</a><a href=./OEBPS/Text/book-part6.xhtml>第6章</a><a href=./OEBPS/Text/book-part7.xhtml>第7章</a></div></div>")