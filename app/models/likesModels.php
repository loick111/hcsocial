<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 18/03/15
 * Time: 16:46
 */

namespace app\models;


use SFramework\Database\DatabaseProvider;
use SFramework\mvc\Model;

class likesModels extends Model
{
    public function get($username, $news)
    {
        $sql = <<<SQL
SELECT * FROM likes
  WHERE username = :username
  AND news = :news;
SQL;

        return DatabaseProvider::connection()->selectFirst($sql, ['username' => $username, 'news' => $news]);
    }

    public function count($news)
    {
        $sql = <<<SQL
SELECT COUNT(username) AS count FROM likes
  WHERE news = :news;
SQL;

        return DatabaseProvider::connection()->selectFirst($sql, ['news' => $news]);
    }

    public function add($username, $news)
    {
        $sql = <<<SQL
INSERT INTO likes (username, news)
  VALUES (:username, :news);
SQL;
        $update = <<<SQL
UPDATE news SET update = NOW()
  WHERE id = :news;
SQL;
        DatabaseProvider::connection()->execute($update, ['news' => $news]);
        return DatabaseProvider::connection()->execute($sql, ['username' => $username, 'news' => $news]);
    }

    public function delete($username, $news)
    {
        $sql = <<<SQL
DELETE FROM likes
  WHERE username = :username
  AND news = :news;
SQL;
        $update = <<<SQL
UPDATE news SET update = NOW()
  WHERE id = :news;
SQL;
        DatabaseProvider::connection()->execute($update, ['news' => $news]);
        return DatabaseProvider::connection()->execute($sql, ['username' => $username, 'news' => $news]);
    }
}