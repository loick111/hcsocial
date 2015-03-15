$(document).ready(function() {
    addNews('loick111', 'Loïck Mahieux', '03/08/2015', '08:32', 'Contenu du message');
    addNews('loick111', 'Miléna Marchois', '05/04/2015', '10:26', "Je t'aime ! :D <3");
    commentsToggle();

    $('#connect').click(function() {
        window.location.replace("/users/logged")
    });
});

function commentsToggle() {
    $(".comments").hide();
    $(".comments-display").click(function() {
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
}

function addNews(username, fullname, date, time, message) {
    $('#loading-news').remove();

    $('#news')
        .prepend(
            $('<div>')
                .attr('class', 'col-lg-8 col-lg-offset-2')
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
                                                        .attr('src', '/public/img/users/' + username + '.png')
                                                        .attr('alt', fullname)
                                                        .attr('class', 'img-circle profile')
                                                )
                                        )
                                )
                                .append(
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
                                )
                        )
                        .append(
                            $('<div>')
                                .attr('class', 'panel-body')
                                .append(
                                    $('<p>')
                                        .html(message)
                                )
                        )
                        .append(
                            $('<div>')
                                .attr('class', 'panel-footer')
                                .append(
                                    $('<a>')
                                        .attr('class', 'comments-display')
                                        .append(
                                            $('<span>')
                                                .attr('class', 'glyphicon glyphicon-comment')
                                        )
                                        .append(
                                            $('<span>')
                                                .html('Afficher les commentaires')
                                        )
                                )
                        )
                        .append(
                            $('<div>')
                                .attr('class', 'panel-body comments')
                                .append(
                                    $('<p>')
                                        .html('Pas de commentaires')
                                )
                        )
                        .append(
                            $('<div>')
                                .attr('class', 'panel-footer')
                                .append(
                                    $('<input>')
                                        .attr('type', 'text')
                                        .attr('class', 'form-control')
                                        .attr('placeholder', 'Écrire un commentaire...')
                                )

                        )
                )
        )
}