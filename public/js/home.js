/**
 * #HCSocial
 * @author Loïck Mahieux
 */

$(document).ready(function() {
    // TOOLS
    app.tools.loadGravatar();
    app.tools.requiredInput();

    // NEWS
    app.news.load();
});