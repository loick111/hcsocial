/**
 * #HCSocial
* @author Loïck Mahieux
*/

$(document).ready(function () {
    if (mobile.debug)
        console.log('mobile.ready()');

    $('#login').click(function() {
        window.location = '/mobile/login';
    });

    $('#signin').click(function() {
        window.location = '/mobile/signin';
    });

    mobile.forms.login();
    mobile.forms.signin();
});