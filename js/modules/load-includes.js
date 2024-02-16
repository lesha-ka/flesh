document.addEventListener('DOMContentLoaded', () => {
    $('body').on('click', '[class *= "load--"]', function (evt) {
        var loadBtn = $(this);

        if (loadBtn.hasClass('disabled')) {
            return false;
        }

        var tpl = String(loadBtn.attr('class').split(' ').filter(function (e) {
            return e.indexOf('load--') !== -1;
        })).replace("load--", "");
        $.ajax({
            //url: 'includes/' + tpl + '.php',
            url: '/index.php?route=sendform/sendform/getPopup&template='+tpl,
            type: "GET",
            contentType: false,
            processData: false,
            dataType: 'html',
            beforeSend: function () {
                loadBtn.addClass('disabled');
            },
            success: function (data) {
                var append = $('<section class="js-popup popup ' + tpl + '"><div class="js-popupInner popup-inner">' + data + '<div class="popup__exit js-popupExit js-hoverClose"></div></div></section>');

                if (append.find('form').length > 0) {
                    append.addClass('form');
                } else {
                    append.find('.popup-inner').addClass('typography');
                }
                $('body').append(append);
                //wrapperFixPosition()
                setTimeout(function () {
                    append.addClass('show');
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError)
            },
            complete: function () {
                loadBtn.removeClass('disabled');
            }
        });
        return false;
    });
    $('body').click(function (event) {
        if ($(event.target).hasClass('js-popup') || $(event.target).hasClass('js-popupExit')) {

            if ($(event.target).hasClass('js-popupExit')) {
                var box = $(event.target).parents(".js-popup");
            } else if ($(event.target).hasClass('js-popup')) {
                var box = $(event.target);
            }

            if (box !== undefined) {
                //wrapperUnfixPosition()
                box.find(".js-popupExit").css('display', "none");
                box.find(".js-popupInner ").css('right', '-110%');
                setTimeout(function () {
                    box.remove();
                }, 500);
            }

        }
    });
});