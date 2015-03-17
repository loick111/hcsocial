$(document).ready(function () {
    start();
});

function start() {
    loadNews();
    checkRequired();
    changeImgProfile();
    commentsUtils();
    loadGravatar();
    formUtils();
}

function formUtils() {
    //FORMS
    formAjax('#form-login', function(data) {
        //on success
        if (data.display)
            alert(data.message);
        if (data.success)
            window.location = '/';
    }, function(data) {
        //on error
        if (data.display)
            alert(data.message);
    });

    formAjax('#form-signin', function(data) {
        //on success
        alert(data.message);
        if(data.success)
            window.location = '/users/login';
    }, function(data) {
        //on error
        alert(data.message);
    });

    formAjax('#form-add-news', function(data) {
        //on success
        date = new Date(data.date);
        createNews(data.username, data.mail, data.fullname, date.toLocaleDateString(), date.toLocaleTimeString(), data.message);

        $('#form-add-news')[0].reset();

        commentsDisplayToggle();
        commentsAddToggle();
    }, function(data) {
        //on error

    });
}

function commentsUtils() {
    commentsDisplayToggle();
    commentsAddToggle();
}

function commentsDisplayToggle() {
    $(".comments").hide();
    $(".comments-display").click(function () {
        $(this).parent().parent().find(".comments").slideToggle("fast", function () {
            if ($(this).is(':visible')) {
                $(this).parent()
                    .find(".comments-display")
                    .html('<span class="glyphicon glyphicon-comment"></span>Masquer les commentaires')
            } else {
                $(this).parent()
                    .find(".comments-display")
                    .html('<span class="glyphicon glyphicon-comment"></span>Afficher les commentaires');
            }
        });

    })
}

function loadNews() {
    $.ajax({
        url: '/news/loadAll',
        success: function(data) {
            if(data == 0) {
                $('#news-message').remove();
                $('#news')
                    .append(
                        $('<div>')
                            .addClass('col-lg-6 col-lg-offset-3')
                            .attr('id', 'news-message')
                            .append(
                                $('<h1>')
                                    .addClass('center-block')
                                    .html('Pas d\'actualités.')
                            )
                    );
            }

            for(news in data) {
                date = new Date(data[news].date);
                createNews(data[news].username, data[news].mail, data[news].firstname + ' ' + data[news].lastname, date.toLocaleDateString(), date.toLocaleTimeString(), data[news].message);
            }

            commentsUtils();
        },
        error: function(data) {
            alert('Erreur interne.');
        }
    });
}

function createNews(username, mail, fullname, date, time, message) {
    $('#news-message').remove();

    $('#news')
        .prepend(
        $('<div>')
            .attr('class', 'col-lg-6 col-lg-offset-3')
            .append(
            $('<div>')
                .attr('class', 'panel panel-default')
                .append(
                $('<div>')
                    .attr('class', 'panel-heading')
                    .append(
                    $('<div>')
                        .attr('class', 'vcenter')
                        .append(
                        $('<a>')
                            .attr('href', '/users/show/' + username)
                            .append(
                            $('<img>')
                                .attr('src', 'http://gravatar.com/avatar/' + CryptoJS.MD5(mail))
                                .attr('alt', fullname)
                                .attr('class', 'img-circle profile')
                        )
                    )
                )
                    .append(
                    $('<div>')
                        .attr('class', 'vcenter')
                        .append(
                        $('<a>')
                            .attr('href', '/users/show/' + username)
                            .html(fullname)
                    )
                        .append(
                        $('<span>')
                            .attr('class', 'date')
                            .html(', le ' + date + ' à ' + time)
                    )
                )
            )
                .append(
                $('<div>')
                    .attr('class', 'panel-body')
                    .append(
                    $('<p>')
                        .html(message)
                )
            )
                .append(
                $('<div>')
                    .attr('class', 'panel-footer')
                    .append(
                    $('<a>')
                        .attr('class', 'comments-display')
                        .append(
                        $('<span>')
                            .attr('class', 'glyphicon glyphicon-comment')
                    )
                        .append(
                        $('<span>')
                            .html('Afficher les commentaires')
                    )
                )
                    .append(
                    $('<a>')
                        .attr('class', 'comments-action')
                        .append(
                        $('<span>')
                            .attr('class', 'glyphicon glyphicon-pencil')
                    )
                        .append(
                        $('<span>')
                            .html('Commenter')
                    )
                )
            )
                .append(
                $('<div>')
                    .attr('class', 'panel-body comments')
                    .append(
                    $('<p>')
                        .html('Pas de commentaires')
                )
            )
        )
            .hide()
            .fadeIn()
    )
}

function commentsAddToggle() {
    $('.comments-action').click(function () {
        $(this)
            .parent()
            .parent()
            .append(
            $('<div>')
                .attr('class', 'panel-footer')
                .append(
                $('<input>')
                    .attr('type', 'text')
                    .attr('class', 'form-control')
                    .attr('placeholder', 'Écrire un commentaire...')
            )
        );
        $(this).remove();
    });
}

function checkRequired() {
    $('input[required]').focusout(function () {
        if($(this).parent().find('span').length == 1)
            $(this).parent()
                .append(
                    $('<span>')
                        .addClass('glyphicon')
                        .addClass('form-control-feedback')
                );

        if ($(this).val() == '') {
            $(this).parent()
                .addClass('has-error');
            $(this).parent()
                .find('span.form-control-feedback')
                .removeClass('glyphicon-ok')
                .addClass('glyphicon-remove');
        } else {
            $(this).parent()
                .removeClass('has-error')
                .addClass('has-success');
            $(this).parent()
                .find('span.form-control-feedback')
                .removeClass('glyphicon-remove')
                .addClass('glyphicon-ok');
        }
    });
}

function changeImgProfile() {
    $('input[name="mail"]').change(function () {
        var hash = CryptoJS.MD5($('input[name="mail"]').val());
        $('#img-profile').attr('src', 'http://gravatar.com/avatar/' + hash + '?s=150');
    });
}

function loadGravatar() {
    $('.gravatar').each(function() {
        $(this).attr('src', 'http://gravatar.com/avatar/' + CryptoJS.MD5($(this).attr('src')) + '?s=150');
    });
}

function formAjax(form, success, error) {
    $(form).submit(function () {
        var data = $(this).serialize();
        $.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: data,
            success: success,
            error: error
        });
        return false;
    });
}
