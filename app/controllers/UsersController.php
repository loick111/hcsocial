<?php

namespace app\controllers;

use SFramework\Helpers\Authentication;
use SFramework\Helpers\Input;
use SFramework\mvc\Controller;

class UsersController extends Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->getView()->redirect('/');
    }

    public function show()
    {
        //if (!Authentication::getInstance()->isAuthenticated())
        //    $this->getView()->redirect('/users/login');

        $vars = ['username' => $this->getParams()[0]];

        $this->getView()->render('users/show', $vars);
    }

    public function login()
    {
        if (Authentication::getInstance()->isAuthenticated())
            $this->getView()->redirect('/');
        $this->getView()->render('users/login');
    }

    public function logout() {

    }

    public function signin()
    {
        if (Authentication::getInstance()->isAuthenticated())
            $this->getView()->redirect('/');
        $this->getView()->render('users/signin');
    }
}