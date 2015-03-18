/**
 * #HCSocial
 * @author Loïck Mahieux
 */

/**
 * FORMS
 * @type {{}}
 */
app.forms = {};

/**
 * Login Form
 */
app.forms.login = function () {
    app.tools.ajaxForm(
        '#form-login',
        function (data) {
            //on success
            if (data.success)
                window.location = '/';
        },
        function (data) {
            //on error
        });
};

/**
 * Login Form
 */
app.forms.signin = function () {
    app.tools.ajaxForm(
        '#form-signin',
        function (data) {
            //on success
            if (data.success)
                window.location = '/users/login';
        },
        function () {
            //on error
        });
};

/**
 * Login Form
 */
app.forms.addNews = function () {
    app.tools.ajaxForm(
        '#form-add-news',
        function (data) {
            //on success
            if (data.success) {
                $('#form-add-news')[0].reset();
                var date = app.tools.dateTime(data.date);
                app.news._create(data.id, true, data.username, data.mail, data.fullname, date.date, date.time, data.message);
            }
        },
        function () {
            //on error
            alert('Erreur lors de la publication de votre message.');
        });
};