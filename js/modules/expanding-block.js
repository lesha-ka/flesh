$( document ).ready(function() {
    $('.js-expandingBlock').on('click', function() {
        $(this).toggleClass('open');
        $(this).parent().toggleClass('open');
    })
});