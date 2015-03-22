<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 22/03/15
 * Time: 21:33
 */

namespace app\models;


use SFramework\Database\DatabaseProvider;
use SFramework\mvc\Model;

class commentsModel extends Model
{
    public function add($comments)
    {
        $sql = <<<SQL
INSERT INTO comments (username, news, message)
  VALUES (:username, :news, :message);
SQL;

        return DatabaseProvider::connection()->execute($sql, $comments);
    }

    public function update($comments)
    {
        $sql = <<<SQL
UPDATE FROM users
  SET message = :message,
  date = NOW()
  WHERE username = :username
  AND message = :message;
SQL;

        return DatabaseProvider::connection()->execute($sql, $comments);
    }

    public function get($username, $news)
    {
        $sql = <<<SQL
SELECT * FROM comments
  WHERE username = :username
  AND news = :news;
SQL;

        return DatabaseProvider::connection()->selectFirst($sql, ['username' => $username, 'news' => $news]);
    }

    public function getAll($news)
    {
        $sql = <<<SQL
SELECT * FROM comments
  WHERE news = :news;
SQL;

        return DatabaseProvider::connection()->query($sql, ['news' => $news]);
    }

    public function delete($username, $news)
    {
        $sql = <<<SQL
DELETE FROM comments
  WHERE username = :username
  AND news = :news;
SQL;

        return DatabaseProvider::connection()->execute($sql, ['username' => $username, 'news' => $news]);
    }
}