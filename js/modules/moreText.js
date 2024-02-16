document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.js-textWrap')) {
        let textWrap = document.querySelectorAll('.js-textWrap');
        textWrap.forEach(function(elem) {
            let hideText = elem.querySelectorAll('.js-hideText')
            let textMore = elem.querySelector('.js-textMore')
            hideText.forEach(function(text) {
                text.classList.add('hide')
            })
            function showMoreText() {
                console.log('123')
                if (textMore.classList.contains('js-lessText')) {
                    hideText.forEach(function(text) {
                        text.classList.add('hide')
                    })
                    textMore.innerHTML = 'Подробнее';
                    textMore.classList.remove('js-lessText')
                } else {
                    hideText.forEach(function(text) {
                        text.classList.remove('hide')
                    })
                    textMore.innerHTML = 'Скрыть';
                    textMore.classList.add('js-lessText')
                }
            }
            if(textMore) {
                textMore.addEventListener("click", showMoreText);
            }
        })
    }
})