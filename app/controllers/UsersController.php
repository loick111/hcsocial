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
        if (!Authentication::getInstance()->isAuthenticated())
            $this->getView()->redirect('/users/login');

        $vars = [
            'user' => [
                'username' => 'loick111',
                'mail' => 'loick111@gmail.com',
                'hash' => md5('loick111@gmail.com'),
                'firstname' => 'Loïck',
                'lastname' => 'Mahieux'
            ]
        ];

        $this->getView()->render('users/show', $vars);
    }

    public function login()
    {
        if (Authentication::getInstance()->isAuthenticated())
            $this->getView()->redirect('/');
        $this->getView()->render('users/login');
    }

    public function logged() {}
    public function loggedPOST() {
        $this->getView()->ajax();

        if(Input::post('username') == 'loick111' && Input::post('password') == 'azerty') {
            Authentication::getInstance()->setAuthenticated('loick111', 1);
            $res = [
                'success' => true,
                'display' => true,
                'message' => 'Vous êtes maintenant connecté.'
            ];
        }else {
            $res = [
                'success' => false,
                'display' => true,
                'message' => 'La combinaison Nom d\'utilisateur/Mot de passe ne correspond pas.'
            ];
        }

        echo json_encode($res);
    }

    public function logout() {
        session_destroy();
        $this->getView()->redirect('/users/login');
    }

    public function signin()
    {
        if (Authentication::getInstance()->isAuthenticated())
            $this->getView()->redirect('/');
        $this->getView()->render('users/signin');
    }
}