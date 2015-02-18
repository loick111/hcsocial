<?php

namespace app\controllers;

use SFramework\mvc\Controller;

class UserController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->getView()->redirect('/user/login');
    }

    public function login()
    {
        $this->getView()->render('user/login');
    }

    public function signin()
    {
        $this->getView()->render('user/signin');
    }
}