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

    mobile.tools.loading.show();
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

    mobile.tools.loading.hide();
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
            .append(
            $('<div>')
                .addClass('ui-bar')
                .addClass('ui-bar-a')
                .html(fullname)
        ).append(
            $('<div>')
                .addClass('ui-body')
                .addClass('ui-body-a')
                .html(message)
        )
    )
};
