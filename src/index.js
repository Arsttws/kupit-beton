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


const menu = document.querySelector('.bottom-menu')
var prevScroll = window.scrollY;
window.addEventListener('scroll', handleBottomMenu)
function handleBottomMenu() {
 var currentScroll = window.scrollY;
 if (prevScroll > currentScroll) {
   menu.classList.add('active')
 } else {
  menu.classList.remove('active')
 }
 prevScroll = currentScroll;
}

const modal = document.querySelector('.modal-window')
const openModal = document.querySelectorAll('.online-request')
const closeModal = document.querySelectorAll('.close-modal')
const overlay = document.getElementById('overlay')

openModal.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.add('active'),
    overlay.classList.add('active')
    document.body.style.overflowY = 'hidden'
  })
})
closeModal.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.remove('active'),
    overlay.classList.remove('active')
    document.body.style.overflowY = 'auto'
  })
})