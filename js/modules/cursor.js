document.addEventListener('DOMContentLoaded', () => {
    let cursor = document.querySelector('#circularcursor');

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';

        if (e.target.closest('.js-hoverEye')) {
            cursor.classList.add('eye');
        } else {
            cursor.classList.remove('eye');
        }

        if (e.target.classList.contains('js-hoverClose')) {
            e.target.classList.add('hide');
            cursor.classList.add('close');
        } else {
            document.querySelectorAll('.js-hoverClose').forEach(element => {
                element.classList.remove('hide');
                cursor.classList.remove('close');
            });
        }
    });

    document.addEventListener('mouseover', function (e) {
        if (e.target.matches('.js-hoverClose')) {
            e.target.classList.add('hide');
            cursor.classList.add('close');
        }
    });
    
    document.addEventListener('mouseout', function (e) {
        if (e.target.matches('.js-hoverClose')) {
            e.target.classList.remove('hide');
            cursor.classList.remove('close');
        }
    });

    let circleLinks = document.querySelectorAll('.circle-link');
    circleLinks.forEach(function (circleLink) {
        let linkHover = circleLink.querySelector('.circle-link__hover');
        circleLink.addEventListener('mouseenter', function () {
            cursor.style.display = 'none';
        });
        circleLink.addEventListener('mousemove', function (e) {
            let pos = circleLink.getBoundingClientRect();
            let elem_left = pos.left + window.pageXOffset; // учитываем прокрутку по горизонтали
            let elem_top = pos.top + window.pageYOffset; // учитываем прокрутку по вертикали
            let Xinner = e.pageX - elem_left;
            let Yinner = e.pageY - elem_top;
            linkHover.style.left = Xinner + 'px';
            linkHover.style.top = Yinner + 'px';
        });
        circleLink.addEventListener('mouseleave', function () {
            cursor.style.display = 'block';
        });
    });

});