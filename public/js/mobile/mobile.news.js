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
                //mobile.news.comments.load(data[news].id);
            }
        },
        function () {
            mobile.tools.alert('Erreur !', 'Erreur lors du chargement des publications.', 'alert-danger');
        }
    );
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
                .addClass('links')
                .append(
                $('<p>')
                    .addClass('content')
                    .html(message)
            ).append(
                $('<a>')
                    .addClass('like-news')
                    .html('J\'aime')
            ).append(
                $('<a>')
                    .addClass('comments-display')
                    .html('Afficher les commentaires')
            )
        )
    );

    mobile.tools.loadGravatar();
};
