$(document).ready(function() {
    commentsToggle();
});

function commentsToggle() {
    $(".comments").hide();
    $(".comments-display").click(function() {
        $(this).parent().parent().find(".comments").slideToggle();
    })
}