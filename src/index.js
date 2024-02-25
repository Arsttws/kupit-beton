const wrapper = document.querySelector(".logo-slider-wrapper");
const slider = document.querySelector(".logo-slider");
const firstslideWidth = slider.querySelector(".logo-slide").offsetWidth;
const sliderChildrens = [...slider.children];
let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let slidePerView = Math.round(slider.offsetWidth / firstslideWidth);

sliderChildrens
  .slice(-slidePerView)
  .reverse()
  .forEach((slide) => {
    slider.insertAdjacentHTML("afterbegin", slide.outerHTML);
  });
// Insert copies of the first few slides to end of slider for infinite scrolling
sliderChildrens.slice(0, slidePerView).forEach((slide) => {
  slider.insertAdjacentHTML("beforeend", slide.outerHTML);
});
// Scroll the slider at appropriate postition to hide first few duplicate slides on Firefox
slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");

const dragStart = (e) => {
  isDragging = true;
  slider.classList.add("dragging");
  // Records the initial cursor and scroll position of the slider
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the slider based on the cursor movement
  slider.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  slider.classList.remove("dragging");
};
const infiniteScroll = () => {
  // If the slider is at the beginning, scroll to the end
  if (slider.scrollLeft === 0) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
    slider.classList.remove("no-transition");
  }
  // If the slider is at the end, scroll to the beginning
  else if (
    Math.ceil(slider.scrollLeft) ===
    slider.scrollWidth - slider.offsetWidth
  ) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.offsetWidth;
    slider.classList.remove("no-transition");
  }
  // Clear existing timeout & start autoplay if mouse is not hovering over slider
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the slider after every 2500 ms
  timeoutId = setTimeout(() => (slider.scrollLeft += firstslideWidth), 2500);
};
autoPlay();
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// const bubles = document.querySelector(".video-bubles");
// const bubleItem = document.querySelectorAll(".video-bubles > .item");
// const video = document.querySelectorAll(".videos > .video");
// bubles.addEventListener("click", (e) => {
//   if (e.target.closest(".item")) {
//     const buble = e.target.closest(".item");
//     const video = e.target.closest(".video");

//     bubleItem.forEach((e) => {
//       e.classList.remove("active");
//     });
//     buble.classList.add("active");
//     video.classList.add("active");
//   }
// });

const videoSlider = document.querySelector(".videos");
const videosContainer = document.querySelector(".videos-container");
const bubles = document.querySelectorAll(".video-bubles > .item");

function slideVideo(id) {
  videosContainer.style.left = -100 * id + "%";

  bubles.forEach((buble) => {
    buble.classList.remove("active");
  });

  bubles[id].classList.add("active");
}

for (let i = 0; i < bubles.length; i++) {
  bubles[i].addEventListener("click", () => {
    slideVideo(i);
  });
}

// const video = document.querySelectorAll(".videos-container > .video");
videosContainer.addEventListener("touchstart", handleTouchStart, false);
videosContainer.addEventListener("touchmove", handleTouchMove, false);

let x1 = null;

function handleTouchStart(e) {
  const firstTouch = e.touches[0];
  x1 = firstTouch.clientX;
}

function handleTouchMove(e) {
  if (!x1) return false;
  let x2 = e.touches[0].clientX;

  let difference = x2 - x1;

  if (difference > 0) {
    videosContainer.style.left = 0 + "%";
    bubles.forEach((buble) => {
      buble.classList.remove("active");
    });

    bubles[0].classList.add("active");
  } else {
    videosContainer.style.left = -100 + "%";
    bubles.forEach((buble) => {
      buble.classList.remove("active");
    });

    bubles[1].classList.add("active");
  }

  x1 = null;
}
