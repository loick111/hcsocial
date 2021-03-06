<?php

require 'vendor/autoload.php';

session_start();

define('CR', "\n");
define('TAB', '    ');

define('DS', DIRECTORY_SEPARATOR);
define('FSROOT', __DIR__ . DS);

if (dirname($_SERVER['SCRIPT_NAME']) != '/') {
    define('WEBROOT', dirname($_SERVER['SCRIPT_NAME']) . DS);
} else {
    define('WEBROOT', dirname($_SERVER['SCRIPT_NAME']));
}

date_default_timezone_set('Europe/Paris');

define('DEBUG', true);

if (DEBUG) {
    ini_set('display_errors', true);
    ini_set('html_errors', true);
    error_reporting(E_ALL);
}

function main()
{
    \SFramework\Database\DatabaseProvider::connect('app/config/database.json');

    $router = new \SFramework\Routing\Router();

    $classRouting = new \SFramework\Routing\ClassRouting('\app\controllers\\');
    $classRouting->addClass('Users');
    $classRouting->addClass('News');
    $classRouting->addClass('Comments');
    $classRouting->addClass('Mobile');

    $classRouting->generateRoute($router);

    $router->add('/errors/err404', new \app\controllers\ErrorsController(), 'err404');
    $router->add('/', new \app\controllers\HomeController(), 'index');

    $router->matchCurrentRequest();
}

if (DEBUG) {
    main();
} else {
    try {
        main();
    } catch (Exception $e) {
        echo 'Internal server error.';
    }
}
