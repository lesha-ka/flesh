document.addEventListener('DOMContentLoaded', () => {
  const circularCursor = document.getElementById('circularcursor');
  const sliderHistory = document.querySelector('.js-sliderHistory');
  if (sliderHistory) {
    const swiper = new Swiper(sliderHistory, {
      direction: 'vertical',
      slidesPerView: 'auto',
      allowTouchMove: true,
      draggable: true,
      loop: false,
      navigation: {
        nextEl: '.history__next',
        prevEl: '.history__prev',
      },
      scrollbar: {
        el: '.history__scrollbar',
        draggable: true,
      },
      breakpoints: {
        1261: {
          allowTouchMove: false,
          draggable: false,
        },
      }
    });
    document.addEventListener("mousemove", function (e) {
      if (sliderHistory.contains(e.target)) {
        var rect = sliderHistory.getBoundingClientRect();
        if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
          circularCursor.classList.remove('down-arrow', 'up-arrow');
          if (e.clientY > rect.top + rect.height / 2) {
            circularCursor.classList.add('down-arrow');
          } else {
            circularCursor.classList.add('up-arrow');
          }
        } else {
          circularCursor.classList.remove('down-arrow', 'up-arrow');
        }
      } else {
        circularCursor.classList.remove('down-arrow', 'up-arrow');
      }
    });
  
    document.addEventListener("mouseleave", function () {
      circularCursor.classList.remove('down-arrow', 'up-arrow');
    });
  
    document.addEventListener('click', function () {
      if (circularCursor.classList.contains('up-arrow')) {
        swiper.slidePrev();
      } else if (circularCursor.classList.contains('down-arrow')) {
        swiper.slideNext();
      }
    });
  }
});