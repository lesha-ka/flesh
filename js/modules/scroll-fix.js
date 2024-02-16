function wrapperFixPosition() {
    const fixBlocks = document.querySelectorAll('.js-fixBlock');
    let paddingOffset = window.innerWidth - document.querySelector('body').offsetWidth + 'px'; 
    setTimeout( function() {
        if ( !document.querySelector('body').hasAttribute('wrapper-body-scroll-fix') ) {
            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            fixBlocks.forEach((el) => {
                el.style.paddingRight = paddingOffset;
            });
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').setAttribute('wrapper-body-scroll-fix', scrollPosition);
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').style.position = 'fixed';
            document.querySelector('body').style.top = '-' + scrollPosition + 'px';
            document.querySelector('body').style.left = '0';
            document.querySelector('body').style.width = '100%';
            document.querySelector('body').style.paddingRight = paddingOffset;
            document.querySelector('.js-header').style.paddingRight = paddingOffset;
        }
    }, 15 ); 
}
function wrapperUnfixPosition() {
    const fixBlocks = document.querySelectorAll('.js-fixBlock');
    if ( document.querySelector('body').hasAttribute('wrapper-body-scroll-fix') ) {
        let scrollPosition = document.querySelector('body').getAttribute('wrapper-body-scroll-fix');
        document.querySelector('body').removeAttribute('wrapper-body-scroll-fix');
        document.querySelector('body').style.overflow = '';
        document.querySelector('body').style.position = '';
        document.querySelector('body').style.top = '';
        document.querySelector('body').style.left = '';
        document.querySelector('body').style.width = '';
        document.querySelector('.js-header').style.paddingRight = '';
        window.scroll(0, scrollPosition);
        fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.querySelector('body').style.paddingRight = '0px';
    }
}