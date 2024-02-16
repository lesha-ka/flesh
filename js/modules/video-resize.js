function videoResize() {
    if(document.querySelector('.js-iframeVideo')) {
        let iframes = document.querySelectorAll('.js-iframeVideo');
        for (var i = 0; i < iframes.length; i++) {
          iframes[i].style.height = iframes[i].offsetWidth * 0.5625 + 'px'; // соотношение сторон для видео 16:9
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    videoResize();
    document.querySelector('.body').addEventListener('click', function(event) {
        if (event.target.classList.contains('load--video')) {
            setTimeout(function () {
                videoResize();
            }, 400);
        }
    });
});
window.addEventListener('resize', function() {
    videoResize()
});