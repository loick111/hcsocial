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
            alert('Erreur de chargement des publications.');
        }
    );
};

/**
 * Utils news
 */
app.news.utils = function () {
    if (app.debug)
        console.log('app.news.utils()');

    app.news.delete();
    app.news.like();
    app.news.comments.addToggle();
    app.news.comments.displayToggle();
};

/**
 * Delete news
 */
app.news.delete = function () {
    if (app.debug)
        console.log('app.news.delete()');

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
    if (app.debug)
        console.log('app.news.like()');

    /**
     * Like Action
     * @private
     */
    var _likeAction = function (e) {
        var news = $(this).parent().parent().parent();
        $.ajax({
            url: '/news/like/' + news.attr('data-news-id'),
            success: function (data) {
                //on success
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    news.find('.like-count')
                        .html(data.count);
                }
            },
            error: function (data) {
                //on error
            }
        });
    };

    /**
     * Unlike Action
     * @private
     */
    var _unlikeAction = function () {
        var news = $(this).parent().parent().parent();
        $.ajax({
            url: '/news/unlike/' + news.attr('data-news-id'),
            success: function (data) {
                //on success
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    news.find('.like-count')
                        .html(data.count);
                }
            },
            error: function (data) {
                //on error
            }
        });
    };

    $('.news').each(function () {
        app.tools.ajax(
            '/news/countLike/' + $(this).attr('data-news-id'),
            function (data) {
                if (data.success) {
                    $(this).find('.like-count')
                        .html(data.count);

                    if (data.liked) {
                        $(this).find('.like-news')
                            .removeClass('like-news')
                            .addClass('unlike-news')
                            .click(_unlikeAction)
                        $(this).find('.like-text')
                            .html('Je n\'aime plus');
                    } else {
                        $(this).find('.unlike-news')
                            .removeClass('unlike-news')
                            .addClass('like-news')
                            .click(_likeAction);
                        $(this).find('.like-text')
                            .html('J\'aime');
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

    app.news.utils();
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
    if (app.debug)
        console.log('app.news.comments.addToggle()');

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
app.news.comments.displayToggle = function () {
    if (app.debug)
        console.log('app.news.comments.commentsDisplayToggle()');

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