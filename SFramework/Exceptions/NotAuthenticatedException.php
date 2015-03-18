<?php
/**
 * Created by PhpStorm.
 * User: thomasmunoz
 * Date: 27/12/14
 * Time: 23:19
 */

namespace SFramework\Exceptions;


use Exception;

class NotAuthenticatedException extends SException
{
    public function __construct($code = 0, Exception $previous = null)
    {
        $message = 'You are not authenticated !';
        parent::__construct($message, $code, $previous);
    }
}