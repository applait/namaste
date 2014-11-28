// Syntactic sugars, for write less, do more, no bloats.
var $ = function (selector) {
  return document.querySelector(selector);
}
var $$ = function (selector) {
  return document.querySelectorAll(selector);
}

// Minimalist landing page with semi interactive RepelJS
// https://gist.github.com/debloper/c8fd6c328d471fbec6e9
// =====================================================
// Set the element to select; the only moving part here
// Like literally...
var logo = $("#peek")
  , html = $("html");

// Take the viewport height/width into consideration
// @TODO: should be updated on window resize
var height = document.documentElement.clientHeight
  , width  = document.documentElement.clientWidth;

// Used later to decide Scroll Threshold
var scrollDelta = 0;

// Here's where the magic happens... look away!
html.addEventListener("mousemove", function (event) {
  logo.style.top = (height/2 - event.clientY)/50 + "px";
  logo.style.left = (width/2 - event.clientX)/50 + "px";
}, false);

// Click on the teaser section, and it goes p0o0f!
var teaser = $("#teaser");
teaser.addEventListener("click", function (event) {
  TweenLite.to(teaser, 0.5, {
    opacity: 0,
    delay: 0.1,
    onComplete: function () {
      $("body").removeChild(teaser);

      // Set the first chapter to the view
      setChapter(true);

      // Set the event listener to process scroll events
      window.addEventListener("wheel", function (event) {
        if ((scrollDelta * event.deltaY) < 0)
          scrollDelta = 0;

        scrollDelta += event.deltaY;
        if(scrollDelta > 40) setChapter(true);
        if(scrollDelta < -40) setChapter(false);
      }, false);
    }
  });
});


// Shitz get real with the view-chapters
// To start with, the container to put things in:
var setChapter = function (isForward) {
  var activeChapter = $(".focus")
    , chapterNumber = "";

  if (activeChapter) {
    chapterNumber = activeChapter.getAttribute("id");
  } else { chapterNumber = 0 }

  if (isForward) {
    chapterNumber++;
  } else {
    chapterNumber--;
  }

  if (chapterNumber >= 1 && chapterNumber <= 3) {
    if (activeChapter) activeChapter.classList.remove("focus");
    var target = document.getElementById("" + chapterNumber);
    target.classList.add("focus");
    scrollDelta = 0;
  }
}
