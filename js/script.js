// O código deste arquivo foi pego do link de repositório abaixo
// https://github.com/tigercodes-io/scroll-suave

const menuLinks = document.querySelectorAll('.item-menu');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}

const header = document.querySelector("#header");

window.addEventListener('scroll',() => {
  if(window.scrollY >= 99) {
    header.classList.add('not-transparent');
  }else{
    header.classList.remove('not-transparent');
  }
});

const buttonMenu = document.querySelector('#mobile-menu');
const menu = document.querySelector('.menu');
const itemsMenu = document.querySelectorAll('.item-menu');

buttonMenu.addEventListener('click', () =>{
  menu.classList.toggle('menu-active');
  buttonMenu.classList.toggle('open');
  
  itemsMenu.forEach((element, index) => {

    element.classList.toggle('item-active');
    element.animate([
      { transform: 'translateX(100px)' },
    { transform: 'translateX(0)' }
    ], 
    {
      duration: index == 0 ? 300 : index * 300 + 300
    });
  });
});
