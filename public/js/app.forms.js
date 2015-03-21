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
            if (data.success)
                window.location = '/';
        },
        function () {
            app.tools.alert('Erreur !', 'Erreur lors de la connexion.', 'alert-danger');
        });
};

/**
 * Signin Form
 */
app.forms.signin = function () {
    app.tools.ajaxForm(
        '#form-signin',
        function (data) {
            if (data.success)
                window.location = '/users/login';
        },
        function () {
            app.tools.alert('Erreur !', 'Erreur lors de l\'inscription.', 'alert-danger');
        });
};

/**
 * Add news Form
 */
app.forms.addNews = function () {
    app.tools.ajaxForm(
        '#form-add-news',
        function (data) {
            if (data.success) {
                $('#form-add-news')[0].reset();
                var date = app.tools.dateTime(data.date);
                // todo: reload news
                app.news._create(data.id, true, data.username, data.mail, data.fullname, date.date, date.time, data.message);
                app.tools.alert('Publié', 'Votre message a été publié avec succès.', 'alert-success');
            }
        },
        function () {
            app.tools.alert('Erreur !', 'Erreur lors de la publication de votre message.', 'alert-danger');
        });
};