document.addEventListener('DOMContentLoaded', () => {
  const gallary = document.querySelector('.js-gallary');
  const sliderGallary = document.querySelector('.js-sliderGallary');
  const circularCursor = document.getElementById('circularcursor');
  if (sliderGallary) {
    let gallaryItem = document.querySelectorAll('.js-gallaryItem');
    let gallaryTitle = document.querySelector('.js-gallaryTitle');
    const swiper = new Swiper(sliderGallary, {
      enabled: false,
      slidesPerView: 'auto',
      draggable: false,
      centeredSlides: true,
      initialSlide: 1,
      loop: false,
      spaceBetween: 0,
      pagination: {
        el: '.gallary__pagination',
        type: 'bullets',
        clickable: true,
      },
    });
    gallaryTitle.classList.add('start');
    setTimeout(() => {
      gallaryTitle.classList.remove('start');
      gallaryTitle.classList.add('center');
    }, 1000)
    gallaryItem.forEach((elem, index) => {
      elem.classList.add('hide');
      if (index < 3) {
        setTimeout(() => {
          elem.classList.remove('hide');
          elem.classList.add('show');
        }, 1000)
        setTimeout(() => {
          elem.classList.remove('show');
          elem.classList.add('stand');
        }, 2500)
      }
    })
    setTimeout(() => {
      gallaryItem.forEach((elem) => {
        elem.classList.remove('hide');
        elem.classList.remove('stand');
        elem.classList.remove('show');
        elem.classList.add('default');
      })
      swiper.enable()
    }, 5500)

    document.addEventListener("mousemove", function (e) {
      if (gallary.contains(e.target)) {
        var rect = gallary.getBoundingClientRect();
        if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
          circularCursor.classList.remove('right-arrow', 'left-arrow');
          if (e.clientX > rect.left + rect.width / 2) {
            circularCursor.classList.add('right-arrow');
          } else {
            circularCursor.classList.add('left-arrow');
          }
        } else {
          circularCursor.classList.remove('right-arrow', 'left-arrow');
        }
      } else {
        circularCursor.classList.remove('right-arrow', 'left-arrow');
      }
    });

    document.addEventListener("mouseleave", function () {
      circularCursor.classList.remove('right-arrow', 'left-arrow');
    });

    document.addEventListener('click', function () {
      if (circularCursor.classList.contains('left-arrow')) {
        swiper.slidePrev();
      } else if (circularCursor.classList.contains('right-arrow')) {
        swiper.slideNext();
      }
    });
  }
});