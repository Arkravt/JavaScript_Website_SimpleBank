'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');
const scrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');

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
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');

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
