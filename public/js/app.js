$(document).ready(function() {
    commentsToggle();
});

function commentsToggle() {
    $(".comments").hide();
    $(".comments-display").click(function() {
        $(this).parent().parent().find(".comments").slideToggle("fast", function () {
            if ($(this).is(':visible')) {
                $(this).parent()
                    .find(".comments-display")
                    .html('<span class="glyphicon glyphicon-comment"></span> Masquer les commentaires');
            } else {
                $(this).parent()
                    .find(".comments-display")
                    .html('<span class="glyphicon glyphicon-comment"></span> Afficher les commentaires');
            }
        });

    })
}