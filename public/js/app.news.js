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

    //load on start
    app.tools.ajax(
        '/news/loadAll',
        function (data) {
            for (news in data) {
                var date = app.tools.dateTime(data[news].date);
                app.news._create(
                    data[news].id,
                    data[news].admin,
                    data[news].username,
                    data[news].mail,
                    data[news].firstname + ' ' + data[news].lastname,
                    date.date,
                    date.time,
                    data[news].message
                );
            }
        },
        function () {
            alert('Erreur lors du chargement des publications.');
        }
    );
};

/**
 * Utils news
 */
app.news.utils = function (newsId) {
    if (app.debug)
        console.log('app.news.utils()');

    app.news.delete(newsId);
    app.news.like(newsId);
    app.news.comments.addToggle(newsId);
    app.news.comments.displayToggle(newsId);
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
                    alert('Erreur lors de la suppression de la publication.');
                }
            });
        }
    })
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
                alert('Erreur lors du J\'aime.');
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
                alert('Erreur lors du J\'aime pas.');
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
                alert('Erreur lors du chargement des "J\'aime."')
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
app.news._create = function createNews(id, admin, username, mail, fullname, date, time, message) {
    if (app.debug)
        console.log('app.news._create()');

    $('#news-message').remove();
    $('#news')
        .attr('data-news-latest', id)
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

    app.news.utils(id);
};

/**
 * COMMENTS
 * @type {{}}
 */
app.news.comments = {};

/**
 * Comments add input on news
 */
app.news.comments.addToggle = function (newsId) {
    if (app.debug)
        console.log('app.news.comments.addToggle()');

    var elem = $('.news[data-news-id=' + newsId + ']');

    elem.find('.comments-action').click(function () {
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
app.news.comments.displayToggle = function (newsId) {
    if (app.debug)
        console.log('app.news.comments.commentsDisplayToggle()');

    var elem = $('.news[data-news-id=' + newsId + ']');

    elem.find(".comments").hide();
    elem.find(".comments-display").click(function () {
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