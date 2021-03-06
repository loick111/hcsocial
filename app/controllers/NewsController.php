<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 15/03/15
 * Time: 18:41
 */

namespace app\controllers;


use app\models\likesModel;
use app\models\newsModel;
use SFramework\Exceptions\NotAuthenticatedException;
use SFramework\Helpers\Authentication;
use SFramework\Helpers\Input;
use SFramework\mvc\Controller;

class NewsController extends Controller
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
        $message = Input::post('message');

        if (empty($message)) {
            $res = [
                'display' => true,
                'success' => false,
                'message' => 'Message vide.'
            ];
        } else {

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
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $model = new newsModel();
        $param = $this->getParams()[0];
        $latest = (int)$param;

        $news = $model->getAll($latest);

        foreach ($news as &$n) {
            $n['message'] = strip_tags(nl2br($n['message']), '<br>');
            $n['date'] = strtotime($n['date']);
            $n['update'] = strtotime($n['update']);

            $n['admin'] = false;
            if ($n['username'] == Authentication::getInstance()->getUserName()) {
                $n['admin'] = true;
            }
        }

        echo json_encode($news);
    }

    public function delete()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $model = new newsModel();

        $id = $this->getParams()[0];
        $news = $model->get($id);

        $res = [
            'display' => true,
            'success' => false
        ];

        if (!$news) {
            $res['message'] = 'La news n\'existe pas.';
        } elseif ($news['username'] != Authentication::getInstance()->getUserName()) {
            $res['message'] = 'Vous n\'êtes pas l\'auteur de la news.';
        } else {
            $model->delete($id);
            $res['success'] = true;
            $res['message'] = 'La news a bien été supprimée.';
        }

        echo json_encode($res);
    }

    public function countLikes()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $news = $this->getParams()[0];
        $username = Authentication::getInstance()->getUserName();

        $modelNews = new newsModel();
        $modelLikes = new likesModel();

        $res = [
            'success' => false,
            'display' => true,
            'id' => $news,
            'count' => 0
        ];

        if (empty($modelNews->get($news))) {
            $res['message'] = 'La publication n\'existe pas.';
        } else {
            $res['success'] = true;
            $res['display'] = false;
            $res['message'] = 'Réussi.';
            $res['count'] = $modelLikes->count($news)['count'];

            $res['liked'] = false;
            if ($modelLikes->get($username, $news)) {
                $res['liked'] = true;
            }
        }

        echo json_encode($res);
    }

    public function like()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $news = $this->getParams()[0];
        $username = Authentication::getInstance()->getUserName();

        $modelNews = new newsModel();
        $modelLikes = new likesModel();

        $res = [
            'success' => false,
            'display' => true
        ];

        if (empty($modelNews->get($news))) {
            $res['message'] = 'La publication n\'existe pas.';
        } elseif (!empty($modelLikes->get($username, $news))) {
            $res['message'] = 'Vous aimez déjà cette publication.';
        } else {
            $modelLikes->add($username, $news);
            $res['success'] = true;
            $res['display'] = false;
            $res['message'] = 'Vous aimez la publication.';
            $res['count'] = $modelLikes->count($news)['count'];
        }

        echo json_encode($res);
    }

    public function unlike()
    {
        if (!Authentication::getInstance()->isAuthenticated()) {
            throw new NotAuthenticatedException();
        }

        $this->getView()->ajax();
        $news = $this->getParams()[0];
        $username = Authentication::getInstance()->getUserName();

        $modelNews = new newsModel();
        $modelLikes = new likesModel();

        $res = [
            'success' => false,
            'display' => true
        ];

        if (empty($modelNews->get($news))) {
            $res['message'] = 'La publication n\'existe pas.';
        } elseif (empty($modelLikes->get($username, $news))) {
            $res['message'] = 'Vous n\'aimez pas cette publication.';
        } else {
            $modelLikes->delete($username, $news);
            $res['success'] = true;
            $res['display'] = false;
            $res['message'] = 'Vous n\'aimez plus la publication.';
            $res['count'] = $modelLikes->count($news)['count'];
        }

        echo json_encode($res);
    }
}
