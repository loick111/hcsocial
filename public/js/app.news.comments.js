/**
 * #HCSocial
 * @author Loïck Mahieux
 */

/**
 * COMMENTS
 * @type {{}}
 */
app.news.comments = {};

/**
 * Load comments on news
 * @param newsId
 */
app.news.comments.load = function (newsId) {
    if (app.debug)
        console.log('app.news.comments.load()');

    app.tools.ajax(
        '/comments/load/' + newsId,
        function (data) {
            if (data.success) {
                if (data.comments.length == 0) {
                    $('.news[data-news-id=' + newsId + ']')
                        .find('.comments')
                        .append(
                        $('<p>')
                            .html('Pas de commentaires.')
                    )
                }
                for (comments in data.comments) {
                    var date = app.tools.dateTime(data.comments[comments].date);
                    app.news.comments._create(
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

                app.news.comments.addToggle(newsId);
                app.news.comments.displayToggle(newsId);
            }
        },
        function () {
            app.tools.alert('Erreur !', 'Erreur lors du chargement des commentaires.', 'alert-danger');
        }
    );
};


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
                $('<form>')
                    .attr('method', 'post')
                    .attr('action', '/comments/add/' + newsId)
                    .addClass('form-add-comments')
                    .append(
                    $('<input>')
                        .attr('type', 'text')
                        .addClass('form-control')
                        .attr('name', 'message')
                        .attr('placeholder', 'Écrire un commentaire...')
                )
            )
        );
        app.forms.addComments($(this).parent().parent().find('form'));
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

/**
 * Create comments
 * @param username
 * @param firstname
 * @param lastname
 * @param mail
 * @param comment
 * @private
 */
app.news.comments._create = function (id, news, username, firstname, lastname, mail, date, time, comment) {
    if (app.debug)
        console.log('app.news.comments._create()');

    $('.news[data-news-id="' + news + '"]')
        .find('.comments')
        .append(
        $('<div>')
            .attr('data-comments-id', id)
            .addClass('media')
            .append(
            $('<div>')
                .addClass('media-left')
                .append(
                $('<a>')
                    .attr('href', '/users/show/' + username)
                    .append(
                    $('<img>')
                        .addClass('img-circle')
                        .addClass('gravatar')
                        .attr('alt', firstname + ' ' + lastname)
                        .attr('src', mail)
                )
            )
        ).append(
            $('<div>')
                .addClass('media-body')
                .append(
                $('<a>')
                    .addClass('pull-left')
                    .attr('href', '/users/show/' + username)
                    .html(firstname + ' ' + lastname)
            ).append(
                $('<span>')
                    .addClass('date')
                    .html(', le ' + date + ' à ' + time)
            ).append(
                $('<p>')
                    .html(comment)
            )
        )
    );

    app.tools.loadGravatar();
};