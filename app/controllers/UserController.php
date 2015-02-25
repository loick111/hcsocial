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

    public function loginPOST()
    {
        $this->getView()->ajax();

        $result = ['POST' => $_POST];

        echo json_encode($result);
    }

    public function signin()
    {
        $this->getView()->render('user/signin');
    }
}