var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";

function setDetails(imageURL, titleText) {
  // Tells browser to function conforms to most recent standard version of JS
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageURL);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

//Commented out code: There is a glitch if thumbnail is clicked before prev/next buttons
// function findIndex(thumbnailArray, imgName, property) {
//   "use strict";
//   for(var i = 0; i < thumbnailArray.length; i++) {
//     if(thumbnailArray[i][property] === imgName) return i;
//   }
//   return -1;
// }
//
// function buttonClickHandler() {
//   "use strict";
//   var thumbnailArray = getThumbnailsArray();
//   var thumbnailArrayLen = thumbnailArray.length;
//   var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
//   var curIndex = findIndex(thumbnailArray, detailImage.src, "href");
//
//   document.getElementById("prev-button").addEventListener("click", function(event) {
//     event.preventDefault();
//
//     curIndex-=1;
//
//     if(curIndex < 0) { //wrap around if index becomes negative
//       curIndex += thumbnailArrayLen;
//     }
//     curIndex = curIndex % thumbnailArrayLen;
//
//     setDetailsFromThumb(thumbnailArray[curIndex]);
//   });
//
//   document.getElementById("next-button").addEventListener("click", function(event) {
//     event.preventDefault();
//
//     curIndex = (curIndex+1) % thumbnailArrayLen; //wrap around if index is out of bounds
//
//     setDetailsFromThumb(thumbnailArray[curIndex]);
//   });
// }

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  // buttonClickHandler();
}

initializeEvents();

function findIndex(thumbnailArray, imgName, property) {
  "use strict";
  for (var i = 0; i < thumbnailArray.length; i++) {
    if (thumbnailArray[i][property] === imgName) return i;
  }
  return -1;
}

document.getElementById("prev-button").addEventListener("click", function(event) {
  event.preventDefault();

  var thumbnailArray = getThumbnailsArray();
  var thumbnailArrayLen = thumbnailArray.length;
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var curIndex = findIndex(thumbnailArray, detailImage.src, "href");

  curIndex -= 1;

  if (curIndex < 0) { //wrap around if index becomes negative
    curIndex += thumbnailArrayLen;
  }
  curIndex = curIndex % thumbnailArrayLen;

  setDetailsFromThumb(thumbnailArray[curIndex]);
});

document.getElementById("next-button").addEventListener("click", function(event) {
  event.preventDefault();

  var thumbnailArray = getThumbnailsArray();
  var thumbnailArrayLen = thumbnailArray.length;
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var curIndex = findIndex(thumbnailArray, detailImage.src, "href");

  curIndex = (curIndex + 1) % thumbnailArrayLen; //wrap around if index is out of bounds

  setDetailsFromThumb(thumbnailArray[curIndex]);
});
