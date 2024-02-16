document.addEventListener('DOMContentLoaded', () => {
    if ($('.typography').length) {
        let content = $('.typography');
        let pImg = content.find('p > img');
        let img = content.find('img');
        pImg.parent().addClass('typography__imgs')
        img.addClass('typography__img')
    }
});