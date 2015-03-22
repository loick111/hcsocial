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
                        .attr('name', 'comments')
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
app.news.comments._create = function(newsId, username, firstname, lastname, mail, date, time, comment) {
    $('.news[data-news-id=' + newsId + ']')
        .find('comments')
        .append(
        $('<div>')
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
                    .html(', le ' + date + ' à ' + time)
            ).append(
                $('<p>')
                    .html(comment)
            )
        )
    );
};