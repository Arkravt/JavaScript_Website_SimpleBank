'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');
const scrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const lazyImages = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnSliderRight = document.querySelector('.slider__btn--right');
const btnSliderleft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

///////////////////////////////////////
// Modal window
const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button => button.addEventListener('click', openModalWindow));

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


///////////////////////////////////////
// Scroll
/*
Любая точка на странице имеет координаты:
Относительно окна браузера – elem.getBoundingClientRect().
Относительно документа – elem.getBoundingClientRect() плюс текущая прокрутка страницы.
*/
scrollTo.addEventListener('click', function () {
  const section1Coords = section1.getBoundingClientRect();
  //Старый метод. Работает во всех браузерах.
  window.scrollTo({
    left: section1Coords.left + window.pageXOffset,
    top: section1Coords.top + window.pageYOffset,
    behavior: "smooth"
  });
  //Новый метод. Работает только в новых браузерах.
  // section1.scrollIntoView(
  //   {
  //     behavior: "smooth"
  //   });
});


///////////////////////////////////////
// Smooth page navigation
navLinks.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView(
      { behavior: 'smooth' }
    );
  }
});


///////////////////////////////////////
// Создание Вкладки
tabContainer.addEventListener('click', (e) => {
  const clickedTab = e.target.closest('.operations__tab');

  if (!clickedTab) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  operationsContent.forEach(cont => cont.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');

});


///////////////////////////////////////
// Анимация потускнения на панели навигации
// TARGET - тот элемент на который нажали
// CURRENTTARGET - тот элемент к которому прикреплен обработчик
// THIS - тот элемент к которому прикреплен обработчик (this = currentTarget)
const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const links = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('.nav__logo');
    const text = linkOver.closest('.nav').querySelector('.nav__text');

    links.forEach(el => {
      if (el !== linkOver) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
    text.style.opacity = this;
  }
};
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));
nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));


///////////////////////////////////////
// Sticky navigation  
// Bad solution, because scroll events happen every scroll
// const section1Coords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   };
// });

// Good solution - Intersection Observer API
// Intersection Observer API (IOA) позволяет приложению асинхронно наблюдать за пересечением элемента (target) с его родителем (root) или областью просмотра (viewport). 
//Другими словами, этот API обеспечивает вызов определенной функции каждый раз при пересечении целевого элемента с root или viewport.
const navHeight = nav.getBoundingClientRect().height;
const observerCallBack = function (entries, observer) {

  const entry = entries[0];

  //nav.classList.toggle('sticky'); ИЛИ
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  };

};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
};

const headerObserver = new IntersectionObserver(observerCallBack, observerOptions);
headerObserver.observe(header);


///////////////////////////////////////
// Плавное появление секций сайта
const allSections = document.querySelectorAll('.section');
const optionsObserverHeader = {
  root: null,
  threshold: 0.2
};
const callBackObserverSections = function (entries, sectionObserver) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(callBackObserverSections, optionsObserverHeader);

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});



///////////////////////////////////////
// Имплементация Lazy Loading для изображений
const callBackObserverLazyImages = function (entries, observerLazyImages) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observerLazyImages.unobserve(entry.target);
};

const observerLazyImagesOptions = {
  root: null,
  threshold: 0.7,
  rootMargin: '200px'
};

const observerLazyImages = new IntersectionObserver(callBackObserverLazyImages, observerLazyImagesOptions);
lazyImages.forEach(image => observerLazyImages.observe(image));


///////////////////////////////////////
// Создание слайдера
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.3) translateX(-1000px)';
// slider.style.overflow = 'visible';
let currentSlide = 0;
const quantitySlides = slides.length;

const moveSlide = function (currentSlide) {
  slides.forEach(
    (slide, index) => slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`
  );
};

const nextSlide = function () {
  currentSlide++;
  if (currentSlide === quantitySlides)
    currentSlide = 0;
  moveSlide(currentSlide);
  activateDot(currentSlide);
};

const previousSlide = function () {
  currentSlide--;
  if (currentSlide < 0)
    currentSlide = quantitySlides - 1;
  moveSlide(currentSlide);
  activateDot(currentSlide);
};


const createDots = function () {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
  });
};

const activateDot = function (slideNumber) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active')
  });
  const currentDot = document.querySelector(`.dots__dot[data-slide="${slideNumber}"]`);
  currentDot.classList.add('dots__dot--active');

};


createDots();
moveSlide(0);
activateDot(0);


btnSliderRight.addEventListener('click', nextSlide);

btnSliderleft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});


dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slideNumber = e.target.dataset.slide;
    moveSlide(slideNumber);
    activateDot(slideNumber);
  }
});



