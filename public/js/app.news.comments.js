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

app.news.comments._create = function(username, firstname, lastname, mail, comment) {
    $('<div>')
        .addClass('media')
        .addClass('comments')
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
                .html(', le ' + date.date + ' à ' + date.time)
        ).append(
            $('<p>')
                .html(comment)
        )
    )
};