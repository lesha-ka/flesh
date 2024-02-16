document.addEventListener('DOMContentLoaded', () => {
    $('input[name=phone]').mask('+7(999)-999-99-99');
    $('body').on('submit', '.sendler', function () {
        var form = $(this);
        // Проверка полей формы
        var classError = 'wrong';
        var checkedGroups = ',';
        function checkFullness(handle) {
            var error = true;
            var attribute = String($(handle).attr('class').split(' ').filter(function (e) {
                return e.indexOf('required') !== -1
            }));

            if (attribute.indexOf('group') === 0) {
                attribute = attribute.substring(9);
            }

            var required = true;//флаг обязательности
            if (attribute.indexOf('Y') === -1) {
                required = false;
            }
            var format = attribute;//проверка на формат
            if (required)
                format = attribute.substr(2);
            switch ($(handle).attr('type')) {
                case 'checkbox':
                    if (!$(handle).prop('checked')) {
                        error = false;
                    }
                    break;
                case 'radio':
                    if (!$(handle).prop('checked') && $('[name="' + $(handle).attr('name') + '"]:checked').length == 0) {
                        error = false;
                    } else {
                        error = 'radio';
                    }
                    break;
                default:
                    if ($(handle).val().trim().length == 0 || $(handle).val() == '0') {
                        if (required) error = false;
                    } else {
                        if (format === 'required-num') {
                            var regCheck = new RegExp('[^0-9\s-]+');
                            if (regCheck.test($(handle).val()))
                                error = 'wrong';
                        }
                        if (format === 'required-email') {
                            var regCheck = new RegExp("^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$");
                            if (!regCheck.test($(handle).val()))
                                error = 'wrong';
                        }
                    }
                    break;
            }
            if (!error && $(handle).attr('confirmInfo') && $(handle).attr('confirmInfo').indexOf('self') !== -1 && $(handle).attr('checkforconfirm').indexOf('group') !== -1)//выводим хинт для уникального множественного ошибки
            {
                var title = " значение поля";//подпись к пункту
                if (typeof $(handle).attr('title') !== 'undefined' && $(handle).attr('title').length > 0)
                    title = $(handle).attr('title');
                $($(handle).attr('confirmInfo').substr(4)).after("<div class='wrong-text'>" + title + "</div>");
            }
            if (error === 'wrong' && $(handle).attr('confirmInfo') && $(handle).attr('checkforconfirm').indexOf('group') !== -1)//выводим хинт для уникального множественного оказии
            {
                $($(handle).attr('confirmInfo').substr(4)).after("<div class='wrong-text'>Неверное значение поля</div>");
            }
            return error;

        }

        function prepareChecking(handle)// запускает проверку конкретного элемента и маркерует ошибочные
        {
            var error = true;//возвращаемое значение; смысл - просто показать, что есть ошибка принимает значение: true - нет ошибок; false - поле не заполнено; 'wrong' - поле заполнено неправильно; 'radio' - радиокнопка отмечена и нет ошибок
            var title = " значение поля " + $(handle).attr('placeholder');//подпись к пункту
            if (typeof $(handle).attr('title') !== 'undefined' && $(handle).attr('title').length > 0) {
                title = $(handle).attr('title');
            }
            var after = handle;//куда лепить
            var attribute = String($(handle).attr('class').split(' ').filter(function (e) {
                return e.indexOf('required') !== -1
            }));

            if (attribute.indexOf('group') !== -1)//группа
            {
                var groupIndex = String(attribute.split('_').filter(function (e) {
                    return e.indexOf('group') !== -1
                })).slice(5);
                $("[class*='group" + groupIndex + "']").each(function () {
                    error = checkFullness(this);
                    switch (error) {
                        case true:
                            error = checkFullness(this);
                            break;
                        case 'radio':
                            if (checkFullness(this) === 'wrong') error = false;
                            break;//???
                        case false:
                            if (checkFullness(this) === 'radio') {
                                error = 'radio';
                            }
                            $("[class*='group" + groupIndex + "']").each(function () {
                                if ($(this).val() != 0) {
                                    error = true;
                                }
                            });
                            if (checkFullness(this) === 'radio') {
                                error = 'radio';
                            }
                            break;

                        default:
                            checkFullness(this);
                            break;
                    }

                    if (error !== true && error !== 'radio') {
                        $("[class*='group" + groupIndex + "']").each(function () {
                            if (typeof $(this).attr('title') !== 'undefined') {
                                title = $(this).attr('title');
                            }
                            after = $(this).attr('confirmInfo');
                        });

                        if (error === 'wrong')
                            $(after).after("<div class='wrong-text'>Неверное значение поля</div>");
                        else
                            $(after).after("<div class='wrong-text'>" + title + "</div>");//html ошибки

                        $("[class*='group" + groupIndex + "']").each(function () {
                            $(this).addClass(classError);//добавление класса всей группе
                        });
                        error = false;
                    }

                    if (error === 'radio')//Радио значит всё хорошо
                        error = true;
                });
            } else { //одиночное
                error = checkFullness(handle);
                if (error) {
                }
                if (!error || error == 'wrong') {
                    if (typeof $(handle).attr('confirmInfo') !== 'undefined' && $(handle).attr('confirmInfo').length > 0) {
                        after = $(handle).attr('confirmInfo');
                    }
                    if (typeof $(handle).attr('title') !== 'undefined') {
                        if (typeof $(handle).attr('confirmInfo') !== 'undefined' && $(handle).attr('confirmInfo').length > 0) {
                            if (error === 'wrong')
                                $(after).append("<div class='wrong-text'>Неверное значение поля</div>");
                            else
                                $(after).append("<div class='wrong-text'>" + title + "</div>");//html ошибки в указаном блоке
                        } else {
                            if (error === 'wrong')
                                $(after).after("<div class='wrong-text'>Неверное значение поля</div>");
                            else
                                $(after).after("<div class='wrong-text'>" + title + "</div>");//html ошибки под блоком объекта
                        }
                    }
                    $(handle).addClass(classError).parent().addClass(classError);//добавление класса
                    error = false;
                }
            }
            return error;
        }

        function checktrueAttr(form) { //подготавливает данные
            var error = true, classError = 'wrong';
            checkedGroups = ',';
            $('div.wrong-text').remove();//убираем сообщения ошибок если такие есть
            $('.' + classError).each(function () {
                $(this).removeClass(classError);
            });//убираем подсветку ошибок
            $(form).find('[class *= "required"]').each(function () {//Перебираем объекты нуждающиеся в обязательном заполнении
                if (error) error = prepareChecking(this);
                else prepareChecking(this);
            });
            return error;
            // return false;
        }

        if (checktrueAttr(form)) {
            let formData = new FormData(form.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)
            formData.append('template', form.attr('name'));
            $.get('/index.php?route=sendform/sendform/getHash', function (data) {
                formData.append('hash', data);
                var method, action;
                if (form.attr('method') != undefined) {
                    method = form.attr('method');
                } else {
                    method = 'POST';
                }
                ;
                if (form.attr('action') != undefined) {
                    action = form.attr('action');
                } else {
                    action = '/index.php?route=sendform/sendform';
                }

                $.ajax({ // инициaлизируeм ajax зaпрoс
                    url: action,
                    type: method,
                    contentType: false, // важно - убираем форматирование данных по умолчанию
                    processData: false, // важно - убираем преобразование строк по умолчанию
                    dataType: 'json', // oтвeт ждeм в json фoрмaтe
                    data: formData, // дaнныe для oтпрaвки
                    beforeSend: function (data) { // сoбытиe дo oтпрaвки
                        form.find('button').prop('disabled', true); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
                        //preloader.start();
                    },
                    success: function (data) { // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
                        //preloader.stop()
                        form[0].reset();
                        $(form).addClass('sent');
                        $(form).find('.fw-placeholder').removeClass('active');

                        if (!$(form).find('.response').length) {
                            if (data['response']) {
                                $(form).append('<div class="response">' + data['response'] + '</div>');
                            } else {
                                var response = '<div><h4 class="h24">Ваша заявка отправлена</h4><p>Мы свяжемся с Вами в ближайшее время.</p></div>';
                                $(form).append('<div class="response">' + response + '</div>');
                            }

                        }

                        var $form = $(form);

                        setTimeout(function () {
                            if (!$form.parents('.float-box_inset').length <= 0) {
                                $form.removeClass('sent');
                                $form.parents('.float-box').find('.exit').click();
                            }
                        }, 5000);

                        /*                     $('.exit').click(function () {
                                            $(form).removeClass('sent');
                                        }); */

                    },
                    error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
                        preloader.stop()
                        /* form[0].reset(); */
                        $(form).addClass('error');
                        /* $(form).find('.fw-placeholder').removeClass('active'); */
                        if ($(form).find('.errortext').length <= 0) {

                            $(form).append('<div class="errortext"><div><h3 class="h32">Ошибка отправки формы!</h3><p>При отправке произошла ошибка, попробуйте ещё раз.</p></div></div><div class="exit"></div>');

                            var $form = $(form);

                            $('.exit').click(function () {
                                $(form).removeClass('error');
                            });
                        }

                    },
                    complete: function (data) { // сoбытиe пoслe любoгo исхoдa
                        form.find('button').prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
                        $(form).find('.fw-placeholder').removeClass('active');

                        preloader.stop();
                    }
                });
            });
        }
        return false;
    });//function-send

    let labelText
    if ($('.js-fileLabel').length) {
        labelText = $('.js-fileLabel').html();
        testUrl = $('.js-inputFile').data('valid')
    }
    function checkFile(e) {
        const input = $(e.target);
        let inputWrap = input.parent();
        let dataUrl = input.attr('data-url')
        let formData = new FormData()
        for (let file of e.target.files) {
            formData.append('files[]', file);
        }
        $.ajax({
            url: dataUrl,
            type: 'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                if (res.errors) {
                    $.each(res.errors, function (key, value) {
                        var fileItem = $('<div>').addClass('form__file-item error');
                        var fileName = $('<div>').addClass('form-file__name').text(value);
                        var resetBtn = $('<button>').attr('type', 'button').addClass('form__file-reset js-resetBtn');
                        fileItem.append(fileName, resetBtn);
                        inputWrap.append(fileItem);
                    });
                }
                if (res.success) {
                    $.each(res.success, function (key, value) {
                        var fileItem = $('<div>').addClass('form__file-item');
                        var fileName = $('<div>').addClass('form-file__name').text(value);
                        var resetBtn = $('<button>').attr('type', 'button').addClass('form__file-reset js-resetBtn');
                        fileItem.append(fileName, resetBtn);
                        inputWrap.append(fileItem);
                    });
                }
            }
        });
    }
    $(document).on('change', '.js-inputFile', function (e) {
        let inputWrap = $(this).parent();
        inputWrap.children('.form__file-item').remove();
        checkFile(e);
    });
    $('body').on('click', '.js-resetBtn', function () {
        var inputFile = $(this).parents('.js-fileWrap').find('.js-inputFile');
        let inputWrap = inputFile.parent();
        inputWrap.children('.form__file-item').remove();
        var parentDiv = $(this).parent();
        var fileName = $(this).siblings('.form-file__name').text();
        var inputFiles = inputFile[0].files;
        for (var i = 0; i < inputFiles.length; i++) {
            if (inputFiles[i].name === fileName) {
                var files = Array.from(inputFile[0].files);
                files.splice(i, 1);
                var newFileList = new DataTransfer();
                files.forEach(function (file) {
                    newFileList.items.add(file);
                });
                inputFile[0].files = newFileList.files;
                var e = { target: inputFile[0] }; 
                checkFile(e);
                parentDiv.remove();
                break;
            }
        }
        parentDiv.remove();
    })
})