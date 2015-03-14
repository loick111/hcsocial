<?php

namespace app\controllers;

use SFramework\Helpers\Authentication;
use SFramework\mvc\Controller;

class HomeController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        if (!Authentication::getInstance()->isAuthenticated())
            $this->getView()->redirect('/users/login');
        $this->getView()->render('/home/index');
    }
}