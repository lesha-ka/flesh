function videoBg() {
    if($('.js-videoBg').attr('data-video') !== undefined){
        let video;
        if($('.js-videoBg video').length >= 1){
            video = $('.js-videoBg video');
        } else {
            video = $('<video autoplay muted playsinline loop preload="auto"><source src="'+$('.js-videoBg').data('video')+'.webm" type="video/webm"><source src="'+$('.js-videoBg').data('video')+'.mp4" type="video/mp4"></video>');
        }
        $('.js-videoBg').prepend(video);
    }
    let firstScreen = $('.first-screen')
    if (firstScreen) {
        $('.first-screen .js-videoBg video').each(function(index, videoElement) {
            $(videoElement).on('loadeddata', function() {
                const liElement = $(videoElement).closest('.js-videoBg');
            });
        });
        
        $('.js-videoBg').each(function(index, liElement) {
            const videoElement = $(liElement).find('video');
            videoElement.get(0).pause();
        
            $(liElement).on('mouseenter', function() {
                videoElement.get(0).play();
            });
        
            $(liElement).on('mouseleave', function() {
                videoElement.get(0).pause();
            });
        });
    }
}

$(document).ready(function() {
    let screenWidth = $(window).width();
    if (screenWidth > 768) {
        videoBg();
    }
});
