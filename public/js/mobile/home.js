/**
 * #HCSocial
* @author Loïck Mahieux
*/

$(document).ready(function () {
    if (mobile.debug)
        console.log('mobile.ready()');


    mobile.news.load();
    setInterval(mobile.news.load, 5 * 1000);
});