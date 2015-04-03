/**
 * #HCSocial
 * @author Loïck Mahieux
 */

/**
 * FORMS
 * @type {{}}
 */
mobile.forms = {};

/**
 * Login Form
 */
mobile.forms.login = function () {
    if (mobile.debug)
        console.log('mobile.forms.login()');

    mobile.tools.ajaxForm(
        $('#form-login'),
        function (data) {
            if (data.success) {
                mobile.tools.alert('Connecté', 'Vous êtes maintenant connecté.', 'alert-success');
                window.location = '/mobile';
            }
        },
        function () {
            mobile.tools.alert('Erreur !', 'Erreur lors de la connexion.', 'alert-danger');
        });
};

/**
 * Signin Form
 */
mobile.forms.signin = function () {
    if (mobile.debug)
        console.log('mobile.forms.signin()');

    mobile.tools.ajaxForm(
        $('#form-signin'),
        function (data) {
            if (data.success) {
                mobile.tools.alert('Inscrit', 'Vous êtes maintenant inscrit.', 'alert-success');
                window.location = '/mobile/login';
            }
        },
        function () {
            mobile.tools.alert('Erreur !', 'Erreur lors de l\'inscription.', 'alert-danger');
        });
};

/**
 * Add news Form
 */
mobile.forms.addNews = function () {
    if (mobile.debug)
        console.log('mobile.forms.addNews()');

    mobile.tools.ajaxForm(
        $('#form-add-news'),
        function (data) {
            if (data.success) {
                $('#form-add-news')[0].reset();
                mobile.tools.alert('Publié !', 'Votre message a été publié avec succès.', 'alert-success');
                mobile.news.load();
            }
        },
        function () {
            mobile.tools.alert('Erreur !', 'Erreur lors de la publication de votre message.', 'alert-danger');
        });
};

/**
 * Add comments Form
 */
mobile.forms.addComments = function (newsId) {
    if (mobile.debug)
        console.log('mobile.forms.addComments()');

    var elem = $('.news[data-news-id=' + newsId + ']').find('form');

    mobile.tools.ajaxForm(
        elem,
        function(data) {
            if(data.success) {
                elem[0].reset();
                mobile.tools.alert('Publié !', 'Votre commentaire a été publié avec succès.', 'alert-success');
            }
        },
        function() {
            mobile.tools.alert('Erreur !', 'Erreur lors de la publication de votre commentaire.', 'alert-danger');
        }
    );
};