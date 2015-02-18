<?php

namespace app\controllers;


use SFramework\mvc\Controller;

class ErrorsController extends Controller
{

    public function err404()
    {
        $this->getView()->render('errors/err404');
    }
}