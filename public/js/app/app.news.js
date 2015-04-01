/**
 * #HCSocial
 * @author Loïck Mahieux
 */

/**
 * NEWS
 * @type {{}}
 */
app.news = {};

/**
 * Load news
 */
app.news.load = function () {
    if (app.debug)
        console.log('app.news.load()');

    app.tools.loading.show();
    var latest = $('#news').attr('data-latest');

    app.tools.ajax(
        '/news/loadAll/' + latest,
        function (data) {
            console.log(data);
            if (data.length == 0) {
                //if ($('#no-news').length == 0) {
                //    $('#news').append(
                //        $('<div>')
                //            .attr('id', 'no-news')
                //            .addClass('col-lg-6 col-lg-offset-3')
                //            .append(
                //            $('<h2>')
                //                .addClass('centered')
                //                .html('Pas de publications.')
                //        )
                //    );
                //}
            } else {
                $('#no-news').fadeOut();

                for (news in data) {
                    $('.news[data-news-id=' + data[news].id + ']').remove();
                    var date = app.tools.dateTime(data[news].date);
                    app.news._create(
                        data[news].update,
                        data[news].id,
                        data[news].admin,
                        data[news].username,
                        data[news].mail,
                        data[news].firstname + ' ' + data[news].lastname,
                        date.date,
                        date.time,
                        data[news].message
                    );
                    app.news.comments.load(data[news].id);
                }
            }
        },
        function () {
            app.tools.alert('Erreur !', 'Erreur lors du chargement des publications.', 'alert-danger');
        }
    );

    app.tools.loading.hide();
};

/**
 * Utils news
 */
app.news.utils = function (newsId) {
    if (app.debug)
        console.log('app.news.utils()');

    app.news.delete(newsId);
    app.news.like(newsId);
    app.forms.addComments(newsId);

    var news = $('.news[data-news-id=' + newsId + ']');

    if (news.find('.content p').height() > 200) {
        news.find('.content')
            .append(
            $('<a>')
                .html('Afficher la suite')
                .click(function () {
                    if ($(this).html() == 'Afficher la suite') {
                        $(this).html('Réduire');
                        news.find('.content p').css('max-height', '');
                    }
                    else {
                        $(this).html('Afficher la suite');
                        news.find('.content p').css('max-height', '7em');
                    }
                })
        );
        news.find('.content p').css('max-height', '7em');
    }
};

/**
 * Delete news
 */
app.news.delete = function (newsId) {
    if (app.debug)
        console.log('app.news.delete()');

    var elem = $('.news[data-news-id=' + newsId + ']');

    elem.find('.delete-news')
        .click(function () {
        if (confirm('Êtes-vous sur de vouloir supprimer cette publication ?')) {
            $.ajax({
                url: '/news/delete/' + elem.attr('data-news-id'),
                success: function (data) {
                    if (!data.success && data.display) {
                        alert(data.message);
                    }

                    if (data.success) {
                        elem.remove();
                        elem.fadeOut();
                    }
                },
                error: function () {
                    app.tools.alert('Erreur !', 'Erreur lors de la suppression de la publication.', 'alert-danger');
                }
            });
        }
        });
};

/**
 * Like news
 */
app.news.like = function (newsId) {
    if (app.debug)
        console.log('app.news.like()');

    var elem = $('.news[data-news-id=' + newsId + ']');

    var _unlikeAction = function () {
        $.ajax({
            url: '/news/unlike/' + elem.attr('data-news-id'),
            success: function (data) {
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    _unlikeProcess(data);
                }
            },
            error: function () {
                app.tools.alert('Erreur !', 'Erreur lors du J\'aime Pas.', 'alert-danger');
            }
        });
    };

    var _unlikeProcess = function (data) {
        elem.find('.unlike-news')
            .removeClass('unlike-news')
            .addClass('like-news');

        elem.find('.like-news')
            .unbind()
            .click(_likeAction);

        elem.find('.like-count')
            .html(data.count);

        elem.find('.like-text')
            .html('J\'aime');
    };

    var _likeAction = function () {
        $.ajax({
            url: '/news/like/' + elem.attr('data-news-id'),
            success: function (data) {
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    _likeProcess(data);
                }
            },
            error: function () {
                app.tools.alert('Erreur !', 'Erreur lors du J\'aime.', 'alert-danger');
            }
        });
    };

    var _likeProcess = function (data) {
        elem.find('.like-news')
            .removeClass('like-news')
            .addClass('unlike-news');

        elem.find('.unlike-news')
            .unbind()
            .click(_unlikeAction);

        elem.find('.like-count')
            .html(data.count);

        elem.find('.like-text')
            .html('Je n\'aime plus');
    };

    elem.each(function () {
        app.tools.ajax(
            '/news/countLike/' + $(this).attr('data-news-id'),
            function (data) {
                if (data.success) {
                    if (data.liked) {
                        _likeProcess(data);
                    } else {
                        _unlikeProcess(data);
                    }
                }
            },
            function () {
                app.tools.alert('Erreur !', 'Erreur lors du chargement des "J\'aime."', 'alert-danger')
            }
        );
    });
};

/**
 * Create news
 * @param id
 * @param admin
 * @param username
 * @param mail
 * @param fullname
 * @param date
 * @param time
 * @param message
 * @private
 */
app.news._create = function createNews(update, id, admin, username, mail, fullname, date, time, message) {
    if (app.debug)
        console.log('app.news._create()');

    if ($('#news').attr('data-latest') < update)
        $('#news').attr('data-latest', update);

    $('#news')
        .prepend(
        $('<div>')
            .addClass('col-lg-6 col-lg-offset-3')
            .addClass('news')
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
                    .attr('class', 'panel-body content')
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
                )
            ).append(
                $('<div>')
                    .attr('class', 'panel-body comments')
            ).append(
                $('<div>')
                    .attr('class', 'panel-footer')
                    .append(
                    $('<form>')
                        .attr('method', 'post')
                        .attr('action', '/comments/add/' + id)
                        .addClass('form-add-comments')
                        .append(
                        $('<input>')
                            .attr('type', 'text')
                            .addClass('form-control')
                            .attr('name', 'message')
                            .attr('placeholder', 'Écrire un commentaire...')
                    )
                )
            )
        )
            .hide()
            .fadeIn()
    );

    if (admin) {
        $('div[data-news-id=' + id + '] .delete-news').fadeIn();
    }

    app.news.utils(id);
};
