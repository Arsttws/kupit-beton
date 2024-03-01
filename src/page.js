const wrapper = document.querySelector(".photo-slider-wrapper");
const slider = document.querySelector(".photo-slider");
const firstslideWidth = slider.querySelector(".photo-slide").offsetWidth;
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
sliderChildrens.slice(0, slidePerView).forEach((slide) => {
  slider.insertAdjacentHTML("beforeend", slide.outerHTML);
});
slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");

const dragStart = (e) => {
  isDragging = true;
  slider.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  slider.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  slider.classList.remove("dragging");
};
const infiniteScroll = () => {
  if (slider.scrollLeft === 0) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
    slider.classList.remove("no-transition");
  } else if (
    Math.ceil(slider.scrollLeft) ===
    slider.scrollWidth - slider.offsetWidth
  ) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.offsetWidth;
    slider.classList.remove("no-transition");
  }
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
  if (window.innerWidth < 320 || !isAutoPlay) return;
  // if (!isAutoPlay) return;
  timeoutId = setTimeout(() => (slider.scrollLeft += firstslideWidth), 2500);
};
autoPlay();
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".navigation").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
});
document.querySelector(".nav-concrete").addEventListener("click", () => {
  document.getElementById("concrete-list").classList.toggle("active");
});
document.querySelector(".nav-to-rent").addEventListener("click", () => {
  document.getElementById("rent-second-list").classList.toggle("active");
});
document.getElementById("on-gravel").addEventListener("click", () => {
  document.getElementById("gravel-third").classList.toggle("active");
  document.getElementById("on-gravel").classList.toggle("active");
});
document.getElementById("on-crushed").addEventListener("click", () => {
  document.getElementById("crushed-third").classList.toggle("active");
  document.getElementById("on-crushed").classList.toggle("active");
});

window.addEventListener('scroll', () => {
  if(window.scrollY > 400) {
    document.querySelector('.scroll-to-top').classList.add('active')
    document.querySelector('.call-now-btn').classList.add('active')
  } else {
    document.querySelector('.scroll-to-top').classList.remove('active')
    document.querySelector('.call-now-btn').classList.remove('active')
  }
})
