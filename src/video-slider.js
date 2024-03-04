const videoSlider = document.querySelector(".videos");
const videosContainer = document.querySelector(".videos-container");
const bubles = document.querySelectorAll(".video-bubles > .item");

let i = 1;

function slideVideo(id) {
  videosContainer.style.left = -100 * id + "%";

  bubles.forEach((buble) => {
    buble.classList.remove("active");
  });

  bubles[id].classList.add("active");
}

for (let j = 0; j < bubles.length; j++) {
  bubles[j].addEventListener("click", () => {
    slideVideo(j);
    i = j + 1;
  });
}

// const video = document.querySelectorAll(".videos-container > .video");
videosContainer.addEventListener("touchstart", handleTouchStart, false);
videosContainer.addEventListener("touchmove", handleTouchMove, false);

let x1 = null;
const maxLeft = "-200%";

function handleTouchStart(e) {
  const firstTouch = e.touches[0];
  x1 = firstTouch.clientX;
}

function handleTouchMove(e) {
  if (!x1) return false;
  let x2 = e.touches[0].clientX;

  let difference = x2 - x1;

  if (difference > 5) {
    i--;
    if (videosContainer.style.left === "0%") {
      console.log(videosContainer.style.left);

      i = 1;
    }
    videosContainer.style.left = -100 * (i - 1) + "%";
    bubles.forEach((buble) => {
      buble.classList.remove("active");
    });

    bubles[i - 1].classList.add("active");
  } else if (difference < -5) {
    i++;
    if (videosContainer.style.left === maxLeft) {
      i = 3;
    }
    videosContainer.style.left = -100 * (i - 1) + "%";
    bubles.forEach((buble) => {
      buble.classList.remove("active");
    });

    bubles[i - 1].classList.add("active");
  }

  x1 = null;
}