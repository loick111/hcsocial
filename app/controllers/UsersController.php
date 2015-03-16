<?php

namespace app\controllers;

use app\models\usersModel;
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
        if (!Authentication::getInstance()->isAuthenticated()) {
            $this->getView()->redirect('/users/login');
        }

        $username = $this->getParams()[0];
        $model = new usersModel();

        $vars = [
            'user' => $model->getByUsername($username)
        ];

        $this->getView()->render('users/show', $vars);
    }

    public function login()
    {
        if (Authentication::getInstance()->isAuthenticated()) {
            $this->getView()->redirect('/');
        }
        $this->getView()->render('users/login');
    }

    public function loginPOST()
    {
        $this->getView()->ajax();
        $username = Input::post('username');
        $password = Input::post('password');

        $model = new usersModel();

        if ($user = $model->check($username, $password)) {
            Authentication::getInstance()->setAuthenticated($username, [
                'firstname' => $user['firstname'],
                'lastname' => $user['lastname'],
                'mail' => $user['mail']
            ]);
            $res = [
                'success' => true,
                'display' => false,
                'message' => 'Vous êtes maintenant connecté.'
            ];
        } else {
            $res = [
                'success' => false,
                'display' => true,
                'message' => 'La combinaison Nom d\'utilisateur/Mot de passe ne correspond pas.'
            ];
        }

        echo json_encode($res);
    }

    public function logout()
    {
        session_destroy();
        $this->getView()->redirect('/users/login');
    }

    public function signin()
    {
        if (Authentication::getInstance()->isAuthenticated()) {
            $this->getView()->redirect('/');
        }
        $this->getView()->render('users/signin');
    }

    public function signinPOST() {
        $this->getView()->ajax();
        $username = Input::post('username');
        $mail = Input::post('mail');
        $firstname = Input::post('firstname');
        $lastname = Input::post('lastname');
        $password = Input::post('password');
        $password2 = Input::post('password2');

        $res = [
            'success' => false,
            'message' => 'Erreur',
            'username' => $username,
            'mail' => $mail,
            'firstname' => $firstname,
            'lastname' => $lastname
        ];

        $model = new usersModel();

        if($password != $password2) {
            $res['message'] = 'Les mots de passe de correspondent pas.';
        }elseif(!empty($model->getByUsername($username))) {
            $res['message'] = 'Le nom d\'utilisateur est déjà utilisé.';
        }elseif(!empty($model->getByMail($mail))) {
            $res['message'] = 'L\'adresse mail est déjà utilisée.';
        }else {
            $model->add([
                'username' => $username,
                'mail' => $mail,
                'firstname' => $firstname,
                'lastname' => $lastname,
                'password' => $password
            ]);
            $res['success'] = true;
            $res['message'] = 'Vous êtes maintenant inscrit !';
        }

        echo json_encode($res);
    }

    //AJAX
    public function checkUser()
    {
    }

    public function checkUserGET()
    {
        $this->getView()->ajax();
        $username = Input::get('username');

        $model = new usersModel();

        $res = [
            'username' => $username,
            'available' => false
        ];

        if ($model->getByUsername($username)) {
            $res['available'] = false;
        }

        echo json_encode($res);
    }

    public function checkMail()
    {
    }

    public function checkMailGET()
    {
        $this->getView()->ajax();
        $mail = Input::get('mail');

        $model = new usersModel();

        $res = [
            'mail' => $mail,
            'available' => false
        ];

        if ($model->getByMail($mail)) {
            $res['available'] = false;
        }

        echo json_encode($res);
    }
}