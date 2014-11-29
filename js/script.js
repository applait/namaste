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

  // One time calls; no strings attached (figuratively)
  $("body").removeChild(teaser);
  $("header").style.display = "block";
  $("footer").style.display = "block";

  // Set the first chapter to the view
  setChapter(1);

  // Set the event listener to process scroll events
  window.addEventListener("wheel", function (event) {
    if (Date.now() - timeDelta > 750) {
      timeDelta = Date.now();
      if(event.deltaY > 0) setChapter("next");
      if(event.deltaY < 0) setChapter("prev");
    }
  }, false);

  // Set the event listener to process navigation events
  var elements = document.querySelectorAll("#masthead div");
  for (var i in elements) {
    if (i == "item") break;
    elements[i].addEventListener("click", toggleSwitch, false);
  }
}


// Shitz get real with the chapter switch routines
var setChapter = function (index) {
  var activeChapter = $(".focus")
    , chapterNumber = "";

  if (Number.isInteger(parseInt(index, 10))) {
    chapterNumber = parseInt(index, 10);
  } else if (typeof index === "string") {
    // Check if any chapter is set to start with
    // Except for the first time, it's always set
    if (activeChapter) {
      chapterNumber = activeChapter.getAttribute("id");
    } else { chapterNumber = 0; }

    if (index === "next") {
      // If asked to go next, increase counter
      chapterNumber++;
    } else if (index === "prev") {
      // If asked to go prev, decrease counter
      chapterNumber--;
    } else return;
  } else return;

  // If the final value of the chapterNumber is within limits:
  if (chapterNumber >= 1 && chapterNumber <= 3) {
    // Unset the current active chapter
    if (activeChapter) activeChapter.classList.remove("focus");
    // Set the target active chapter
    var target = document.getElementById("" + chapterNumber);
    target.classList.add("focus");
    toggleSwitch(chapterNumber)
  }
}

// Pseudo-navigation bar switches, extened to handle chapters
var toggleSwitch = function (cue) {
  var element = document.querySelector("#masthead div.active");
  element.classList.remove("active");

  // Select the target element
  var target;

  // If the queue is a number, assign it as integer
  if (Number.isInteger(parseInt(cue, 10))) {
    target = $("#for" + parseInt(cue, 10));

    // Add active class to the target
    target.classList.add("active");
  } else if (typeof cue === "object") {
    target = cue.target;

    // Add active class to the target
    target.classList.add("active");
    // Set the correct chapter
    setChapter(target.getAttribute("id").split("for")[1]);
  } else return;
}
