<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 15/03/15
 * Time: 18:41
 */

namespace app\controllers;


use app\models\newsModel;
use SFramework\Helpers\Authentication;
use SFramework\Helpers\Input;
use SFramework\mvc\Controller;

class NewsController extends Controller
{
    public function add() {}
    public function addPOST()
    {
        $this->getView()->ajax();
        $username = Authentication::getInstance()->getUserName();
        $message = Input::post('message');

        $model = new newsModel();

        $auth = Authentication::getInstance()->getOptions();

        $res = [
            'username' => $username,
            'fullname' => $auth['firstname'] . ' ' . $auth['lastname'],
            'mail' => $auth['mail'],
            'date' => date('Y-m-d H:i:s'),
            'message' => $message,
            'success' => false
        ];

        if ($model->add([
            'user' => $username,
            'message' => $message
        ])
        ) {
            $res['success'] = true;
        }

        echo json_encode($res);
    }

    public function loadAll()
    {
        $this->getView()->ajax();
        $model = new newsModel();
        $news = $model->getAll();

        echo json_encode($news);
    }
}