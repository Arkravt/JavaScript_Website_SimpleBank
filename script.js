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


