/**
 * #HCSocial
 * @author Loïck Mahieux
 */

/**
 * NEWS
 * @type {{}}
 */
mobile.news = {};

/**
 * Load news
 */
mobile.news.load = function () {
    if (mobile.debug)
        console.log('mobile.news.load()');

    var latest = $('#news').attr('data-latest');

    mobile.tools.ajax(
        '/news/loadAll/' + latest,
        function (data) {
            $('#no-news').fadeOut();

            for (news in data) {
                $('.news[data-news-id=' + data[news].id + ']').remove();
                var date = mobile.tools.dateTime(data[news].date);
                mobile.news._create(
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

                mobile.news.comments.load(data[news].id);
                mobile.news.comments.displayToggle(data[news].id);
                mobile.forms.addComments(data[news].id);
                mobile.news.hide(data[news].id);
                mobile.news.like(data[news].id);
            }
        },
        function () {
            mobile.tools.alert('Erreur !', 'Erreur lors du chargement des publications.', 'alert-danger');
        }
    );
};

mobile.news.hide = function (newsId) {
    var news = $('.news[data-news-id=' + newsId + ']');
    var content = news.find('.content');

    if (content.height() > 200) {
        content.parent().append(
            $('<a>')
                .html('Afficher la suite')
                .click(function () {
                    if ($(this).html() == 'Afficher la suite') {
                        $(this).html('Réduire');
                        content.css('max-height', '');
                    }
                    else {
                        $(this).html('Afficher la suite');
                        content.css('max-height', '5em');
                    }
                })
        );
        content.css('max-height', '5em');
    }
};

/**
 * Like news
 */
mobile.news.like = function (newsId) {
    if (mobile.debug)
        console.log('mobile.news.like()');

    var elem = $('.news[data-news-id=' + newsId + ']');

    var _unlikeAction = function () {
        $.ajax({
            url: '/news/unlike/' + elem.attr('data-news-id'),
            success: function (data) {
                if (data.display)
                    alert(data.message);

                if (data.success) {
                    _unlikeProcess(data);
                    mobile.news.load();
                }
            },
            error: function () {
                mobile.tools.alert('Erreur !', 'Erreur lors du J\'aime Pas.', 'alert-danger');
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
                    mobile.news.load();
                }
            },
            error: function () {
                mobile.tools.alert('Erreur !', 'Erreur lors du J\'aime.', 'alert-danger');
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
        mobile.tools.ajax(
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
                mobile.tools.alert('Erreur !', 'Erreur lors du chargement des "J\'aime."', 'alert-danger')
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
mobile.news._create = function createNews(update, id, admin, username, mail, fullname, date, time, message) {
    if (mobile.debug)
        console.log('mobile.news._create()');

    if ($('#news').attr('data-latest') < update)
        $('#news').attr('data-latest', update);

    $('#news')
        .prepend(
        $('<div>')
            .addClass('news')
            .attr('data-news-id', id)
            .append(
            $('<div>')
                .addClass('ui-bar')
                .addClass('ui-bar-a')
                .append(
                $('<div>')
                    .addClass('ui-grid-a')
                    .append(
                    $('<div>')
                        .addClass('ui-block-a')
                        .addClass('profile')
                        .append(
                        $('<img>')
                            .addClass('gravatar')
                            .attr('src', mail)
                    )
                ).append(
                    $('<div>')
                        .addClass('ui-block-b')
                        .addClass('profile')
                        .append(
                        $('<span>')
                            .html(fullname)
                    ).append(
                        $('<span>')
                            .addClass('date')
                            .html('le ' + date + ' à ' + time)
                    )
                )
            )
        ).append(
            $('<div>')
                .addClass('ui-body')
                .addClass('ui-body-a')
                .append(
                $('<p>')
                    .addClass('content')
                    .html(message)
            ).append(
                $('<a>')
                    .addClass('link')
                    .addClass('like-news')
                    .append(
                    $('<span>')
                        .addClass('like-count')
                        .html('0')
                ).append(
                    $('<img>')
                        .addClass('like')
                        .attr('src', '/public/img/like.png')
                ).append(
                    $('<span>')
                        .addClass('like-text')
                        .html('J\'aime')
                )
            ).append(
                $('<a>')
                    .addClass('link')
                    .addClass('comments-display')
                    .html('Afficher les commentaires')
            )
        ).append(
            $('<div>')
                .addClass('ui-bar')
                .addClass('ui-bar-a')
                .addClass('comments')
        ).append(
            $('<div>')
                .addClass('ui-bar')
                .addClass('ui-bar-a')
                .append(
                $('<form>')
                    .attr('action', '/comments/add/' + id)
                    .attr('method', 'post')
                    .append(
                    $('<input>')
                        .attr('type', 'text')
                        .attr('name', 'message')
                        .attr('placeholder', 'Écrire un commentaire...')
                    )
                )

            )
    );

    $('.ui-page').trigger('create');
    mobile.tools.loadGravatar();
};
