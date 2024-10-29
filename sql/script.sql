-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS farmerlink;
CREATE DATABASE IF NOT EXISTS farmerlink DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE farmerlink;

CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  telefone varchar(15) NOT NULL,
  cpf varchar(14) NOT NULL,
  nascimento datetime NOT NULL,
  cep varchar(9) NOT NULL,
  exclusao datetime NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_UN (email),
  KEY exclusao_IX (exclusao)
);

CREATE TABLE fazendeiro (
  id int NOT NULL,
  resumo varchar(150) NOT NULL,
  catalogo mediumtext NOT NULL,
  exclusao datetime NULL,
  PRIMARY KEY (id),
  KEY exclusao_IX (exclusao),
  CONSTRAINT id_FK FOREIGN KEY (id) REFERENCES usuario (id) ON DELETE CASCADE ON UPDATE CASCADE
);
