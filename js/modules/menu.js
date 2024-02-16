$( document ).ready(function() {
    $('.js-burgerBtn').click(function(){
        $('.js-menuBtn').addClass('show');
        $('.js-menu').addClass('show');
        $('.js-menuInner').addClass('show');
    });
    $('.js-menuBtn').click(function(){
        $('.js-menu').removeClass('show');
        $('.js-menuInner').removeClass('show');
    });
});