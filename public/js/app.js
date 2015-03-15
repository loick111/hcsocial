$(document).ready(function() {
    createNews('loick111', 'loick111@gmail.com', 'Loïck Mahieux', '03/08/2015', '08:32', 'Pellentesque vel bibendum mauris. Fusce volutpat dolor ut purus aliquet tristique. Aliquam rhoncus turpis sed eros euismod, vitae pretium sem interdum. Duis leo ligula, eleifend in risus ut, tempus congue sapien. Phasellus tincidunt varius odio a fermentum. Sed vel odio suscipit, ultricies diam at, egestas ex. Ut ut libero nec risus rhoncus lacinia. Quisque quis leo accumsan, tristique ipsum et, feugiat est. Etiam quam neque, tincidunt in odio a, rhoncus condimentum mi.');

    $('#connect').click(function() {
        window.location.replace("/users/logged")
    });

    start();
});

function start() {
    checkRequired();
    changeImgProfile();
    commentsDisplayToggle();
    commentsAddToggle();
}

function commentsDisplayToggle() {
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

function createNews(username, mail, fullname, date, time, message) {
    $('#loading-news').remove();

    $('#news')
        .prepend(
            $('<div>')
                .attr('class', 'col-lg-6 col-lg-offset-3')
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
                                .append(
                                    $('<a>')
                                        .attr('class', 'comments-action')
                                        .append(
                                        $('<span>')
                                            .attr('class', 'glyphicon glyphicon-pencil')
                                    )
                                        .append(
                                        $('<span>')
                                            .html('Commenter')
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
                )
        )
}

function commentsAddToggle() {
    $('.comments-action').click(function() {
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
}

function checkRequired() {
    $('input[required]').focusout(function() {
        if($(this).val() == '') {
            $(this).parent()
                .addClass('has-error');
        } else {
            $(this).parent()
                .removeClass('has-error')
                .addClass('has-success');
        }
    });
}

function changeImgProfile() {
    $('input[name="mail"]').change(function() {
        var hash = CryptoJS.MD5($('input[name="mail"]').val());

        $('#img-profile').attr('src', 'http://gravatar.com/avatar/' + hash + '?s=150');
    });
}

$('form').submit(function() {
    var data = $(this).serialize();
    $.ajax({
        type: $(this).attr("method"),
        url: $(this).attr("action"),
        data: data,

        success: function(data) {
            if(data.display)
                alert(data.message);
            if(data.success)
                window.location = '/';
        }
    });
    return false;
});