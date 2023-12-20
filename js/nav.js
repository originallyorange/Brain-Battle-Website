const lis = document.querySelectorAll("li");
const lbs = document.querySelectorAll(".lb");
const ul = document.querySelector("ul");
const lineDash = document.querySelector(".line-dash");

var dashOrigin = -35; 
var selectedLi = -35; //pixels
var speed = 500; //move this many pixels in one second.
var distance = 0;
var time = 0;

// Function to get the target position from the data attribute
function getTargetPosition(element) {
  return parseInt(element.getAttribute("data-position"));
}

// Function to set initial state based on the current page stored in sessionStorage
function setInitialState() {
  const currentPageIndex = parseInt(sessionStorage.getItem("currentPageIndex")) || 0;

  // Set initial state based on the current page index
  selectedLi = currentPageIndex * -250;
  dashOrigin = selectedLi;

  // Add active class to the corresponding menu item
  lis.forEach((li, index) => {
    if (index === currentPageIndex) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });

  // Initial animation for the corresponding lb
  TweenLite.to(lbs[currentPageIndex], 0.6, {
    y: -43,
    ease: Bounce.easeOut,
    delay: 1
  });
}

// Call the setInitialState function when the script is loaded
setInitialState();

// push all the bottom lines down.
function pushDownLb() {
  for (let k = 0; k < lbs.length; ++k)
    TweenLite.to(lbs[k], 0.5, {
      y: 0,
      ease: Power3.easeOut
    });
}

ul.addEventListener(
  "mouseleave",
  function (e) {
    if (e.relatedTarget) {
      distance = Math.abs(dashOrigin - selectedLi);
      time = distance / speed;
      dashOrigin = selectedLi;
      if (time) {
        // overlapping tweens would give a zero time
        TweenLite.to(lineDash, time, {
          strokeDashoffset: selectedLi,
          ease: Bounce.easeOut
        });
      } //if
    } //if
  },
  false
);

// Iterate through all list items
lis.forEach((li, i) => {
  li.addEventListener("mouseover", function () {
    const targetPosition = getTargetPosition(li);
    distance = Math.abs(targetPosition - dashOrigin);
    time = distance / speed;
    dashOrigin = targetPosition;
    if (time) {
      TweenLite.to(lineDash, time, {
        strokeDashoffset: targetPosition,
        ease: Bounce.easeOut
      });
    } //if
  });

  li.addEventListener("click", function () {
    const targetPosition = getTargetPosition(li);
    selectedLi = targetPosition;
    pushDownLb();
    // Remove the active class from all menu items
    lis.forEach(item => item.classList.remove("active"));
    // Add the active class only to the clicked menu item
    li.classList.add("active");

    // Store the current page index in sessionStorage
    sessionStorage.setItem("currentPageIndex", i);

    TweenLite.to(lbs[i], 0.5, {
      y: -43,
      ease: Bounce.easeOut
    });
  });
});