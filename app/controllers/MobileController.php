<?php

namespace app\controllers;

use SFramework\Helpers\Authentication;
use SFramework\mvc\Controller;

class MobileController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            $this->getView()->redirect('/mobile/login');
        }
        $this->getView()->render('/mobile/index');
    }
}