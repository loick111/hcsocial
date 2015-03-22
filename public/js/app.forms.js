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
    if (app.debug)
        console.log('app.forms.login()');

    app.tools.ajaxForm(
        $('#form-login'),
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
    if (app.debug)
        console.log('app.forms.signin()');

    app.tools.ajaxForm(
        $('#form-signin'),
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
    if (app.debug)
        console.log('app.forms.addNews()');

    app.tools.ajaxForm(
        $('#form-add-news'),
        function (data) {
            if (data.success) {
                $('#form-add-news')[0].reset();
                var date = app.tools.dateTime(data.date);
                // todo: reload news
                app.news._create(data.id, true, data.username, data.mail, data.fullname, date.date, date.time, data.message);
                app.tools.alert('Publié !', 'Votre message a été publié avec succès.', 'alert-success');
            }
        },
        function () {
            app.tools.alert('Erreur !', 'Erreur lors de la publication de votre message.', 'alert-danger');
        });
};

/**
 * Add comments Form
 */
app.forms.addComments = function(elem) {
    if (app.debug)
        console.log('app.forms.addComments()');

    app.tools.ajaxForm(
        elem,
        function(data) {
            if(data.success) {
                elem[0].reset();
                var date = app.tools.dateTime(data.date);
                // todo: reload comments
                app.news.comments._create(data.id, data.username, data.firstname, data.lastname, data.mail, date.date, date.time, data.comments);
                app.tools.alert('Publié !', 'Votre commentaire a été publié avec succès.', 'alert-success');
            }
        },
        function() {
            app.tools.alert('Erreur !', 'Erreur lors de la publication de votre commentaire.', 'alert-danger');
        }
    );
};