CREATE TABLE users (
  `username`  VARCHAR(40) PRIMARY KEY NOT NULL,
  `mail`      VARCHAR(60) UNIQUE      NOT NULL,
  `password`  VARCHAR(40)             NOT NULL,
  `firstname` VARCHAR(40)             NOT NULL,
  `lastname`  VARCHAR(40)             NOT NULL
)
  ENGINE = InnoDB;

CREATE TABLE news (
  `id`       INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40)         NOT NULL,
  `date`     TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update`   TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message`  LONGTEXT            NOT NULL,
  CONSTRAINT `fk_news_users`
  FOREIGN KEY (username) REFERENCES users (username)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
)
  ENGINE = InnoDB;

CREATE TABLE comments (
  `id`       INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40)         NOT NULL,
  `news`     INT(11)             NOT NULL,
  `message` LONGTEXT NOT NULL,
  `date`     TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_comments_users`
  FOREIGN KEY (username) REFERENCES users (username)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_comments_news`
  FOREIGN KEY (news) REFERENCES news (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
)
  ENGINE = InnoDB;

CREATE TABLE likes (
  `username` VARCHAR(40) NOT NULL,
  `news`     INT(11)     NOT NULL,
  CONSTRAINT `fk_likes_users`
  FOREIGN KEY (username) REFERENCES users (username)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_likes_news`
  FOREIGN KEY (news) REFERENCES news (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
)
  ENGINE = InnoDB;

INSERT INTO users (`username`, `mail`, `password`, `firstname`, `lastname`)
VALUES ('loick111', 'loick111@gmail.com', '8d19451479272209fc7a670d85dd4590a6bb3329', 'Loïck', 'MAHIEUX');