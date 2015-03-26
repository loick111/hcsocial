/**
 * #HCSocial
 * @author Loïck Mahieux
 */

/**
 * TOOLS
 * @type {{}}
 */
app.tools = {};

/**
 * Ajax call from Form
 * @param form
 * @param success
 * @param error
 */
app.tools.ajaxForm = function (form, success, error) {
    form.submit(function () {
        var data = $(this).serialize();
        $.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: data,
            success: function (data) {
                if (data.display)
                    app.tools.alert('Message', data.message, 'alert-info');
                success(data);
            },
            error: error
        });
        return false;
    });

    form.find('textarea').keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            form.submit();
        }
    });
};

/**
 * Ajax call
 * @param url
 * @param success
 * @param error
 */
app.tools.ajax = function (url, success, error) {
    $.ajax({
        url: url,
        success: function (data) {
            if (data.display)
                alert(data.message);
            success(data);
        },
        error: error
    });
};

/**
 *
 * @param timestamp
 * @returns {{}}
 */
app.tools.dateTime = function (timestamp) {
    if (!timestamp)
        timestamp = 'now';

    var date = new Date(timestamp * 1000);
    var res = {};
    res.date = date.toLocaleDateString();
    res.time = date.toLocaleTimeString();

    return res;
};

/**
 * Load all pictures from Gravatar with class 'gravatar'
 */
app.tools.loadGravatar = function () {
    $('.gravatar').each(function () {
        if (!$(this).attr('loaded')) {
            $(this).attr('src', 'http://gravatar.com/avatar/' + CryptoJS.MD5($(this).attr('src')) + '?s=150');
            $(this).attr('loaded', true);
        }
    });

    $('input[name="mail"]').change(function () {
        var hash = CryptoJS.MD5($('input[name="mail"]').val());
        $('#img-profile').attr('src', 'http://gravatar.com/avatar/' + hash + '?s=150');
    });
};

/**
 * Show if input is correct or not
 */
app.tools.requiredInput = function () {
    $('input[required]').focusout(function () {
        if ($(this).parent().find('span').length == 1)
            $(this).parent()
                .append(
                $('<span>')
                    .addClass('glyphicon')
                    .addClass('form-control-feedback')
            );

        if ($(this).val() == '') {
            $(this).parent()
                .addClass('has-error');
            $(this).parent()
                .find('span.form-control-feedback')
                .removeClass('glyphicon-ok')
                .addClass('glyphicon-remove');
        } else {
            $(this).parent()
                .removeClass('has-error')
                .addClass('has-success');
            $(this).parent()
                .find('span.form-control-feedback')
                .removeClass('glyphicon-remove')
                .addClass('glyphicon-ok');
        }
    });
};

/**
 * Add alert
 * Available type = [danger, warning, info, success]
 */
app.tools.alert = function (title, message, type) {
    $('#alert').find('h4').html(title);
    $('#alert').find('p').html(message);
    $('#alert')
        .removeClass('alert-danger')
        .removeClass('alert-info')
        .removeClass('alert-warning')
        .removeClass('alert-success')
        .addClass(type);

    $('#alert').fadeIn();
    $('#alert').delay(2000).fadeOut();
};

/**
 * LOADING
 * @type {{}}
 */
app.tools.loading = {};

/**
 * Show loading
 */
app.tools.loading.show = function () {
    $('#loading').fadeIn();
};

/**
 * Hide loading
 */
app.tools.loading.hide = function () {
    $('#loading').fadeOut();
};