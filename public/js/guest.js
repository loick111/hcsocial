/**
 * #HCSocial
 * @author Loïck Mahieux
 */

$(document).ready(function () {
    if (app.debug)
        console.log('guest.ready()');

    // TOOLS
    app.tools.loadGravatar();
    app.tools.requiredInput();

    //FORMS
    app.forms.login();
    app.forms.signin();
});