<?php

namespace app\controllers;

use SFramework\mvc\Controller;

class LoginController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->getView()->render('login/login');
    }

    public function signin()
    {
        $this->getView()->render('login/signin');
    }
}