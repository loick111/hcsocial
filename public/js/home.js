/**
 * #HCSocial
 * @author Loïck Mahieux
 */

$(document).ready(function() {
    if (app.debug)
        console.log('home.ready()');

    // TOOLS
    app.tools.loadGravatar();
    app.tools.requiredInput();

    //FORMS
    app.forms.addNews();

    // NEWS
    app.news.load();
});