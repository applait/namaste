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
var timeDelta = Date.now();

// Here's where the magic happens... look away!
html.addEventListener("mousemove", function (event) {
  logo.style.top = (height/2 - event.clientY)/50 + "px";
  logo.style.left = (width/2 - event.clientX)/50 + "px";
}, false);

// Click on the teaser section, and it goes p0o0f!
// Leaving the directive to setup the stage async.
var teaser = $("#teaser");
teaser.addEventListener("click", function (event) {
  TweenLite.to(teaser, 0.5, {
    opacity: 0,
    delay: 0.1,
    onComplete: setupStage
  });
});

// post-teaser routines to set up the main content
var setupStage = function (args) {
  $("body").removeChild(teaser);
  $("header").style.display = "block";
  $("footer").style.display = "block";

  // Set the first chapter to the view
  setChapter(true);

  // Set the event listener to process scroll events
  window.addEventListener("wheel", function (event) {
    if (Date.now() - timeDelta > 750) {
      timeDelta = Date.now();
      if(event.deltaY > 0) setChapter(true);
      if(event.deltaY < 0) setChapter(false);
    }
  }, false);
}


// Shitz get real with the chapter switch routines
var setChapter = function (next) {
  var activeChapter = $(".focus")
    , chapterNumber = "";

  if (activeChapter) {
    chapterNumber = activeChapter.getAttribute("id");
  } else { chapterNumber = 0 }

  if (next) {
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

// Pseudo-navigation bar switches
var elements = document.querySelectorAll("#masthead div");
var toggleSwitch = function (event) {
  var element = document.querySelector("#masthead div.active");
  element.classList.remove("active");
  event.target.classList.add("active");
}
for (var i in elements) {
  if (i == "item") break;
  elements[i].addEventListener("click", toggleSwitch, false);
}
