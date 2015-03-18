$(document).ready(function () {
    start();
});

function start() {
    loadNews();
    checkRequired();
    changeImgProfile();
    newsUtils();
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
        if(data.display)
            alert(data.message);

        if(data.success) {
            date = new Date(data.date * 1000);
            createNews(data.id, true, data.username, data.mail, data.fullname, date.toLocaleDateString(), date.toLocaleTimeString(), data.message);

            $('#form-add-news')[0].reset();
            newsUtils();
        }
    }, function(data) {
        //on error
    });
}

function newsUtils() {
    deleteNews();
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

function deleteNews() {
    $('.delete-news').click(function() {
        if(confirm('Êtes-vous sur de vouloir supprimer cette publication ?')) {
            var news = $(this).parent().parent().parent();
            $.ajax({
                url: '/news/delete/' + news.attr('data-news-id'),
                success: function(data) {
                    if (!data.success && data.display) {
                        alert(data.message);
                    }

                    if (data.success) {
                        news.remove();
                        news.fadeOut();
                    }
                },
                error: function(data) {
                    alert('Erreur lors de la suppression de la publication.');
                }
            });
        }
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
                date = new Date(data[news].date * 1000);
                createNews(data[news].id, data[news].admin, data[news].username, data[news].mail, data[news].firstname + ' ' + data[news].lastname, date.toLocaleDateString(), date.toLocaleTimeString(), data[news].message);
            }

            newsUtils();
        },
        error: function(data) {
            alert('Erreur lors du chargement des publications.');
        }
    });
}

function createNews(id, admin, username, mail, fullname, date, time, message) {
    $('#news-message').remove();

    $('#news')
        .attr('data-news-latest', id)
        .prepend(
        $('<div>')
            .attr('class', 'col-lg-6 col-lg-offset-3')
            .attr('data-news-id', id)
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
                    .append(
                    $('<a>')
                        .addClass('delete-news')
                        .addClass('pull-right')
                        .append(
                        $('<span>')
                            .addClass('glyphicon glyphicon-remove')
                    )
                        .hide()
                )
                    .append(
                    $('<a>')
                        .addClass('modify-news pull-right')
                        .append(
                        $('<span>')
                            .addClass('glyphicon glyphicon-pencil')
                    )
                        .hide()
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
                        .addClass('like-news')
                        .append(
                        $('<span>')
                            .html('0')
                    )
                        .append(
                        $('<span>')
                            .addClass('glyphicon glyphicon-thumbs-up')
                    )
                        .append(
                        $('<span>')
                            .html('J\'aime')
                    )
                )
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
    );

    if(admin) {
        $('div[data-news-id=' + id + '] .delete-news').fadeIn();
        //$('div[data-news-id=' + id + '] .modify-news').fadeIn();
    }
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
