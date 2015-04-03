/**
 * #HCSocial
* @author Loïck Mahieux
*/

$(document).ready(function () {
    if (mobile.debug)
        console.log('mobile.ready()');

    $('#logout').click(function() {
        mobile.tools.ajax(
            '/mobile/logout',
            function() {
                window.location = '/mobile/login';
            },
            function() {

            }
        );
    });

    mobile.forms.addNews();

    mobile.news.load();
    setInterval(mobile.news.load, 5 * 1000);
});