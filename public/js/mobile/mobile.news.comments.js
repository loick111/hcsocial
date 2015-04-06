/**
 * #HCSocial
 * @author Loïck Mahieux
 */

/**
 * COMMENTS
 * @type {{}}
 */
mobile.news.comments = {};

/**
 * Load comments on news
 * @param newsId
 */
mobile.news.comments.load = function (newsId) {
    if (mobile.debug)
        console.log('mobile.news.comments.load()');

    mobile.tools.ajax(
        '/comments/load/' + newsId,
        function (data) {
            if (data.success) {
                if (data.comments.length == 0) {
                    $('.news[data-news-id=' + newsId + ']').find('.comments-display').hide();
                    $('.news[data-news-id=' + newsId + ']')
                        .find('.comments')
                        .append(
                        $('<p>')
                            .html('Pas de commentaires...')
                    )
                }
                for (comments in data.comments) {
                    var date = mobile.tools.dateTime(data.comments[comments].date);
                    mobile.news.comments._create(
                        data.comments[comments].id,
                        data.comments[comments].news,
                        data.comments[comments].username,
                        data.comments[comments].firstname,
                        data.comments[comments].lastname,
                        data.comments[comments].mail,
                        date.date,
                        date.time,
                        data.comments[comments].message
                    );
                }
            }
        },
        function () {
            mobile.tools.alert('Erreur !', 'Erreur lors du chargement des commentaires.', 'alert-danger');
        }
    );
};

/**
 * Display comments on news
 */
mobile.news.comments.displayToggle = function (newsId) {
    if (mobile.debug)
        console.log('mobile.news.comments.commentsDisplayToggle()');

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

/**
 * Create comments
 * @param username
 * @param firstname
 * @param lastname
 * @param mail
 * @param comment
 * @private
 */
mobile.news.comments._create = function (id, news, username, firstname, lastname, mail, date, time, comment) {
    if (mobile.debug)
        console.log('mobile.news.comments._create()');

    $('.news[data-news-id="' + news + '"]')
        .find('.comments')
        .append(
        $('<div>')
            .attr('data-comments-id', id)
            .addClass('ui-grid')
            .addClass('ui-grid-a')
            .addClass('comment')
            .append(
            $('<div>')
                .addClass('ui-block-a')
                .addClass('profile')
                .append(
                $('<a>')
                    .attr('href', '/users/show/' + username)
                    .append(
                    $('<img>')
                        .addClass('gravatar')
                        .attr('alt', firstname + ' ' + lastname)
                        .attr('src', mail)
                )
            )
        ).append(
            $('<div>')
                .addClass('ui-block-b')
                .addClass('profile')
                .append(
                $('<span>')
                    .html(firstname + ' ' + lastname)
            ).append(
                $('<span>')
                    .addClass('date')
                    .html('le ' + date + ' à ' + time)
            ).append(
                $('<p>')
                    .addClass('content')
                    .html(comment)
            )
        )
    );

    mobile.tools.loadGravatar();
};