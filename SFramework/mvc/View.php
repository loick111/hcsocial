<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 08/12/14
 * Time: 11:24
 */

namespace SFramework\mvc;

use SFramework\Helpers\Authentication;
use SFramework\Helpers\BaseViewContextProvider;
use SFramework\Helpers\ViewHelpers;
use Twig_Extension_Debug;

class View extends \Twig_Environment
{
    private $helpers;
    private $context = [];

    public function __construct(\Twig_LoaderInterface $loader = null, $options = [])
    {
        if (DEBUG) {
            $options = array_merge($options, ['debug' => true]);
        }

        parent::__construct($loader, $options);
        $this->addExtension(new Twig_Extension_Debug());

        $this->helpers = new ViewHelpers();

        $this->addToContext(BaseViewContextProvider::provide());
        $this->addToContext(['helpers' => $this->helpers]);
        $this->addToContext(Authentication::getInstance()->addToContext($this->context));
    }

    public function addToContext(array $context)
    {
        $this->context = array_merge($context, $this->context);
    }

    public function loadTemplate($name, $index = null)
    {
        $name = $name . '.twig';

        return parent::loadTemplate($name, $index);
    }

    public function render($name, array $context = [])
    {
        $this->addToContext($context);
        echo parent::render($name, $this->context);
    }

    public function redirect($to)
    {
        header('Location: ' . $to);
    }

    public function ajax()
    {
        header('Cache-Control : no-cache, must-revalidate');
        header('Expires: 26 Jul 1997 05:00:00 GMT');
        header('Content-type: application/json');
    }
}