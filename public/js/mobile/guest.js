/**
 * #HCSocial
* @author Loïck Mahieux
*/

$(document).ready(function () {
    if (mobile.debug)
        console.log('mobile.ready()');

    mobile.forms.login();
    mobile.forms.signin();
});