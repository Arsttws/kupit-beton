const slider = document.querySelector(".logo-slider");
const sliderContainer = document.querySelector(".logo-slider-container");

let isPressed = false;
let cursorXPosition;

slider.addEventListener("mousedown", (e) => {
  isPressed = true;
  cursorXPosition = e.offsetX - sliderContainer.offsetLeft;
});

window.addEventListener("mouseup", () => {
  isPressed = false;
});
slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab";
});

slider.addEventListener("mousemove", (e) => {
  if (!isPressed) return;
  e.preventDefault();

  sliderContainer.style.left = `${e.offsetX - cursorXPosition}px`;
  bound();
});

function bound() {
  const slider_rect = slider.getBoundingClientRect();
  const cont_rect = sliderContainer.getBoundingClientRect();

  if (parseInt(sliderContainer.style.left) > 0) {
    sliderContainer.style.left = 0;
  } else if (cont_rect.right < slider_rect.right) {
    sliderContainer.style.left = `-${cont_rect.width - slider_rect.width}px`;
  }
}
