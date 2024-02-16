var tempScrollTop, currentScrollTop = $(window).scrollTop();

$(window).on('scroll load', function () {
    if ($('section.preloader').length == 0 && $('.js-popup').length == 0) {
        currentScrollTop = $(window).scrollTop();
        if (currentScrollTop > $('.js-header').height() && !$('body').hasClass('hidden')) {
            $('body').addClass('fixed-header');
            if (tempScrollTop < currentScrollTop) {
                $('.js-header').removeClass('fixed');
            } else if (tempScrollTop > currentScrollTop) {
                $('.js-header').addClass('fixed');
            }
        } else {
            $('body').removeClass('fixed-header');
            $('.js-header').removeClass('fixed');
        }

        tempScrollTop = currentScrollTop;
    }
});