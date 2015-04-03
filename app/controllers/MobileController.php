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

    public function login()
    {
        if (Authentication::getInstance()->isAuthenticated()) {
            $this->getView()->redirect('/mobile');
        }
        $this->getView()->render('/mobile/login');
    }

    public function signin()
    {
        if (Authentication::getInstance()->isAuthenticated()) {
            $this->getView()->redirect('/mobile');
        }
        $this->getView()->render('/mobile/signin');
    }

    public function logout()
    {
        session_destroy();
        $this->getView()->redirect('/mobile/login');
    }

    public function show()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            $this->getView()->redirect('/mobile/login');
        }

        $username = $this->getParams()[0];
        $model = new usersModel();

        $vars = [
            'user' => $model->getByUsername($username)
        ];

        $this->getView()->render('users/show', $vars);
    }


}