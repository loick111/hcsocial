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
        $update = <<<SQL
UPDATE news SET update = NOW()
  WHERE id = :news;
SQL;
        DatabaseProvider::connection()->execute($update, ['news' => $comments['news']]);
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

    public function get($id)
    {
        $sql = <<<SQL
SELECT * FROM comments
  WHERE id = :id;
SQL;

        return DatabaseProvider::connection()->selectFirst($sql, ['id' => $id]);
    }

    public function getAll($news)
    {
        $sql = <<<SQL
SELECT * FROM comments
  JOIN users ON users.username = comments.username
  WHERE news = :news;
SQL;

        return DatabaseProvider::connection()->query($sql, ['news' => $news]);
    }

    public function delete($id)
    {
        $sql = <<<SQL
DELETE FROM comments
  WHERE id = :id;
SQL;

        return DatabaseProvider::connection()->execute($sql, ['id' => $id]);
    }
}