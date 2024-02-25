// const slider = document.querySelector(".logo-slider");
// const sliderContainer = document.querySelector(".logo-slider-container");

// let isPressed = false;
// let cursorXPosition;

// slider.addEventListener("mousedown", (e) => {
//   isPressed = true;
//   cursorXPosition = e.offsetX - sliderContainer.offsetLeft;
// });

// window.addEventListener("mouseup", () => {
//   isPressed = false;
// });
// slider.addEventListener("mouseup", () => {
//   slider.style.cursor = "grab";
// });

// slider.addEventListener("mousemove", (e) => {
//   if (!isPressed) return;
//   e.preventDefault();

//   sliderContainer.style.left = `${e.offsetX - cursorXPosition}px`;
//   bound();
// });

// function bound() {
//   const slider_rect = slider.getBoundingClientRect();
//   const cont_rect = sliderContainer.getBoundingClientRect();

//   if (parseInt(sliderContainer.style.left) > 0) {
//     sliderContainer.style.left = 0;
//   } else if (cont_rect.right < slider_rect.right) {
//     sliderContainer.style.left = `-${cont_rect.width - slider_rect.width}px`;
//   }
// }

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
