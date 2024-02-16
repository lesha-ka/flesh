document.addEventListener('DOMContentLoaded', () => {
    function trackElements(selectorList) {
        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 0 
        };

        let observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('shown');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        selectorList.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                observer.observe(element);
            });
        });
    }

    trackElements([".js-descriptorInner", ".js-descriptorImg", ".js-header", ".js-headerInner", ".js-descriptorLink", ".js-about", ".js-steps", ".js-analysis", ".js-expanding", ".js-clinics", ".js-history", ".js-historyPhoto", ".js-interview", ".js-motivation", ".js-newsInner", ".js-newsItem"]);

});