const swiper1 = new Swiper(".top-slider__slider", {
  spaceBetween: 30,
  autoplay: {
    delay: 6000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

const swiper2 = new Swiper('.info__slider', {
  slidesPerView: 1,
  autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  watchOverflow: true,
  spaceBetween: 15,
  
  navigation: {
    nextEl: '.slider-btn--next',
    prevEl: '.slider-btn--prev',
  },

  breakpoints: {
    501: {
      slidesPerView: 2,
    },

    701: {
      slidesPerView: 3,
    },
    901: {
      slidesPerView: 4,
    },

    1101: {
      slidesPerView: 5,
    },

    1321: {
      slidesPerView: 6,
    }
  }
  
});

const swiper3 = new Swiper('.products__slider', {
  slidesPerView: 1,
  
  // autoplay: {
  //   delay: 2000,
  //   stopOnLastSlide: false,
  //   disableOnInteraction: false,
  // },
  watchOverflow: true,
  spaceBetween: 20,
  
  navigation: {
    nextEl: '.slider-btn--next',
    prevEl: '.slider-btn--prev',
  },

  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },

  breakpoints: {
    641: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    769: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    993: {
      slidesPerView: 3,
      spaceBetween: 10,
    },

    1201: {
      slidesPerView: 2,
    },

    1501: {
      slidesPerView: 3,
    }
  }
});

const swiper4 = new Swiper('.products-all__slider', {
  slidesPerView: 1,
  autoplay: {
    delay: 4000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  watchOverflow: true,
  
  navigation: {
    nextEl: '.slider-btn--next',
    prevEl: '.slider-btn--prev',
  },

  breakpoints: {
    641: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    769: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    993: {
      slidesPerView: 3,
      spaceBetween: 24,
    },

    1201: {
      spaceBetween: 15,
    },

    1321: {
      spaceBetween: 24,
      slidesPerView: 4,
    }
  }
});

const swiper5 = new Swiper('.card__result', {
  direction: "vertical",
  slidesPerView: 'auto',
  spaceBetween: 10,

  navigation: {
    nextEl: '.slider-btn--next',
    prevEl: '.slider-btn--prev',
  },

  breakpoints: {
    401: {
      slidesPerView: 4,
      spaceBetween: 10,
    }
  }
});

const swiper6 = new Swiper('.doctor-info__slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  
  navigation: {
    nextEl: '.slider-btn--next',
    prevEl: '.slider-btn--prev',
  },
});

//animation

const animItem = document.querySelector('.application__img');


if(animItem) {
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll() {
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 4;
    
    let animItemPoint = window.innerHeight - animItemHeight / animStart;

    if(animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add('application__img--active');
    } else {
      animItem.classList.remove('application__img--active');
    }
  } 

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
}

//end animation

// menu 

const body = document.querySelector('body');
const headerMenu = document.querySelector('.header__inner');
const btnClose = document.querySelector('.header__menu-close');
const btnOpen = document.querySelector('.header__menu-open');
const dropdownMenu = document.querySelector('.menu__dropdown-items');
const dropdownBtn = document.querySelector('.menu__dropdown-btn');

btnOpen.addEventListener('click', (e) => {
  headerMenu.classList.add('header__inner--active');
  body.classList.add('lock');
});

btnClose.addEventListener('click', (e) => {
  headerMenu.classList.remove('header__inner--active');
  dropdownMenu.classList.remove('menu__dropdown-items--active')
  body.classList.remove('lock');
});

body.addEventListener('click', (e)=>{
  if(e.target.classList[0] === 'lock') {
    headerMenu.classList.remove('header__inner--active');
    dropdownMenu.classList.remove('menu__dropdown-items--active')
    body.classList.remove('lock');
  }
})

// dropmenu

if (window.innerWidth < 1201) {
  dropdownBtn.addEventListener('click', ()=>{
    dropdownMenu.classList.toggle('menu__dropdown-items--active')
  });
}

window.addEventListener("resize", function () {
  if (window.innerWidth < 1201) {
    dropdownBtn.addEventListener('click', ()=>{
      dropdownMenu.classList.toggle('menu__dropdown-items--active')
    });
  }
});

window.addEventListener("orientationchange", function () {
  if (window.innerWidth < 1201) {
    dropdownBtn.addEventListener('click', ()=>{
      dropdownMenu.classList.toggle('menu__dropdown-items--active')
    });
  }
});

// end dropmenu

// end menu

// popup city

  const city = document.querySelector('#popup-city');
  const cityBtn = document.querySelector('#cityBtn');

  if(city && cityBtn) {
    popup(city, cityBtn);
  }

// end popup city

// popup auth

  const auth = document.querySelector('#auth-popup');
  const authBtn = document.querySelector('#authBtn');

  if(auth && authBtn) {
    popup(auth, authBtn);
  }
  
// end popup auth

// popup review

const review = document.querySelector('#popup-review');
const reviewBtn = document.querySelector('#reviewBtn');

if(review && reviewBtn) {
  popup(review, reviewBtn);
}

// end popup review

// плавное перемещение к якорю aside-menu

const asideLinks = document.querySelectorAll('.aside-menu__link');

if (asideLinks) {
  asideLinks.forEach(elem => scrollSmooth(elem))
}

// end плавное перемещение к якорю aside-menu

// popup

function popup(popup, btn) {
  
  btn.addEventListener('click' , () => {

    const closeBtn = document.querySelector('.popup__close');
    popup.classList.add('popup--active');

    popup.addEventListener('click', (e) => {
      if (e.target == popup || e.target.classList[0] == closeBtn.classList[0] || e.target.classList[0] == closeBtn.children[0].classList[0] || e.target.parentNode.classList[0] == closeBtn.children[0].classList[0]) {
        popup.classList.remove('popup--active');
      }
    })
  })
}

// плавное перемещение к якорю 

function scrollSmooth (elem) {
  if(elem) {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      const blockID = elem.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
      console.log('done')
    })
  } else {
    console.log("Елемент не передан");
  }
} 


