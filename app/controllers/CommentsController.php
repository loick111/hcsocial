<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 15/03/15
 * Time: 18:41
 */

namespace app\controllers;


use app\models\commentsModel;
use app\models\newsModel;
use SFramework\Exceptions\NotAuthenticatedException;
use SFramework\Helpers\Authentication;
use SFramework\Helpers\Input;
use SFramework\mvc\Controller;

class CommentsController extends Controller
{
    public function add()
    {
    }

    public function addPOST()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $username = Authentication::getInstance()->getUserName();
        $options = Authentication::getInstance()->getOptions();
        $news = $this->getParams()[0];
        $message = Input::post('message');
        $model = new commentsModel();
        $newsModel = new newsModel();

        $res = [
            'success' => false,
            'display' => true,
            'comments' => [
                'username' => $username,
                'firstname' => $options['firstname'],
                'lastname' => $options['lastname'],
                'mail' => $options['mail'],
                'message' => $message
            ]
        ];

        if (empty($newsModel->get($news))) {
            $res['message'] = 'La publication n\'existe pas.';
        } else {
            $model->add([
                'username' => $username,
                'news' => $news,
                'message' => $message
            ]);
            $res['success'] = true;
            $res['display'] = false;
            $res['message'] = 'Commentaire ajouté.';
        }

        echo json_encode($res);
    }

    public function load()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $id = $this->getParams()[0];
        $newsModel = new newsModel();
        $commentsModel = new commentsModel();

        $res = [
            'display' => true,
            'success' => false
        ];

        if (empty($newsModel->get($id))) {
            $res['message'] = 'La publication n\'existe pas.';
        } else {
            $comments = $commentsModel->getAll($id);
            $res['success'] = true;
            $res['display'] = false;
            $res['message'] = 'Succès.';

            foreach ($comments as &$n) {
                $n['message'] = strip_tags(nl2br($n['message']), '<br>');
                $n['date'] = strtotime($n['date']);

                $n['admin'] = false;
                if ($n['username'] == Authentication::getInstance()->getUserName()) {
                    $n['admin'] = true;
                }
            }

            $res['comments'] = $comments;
        }

        echo json_encode($res);
    }

    public function delete()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $id = $this->getParams()[0];
        $model = new commentsModel();

        $res = [
            'display' => true,
            'success' => false
        ];

        $comments = $model->get($id);

        if (empty($comments)) {
            $res['message'] = 'Le commentaire n\'existe pas.';
        } elseif ($comments['username'] != Authentication::getInstance()->getUserName()) {
            $res['message'] = 'Vous n\'êtes pas l\'auteur de la news.';
        } else {
            $model->delete($id);
            $res['success'] = true;
            $res['message'] = 'Le commentaire a bien été supprimé.';
        }

        echo json_encode($res);
    }
}
