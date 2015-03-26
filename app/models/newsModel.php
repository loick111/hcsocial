<?php
/**
 * Created by PhpStorm.
 * User: loick
 * Date: 16/03/15
 * Time: 19:31
 */

namespace app\models;


use SFramework\Database\DatabaseProvider;
use SFramework\mvc\Model;

class newsModel extends Model
{
    public function getAll()
    {
        $sql = <<<SQL
SELECT * FROM news
  JOIN users ON news.username = users.username
  ORDER BY `update` ASC;
SQL;

        return DatabaseProvider::connection()->query($sql);
    }

    public function get($id)
    {
        $sql = <<<SQL
SELECT * FROM news
  WHERE id = :id
  ORDER BY date ASC;
SQL;

        return DatabaseProvider::connection()->selectFirst($sql, ['id' => $id]);
    }

    public function add($news)
    {
        $sql = <<<SQL
INSERT INTO news (username, date, `update`, message)
  VALUES (:user, NOW(), NOW(), :message);
SQL;
        DatabaseProvider::connection()->execute($sql, $news);

        return DatabaseProvider::connection()->lastInsertId();
    }

    public function delete($id)
    {
        $sql = <<<SQL
DELETE FROM news
  WHERE id = :id;
SQL;

        return DatabaseProvider::connection()->execute($sql, ['id' => $id]);
    }
}