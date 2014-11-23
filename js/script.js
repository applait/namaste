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

// Here's where the magic happens... look away!
html.addEventListener("mousemove", function (event) {
  logo.style.top = (height/2 - event.clientY)/50 + "px";
  logo.style.left = (width/2 - event.clientX)/50 + "px";
}, false);

// Click on the teaser section, and it goes p0o0f!
$("#teaser").addEventListener("click", function (event) {
  $("body").removeChild($("#teaser"));
});
