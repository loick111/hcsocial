<?php
/**
 * Created by PhpStorm.
 * User: sknz
 * Date: 1/23/15
 * Time: 8:05 PM
 */

namespace SFramework\Helpers;

class Authentication
{
    private static $instance;

    private function __construct()
    {

    }

    public static function getInstance()
    {
        if (!(self::$instance instanceof self)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function setAuthenticated($userName, array $options = [])
    {
        $_SESSION['username'] = $userName;
        $_SESSION['authdate'] = new \DateTime();
        $_SESSION['options'] = $options;
    }

    public function disconnect()
    {
        unset($_SESSION['username']);
        unset($_SESSION['authdate']);
        unset($_SESSION['options']);
        session_destroy();
    }

    public function addToContext(array $context = [])
    {
        $authData = [
            'valid' => $this->isAuthenticated(),
        ];

        if ($this->isAuthenticated()) {
            $authData = array_merge($authData,
                [
                    'username' => $this->getUserName(),
                    'authdate' => $this->getAuthDate(),
                    'options' => $this->getOptions()
                ]);
        }

        return array_merge($context, ['auth' => $authData]);
    }

    public function isAuthenticated()
    {
        return isset($_SESSION['username']) && !empty($_SESSION['username'])
        && isset($_SESSION['authdate']) && !empty($_SESSION['authdate']);
    }

    public function getUserName()
    {
        return $_SESSION['username'];
    }

    public function getAuthDate()
    {
        return $_SESSION['authdate'];
    }

    public function getOptions()
    {
        return $_SESSION['options'];
    }

    public function getOptionOr($key, $else)
    {
        return isset($_SESSION['options'][$key]) ? $_SESSION['options'][$key] : $else;
    }

    private function __clone()
    {

    }
}