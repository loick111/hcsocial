<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 15/03/15
 * Time: 21:46
 */

namespace app\models;


use SFramework\Database\DatabaseProvider;
use SFramework\mvc\Model;

class usersModel extends Model
{
    const SALT = 'kGz_8WSc6QG#2yLC@*S_b(%Q-zyVFsLKH%Dt%eys';

    public function add($user)
    {
        $sql = <<<SQL
INSERT INTO users (username, mail, password, firstname, lastname)
  VALUES (:username, :mail, SHA1(CONCAT(:password, :salt)), :firstname, :lastname);
SQL;

        $user['salt'] = self::SALT;
        return DatabaseProvider::connection()->execute($sql, $user);
    }

    public function update($user)
    {
        $sql = <<<SQL
UPDATE users (password, firstname, lastname)
  SET password = (SHA1(CONCAT(:password, :salt))),
      firstname = :firstname,
      lastname = :lastname
  WHERE username = :username;
SQL;

        $user['salt'] = self::SALT;
        return DatabaseProvider::connection()->execute($sql, $user);
    }

    public function delete($user)
    {
        $sql = <<<SQL
DELETE FROM users
  WHERE username = user.username;
SQL;
        return DatabaseProvider::connection()->execute($sql, $user);
    }

    public function get($id)
    {
        $sql = <<<SQL
SELECT * FROM users
  WHERE id = :id;
SQL;
        return DatabaseProvider::connection()->selectFirst($sql, ['id' => $id]);
    }

    public function getByUsername($username)
    {
        $sql = <<<SQL
SELECT * FROM users
  WHERE username = :username;
SQL;
        return DatabaseProvider::connection()->selectFirst($sql, ['username' => $username]);
    }

    public function getByMail($mail)
    {
        $sql = <<<SQL
SELECT * FROM users
  WHERE mail = :mail;
SQL;
        return DatabaseProvider::connection()->selectFirst($sql, ['mail' => $mail]);
    }

    public function check($username, $password)
    {
        $sql = <<<SQL
SELECT * FROM users
  WHERE username = :username
  AND password = SHA1(CONCAT(:password, :salt));
SQL;
        return DatabaseProvider::connection()->selectFirst($sql, [
            'username' => $username,
            'password' => $password,
            'salt' => self::SALT
        ]);
    }
}