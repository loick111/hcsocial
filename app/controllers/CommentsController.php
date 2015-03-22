<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 15/03/15
 * Time: 18:41
 */

namespace app\controllers;


use app\models\newsModel;
use SFramework\mvc\Controller;

class CommentsController extends Controller
{
    public function add()
    {
    }

    public function addPOST()
    {
        $news = $this->getParams()[0];
        $model = new newsModel();


    }
}
