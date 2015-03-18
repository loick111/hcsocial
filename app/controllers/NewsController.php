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

        if(empty($message)) {
            $res = [
                'display' => true,
                'success' => false,
                'message' => 'Message vide.'
            ];
        }else {

            $model = new newsModel();

            $auth = Authentication::getInstance()->getOptions();

            $res = [
                'username' => $username,
                'fullname' => $auth['firstname'] . ' ' . $auth['lastname'],
                'mail' => $auth['mail'],
                'admin' => true,
                'date' => time(),
                'message' => nl2br($message),
                'success' => false
            ];

            if ($res['id'] = $model->add([
                'user' => $username,
                'message' => $message
            ])
            ) {
                $res['success'] = true;
            }
        }

        echo json_encode($res);
    }

    public function loadAll()
    {
        $this->getView()->ajax();
        $model = new newsModel();
        $news = $model->getAll();

        foreach($news as &$n) {
            $n['message'] = htmlentities(nl2br($n['message']));
            $n['date'] = strtotime($n['date']);

            $n['admin'] = false;
            if($n['username'] == Authentication::getInstance()->getUserName())
                $n['admin'] = true;
        }

        echo json_encode($news);
    }

    public function delete() {
        $this->getView()->ajax();
        $model = new newsModel();

        $id = $this->getParams()[0];
        $news = $model->get($id);

        $res = [
            'display' => true,
            'success' => false
        ];

        if(!$news) {
            $res['message'] = 'La news n\'existe pas.';
        }elseif($news['username'] != Authentication::getInstance()->getUserName()) {
            $res['message'] = 'Vous n\'êtes pas l\'auteur de la news.';
        }else {
            $model->delete($id);
            $res['success'] = true;
            $res['message'] = 'La news a bien été supprimée.';
        }

        echo json_encode($res);
    }
}