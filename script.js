'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// *************************************************
//   Smooth scrolling
// *************************************************
//for individual element
const section1 = document.querySelector("#section--1");
document.querySelector(".btn--scroll-to").addEventListener("click", function(e) {
  e.preventDefault();
  section1.scrollIntoView({behavior: "smooth"});
});

// *************************************************
//   Smooth scrolling in navbar
// *************************************************
//for more than one element
document.querySelectorAll(".nav__link").forEach(function (el){
  el.addEventListener("click", function(e){
    e.preventDefault();
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior: "smooth"});
  });
});

// *************************************************
//   Tabbed content
// *************************************************

const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function(e){
  const tabs_clicked = e.target;
  console.log(tabs_clicked);
  //output-----<button class="btn operations__tab operations__tab--1" data-tab="1"> 01Instant Transfers</button>
  tabs.forEach((curElem) => curElem.classList.remove("operations__tab--active"));
  tabs_clicked.classList.add("operations__tab--active"); 

  //find the number of data attribute
const btn_num = tabs_clicked.dataset.tab;
console.log(btn_num);
//output------1 / 2 / 3 
const contentActive = document.querySelectorAll(`.operations__content--${btn_num}`);
tabsContent.forEach((curElem) => curElem.classList.remove("operations__content--active"));
contentActive.forEach((curElem) => curElem.classList.add("operations__content--active"));
})

///////  practice //////////////////////////////////////////////////////////////////////////////////

// const obsCallback = function (entries, observer){
//   entries.forEach(function (entry) {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.2, // threshold frequency always check with intersectionRatio and always intersecting: true
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// *************************************************
//   Sticky navigation in scroll event
// *************************************************
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting){
    nav.classList.add("sticky");
  }else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// *************************************************
//   fade in/out scroll event
// *************************************************
const allSections = document.querySelectorAll(".section");
const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);if(!entry.isIntersecting){
    return;
  }else{
    entry.target.classList.remove("section--hidden");
  }
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});


// *************************************************
//lazy loading image
// *************************************************
const imgTargets = document.querySelectorAll("img[data-src]");
const loading = function (entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) 
  return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load" ,function(){
      entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
imgTargets.forEach(function(img){
  imgObserver.observe(img);
});

// *************************************************
//slider
// *************************************************
// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 3,
//   spaceBetween: 30,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();