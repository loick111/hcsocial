/**
 * Created by loick on 18/03/15.
 */
var app = {};

/**
 * TOOLS
 * @type {{}}
 */
app.tools = {};

/**
 * Ajax from a Form
 * @param form
 * @param success
 * @param error
 */
app.tools.formAjax = function (form, success, error) {
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
};

/**
 * Load all pictures from Gravatar with class 'gravatar'
 */
app.tools.loadGravatar = function () {
    $('.gravatar').each(function () {
        $(this).attr('src', 'http://gravatar.com/avatar/' + CryptoJS.MD5($(this).attr('src')) + '?s=150');
    });

    $('input[name="mail"]').change(function () {
        var hash = CryptoJS.MD5($('input[name="mail"]').val());
        $('#img-profile').attr('src', 'http://gravatar.com/avatar/' + hash + '?s=150');
    });
};

/**
 * Show if input is correct or not
 */
app.tools.requiredInput = function () {
    $('input[required]').focusout(function () {
        if ($(this).parent().find('span').length == 1)
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
};

/**
 * NEWS
 * @type {{}}
 */
app.news = {};

/**
 * PRIVATE
 * Create news
 * @param id
 * @param admin
 * @param username
 * @param mail
 * @param fullname
 * @param date
 * @param time
 * @param message
 */
app.news._create = function createNews(id, admin, username, mail, fullname, date, time, message) {
    $('#news-message').hide();

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
                ).append(
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
                ).append(
                    $('<a>')
                        .addClass('delete-news')
                        .addClass('pull-right')
                        .append(
                        $('<span>')
                            .addClass('glyphicon glyphicon-remove')
                    )
                        .hide()
                )
            ).append(
                $('<div>')
                    .attr('class', 'panel-body')
                    .append(
                    $('<p>')
                        .html(message)
                )
            ).append(
                $('<div>')
                    .attr('class', 'panel-footer')
                    .append(
                    $('<a>')
                        .addClass('like-news')
                        .append(
                        $('<span>')
                            .addClass('like-count')
                            .html('0')
                    )
                        .append(
                        $('<span>')
                            .addClass('glyphicon glyphicon-thumbs-up')
                    )
                        .append(
                        $('<span>')
                            .addClass('like-text')
                            .html('J\'aime')
                    )
                ).append(
                    $('<a>')
                        .attr('class', 'comments-display')
                        .append(
                        $('<span>')
                            .attr('class', 'glyphicon glyphicon-comment')
                    ).append(
                        $('<span>')
                            .html('Afficher les commentaires')
                    )
                ).append(
                    $('<a>')
                        .attr('class', 'comments-action')
                        .append(
                        $('<span>')
                            .attr('class', 'glyphicon glyphicon-pencil')
                    ).append(
                        $('<span>')
                            .html('Commenter')
                    )
                )
            ).append(
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

    if (admin) {
        $('div[data-news-id=' + id + '] .delete-news').fadeIn();
    }
};

/**
 * Delete news
 */
app.news.delete = function () {
    $('.delete-news').click(function () {
        if (confirm('Êtes-vous sur de vouloir supprimer cette publication ?')) {
            var news = $(this).parent().parent().parent();
            $.ajax({
                url: '/news/delete/' + news.attr('data-news-id'),
                success: function (data) {
                    if (!data.success && data.display) {
                        alert(data.message);
                    }

                    if (data.success) {
                        news.remove();
                        news.fadeOut();
                    }
                },
                error: function (data) {
                    alert('Erreur lors de la suppression de la publication.');
                }
            });
        }
    })
};

/**
 * Like news
 */
app.news.like = function () {
    $('.like-news').each(function () {
        var news = $(this).parent().parent().parent();
        $.ajax({
            url: '/news/countLike/' + news.attr('data-news-id'),
            success: function (data) {
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    news.find('.like-count')
                        .html(data.count);

                    if (data.liked) {
                        news.find('.like-news')
                            .removeClass('like-news')
                            .addClass('unlike-news')
                            .unbind()
                            .bind()
                        news.find('.like-text')
                            .html('Je n\'aime plus')
                    }
                }
            },
            error: function (data) {

            }
        });
    });

    $('.like-news').click(function () {
        var news = $(this).parent().parent().parent();
        $.ajax({
            url: '/news/like/' + news.attr('data-news-id'),
            success: function (data) {
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    news.find('.like-count')
                        .html(data.count);
                }
            },
            error: function (data) {

            }
        });
    });

    $('.unlike-news').click(function () {
        var news = $(this).parent().parent().parent();
        $.ajax({
            url: '/news/unlike/' + news.attr('data-news-id'),
            success: function (data) {
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    news.find('.like-count')
                        .html(data.count);
                }
            },
            error: function (data) {

            }
        });
    });
};

/**
 * COMMENTS
 * @type {{}}
 */
app.news.comments = {};

/**
 * Comments add input on news
 */
app.news.comments.addToggle = function () {
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
};

/**
 * Display comments on news
 */
app.news.comments.displayToggle = function commentsDisplayToggle() {
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
};