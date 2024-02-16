document.addEventListener('DOMContentLoaded', () => {
    const sliderClinics = document.querySelector('.js-sliderClinics');
    const circularCursor = document.getElementById('circularcursor');
    const links = document.querySelectorAll('.js-sliderClinics a');
    links.forEach(function(elem) {
        elem.classList.add('js-hoverEye');
    })
    if (sliderClinics) {
        const swiper = new Swiper(sliderClinics, {
            slidesPerView: 'auto',
            draggable: true,
            initialSlide: 1,
            loop: true,
            spaceBetween: 130,
            pagination: {
              el: '.clinics__pagination',
              type: 'bullets',
              clickable: true,
            },
            navigation: {
                nextEl: '.clinics__next',
                prevEl: '.clinics__prev',
            },
        });

        document.addEventListener("mousemove", function (e) {
          if (sliderClinics.contains(e.target)) {
            var rect = sliderClinics.getBoundingClientRect();
            if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
              circularCursor.classList.remove('right-arrow-clinic', 'left-arrow');
              if (e.clientX > rect.left + rect.width / 2) {
                circularCursor.classList.add('right-arrow-clinic');
              } else {
                circularCursor.classList.add('left-arrow-clinic');
              }
            } else {
              circularCursor.classList.remove('right-arrow-clinic', 'left-arrow-clinic');
            }
          } else {
            circularCursor.classList.remove('right-arrow-clinic', 'left-arrow-clinic');
          }
        });
    
        document.addEventListener("mouseleave", function () {
          circularCursor.classList.remove('right-arrow-clinic', 'left-arrow-clinic');
        });
    
        document.addEventListener('click', function () {
          if (circularCursor.classList.contains('left-arrow-clinic')) {
            swiper.slidePrev();
          } else if (circularCursor.classList.contains('right-arrow-clinic')) {
            swiper.slideNext();
          }
        });
    }
});