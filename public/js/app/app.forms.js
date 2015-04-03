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
            if (data.success) {
                app.tools.alert('Connecté', 'Vous êtes maintenant connecté.', 'alert-success');
                window.location = '/';
            }
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
            if (data.success) {
                app.tools.alert('Inscrit', 'Vous êtes maintenant inscrit.', 'alert-success');
                window.location = '/users/login';
            }
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
                app.tools.alert('Publié !', 'Votre message a été publié avec succès.', 'alert-success');
                app.news.load();
            }
        },
        function () {
            app.tools.alert('Erreur !', 'Erreur lors de la publication de votre message.', 'alert-danger');
        });
};

/**
 * Add comments Form
 */
app.forms.addComments = function (newsId) {
    if (app.debug)
        console.log('app.forms.addComments()');

    var elem = $('.news[data-news-id=' + newsId + ']').find('form');

    app.tools.ajaxForm(
        elem,
        function(data) {
            if(data.success) {
                elem[0].reset();
                app.tools.alert('Publié !', 'Votre commentaire a été publié avec succès.', 'alert-success');
            }
        },
        function() {
            app.tools.alert('Erreur !', 'Erreur lors de la publication de votre commentaire.', 'alert-danger');
        }
    );
};