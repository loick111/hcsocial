$(document).ready(OnReady);

function OnReady() {
    $('.container').on('submit', 'form', OnSubmit);
}


function OnSubmit(data) {
    var data = $(this).serialize();
    $(this).find('input').prop('disabled', 'true');

    $.ajax({
        type: $(this).attr("method"),
        url: $(this).attr("action"),
        data: data,
        success: OnSuccess
    });

    return false;
}

function OnSuccess(result) {
    console.log(result);
}