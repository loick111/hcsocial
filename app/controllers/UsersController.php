<?php

namespace app\controllers;

use SFramework\mvc\Controller;

class UsersController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->getView()->redirect('/users/login');
    }

    public function show()
    {
        $this->getView()->render('users/show');
    }

    public function login()
    {
        $this->getView()->render('users/login');
    }

    public function signin()
    {
        $this->getView()->render('users/signin');
    }
}