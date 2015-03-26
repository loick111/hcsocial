/**
 * #HCSocial
 * @author Loïck Mahieux
 */

$(document).ready(function () {
    if (app.debug)
        console.log('show.ready()');

    $('#loading').hide();

    // TOOLS
    app.tools.loadGravatar();
});