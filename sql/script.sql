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

UPDATE usuario
SET exclusao = NOW()
WHERE id = id_do_usuario;

DELETE from usuario
WHERE id = id_do_usuario;

-- Stored Procedure para exclusão do usuário
DELIMITER //

CREATE PROCEDURE deletar_usuario_fisicamente(IN usuario_id INT)
BEGIN
    DELETE FROM usuario WHERE id = usuario_id;
END //

DELIMITER ;

-- Stored Procedure para promover o usuário a fazendeiro
DELIMITER //

CREATE PROCEDURE tornar_fazendeiro(IN usuario_id INT, IN resumo_fazendeiro VARCHAR(150), IN catalogo_fazendeiro MEDIUMTEXT)
BEGIN
    DECLARE usuario_existe INT;
    
    -- Verificar se o usuário existe
    SELECT COUNT(*) INTO usuario_existe
    FROM usuario
    WHERE id = usuario_id;

    IF usuario_existe > 0 THEN
        -- Inserir na tabela fazendeiro
        INSERT INTO fazendeiro (id, resumo, catalogo)
        VALUES (usuario_id, resumo_fazendeiro, catalogo_fazendeiro);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuário não encontrado';
    END IF;
END //

DELIMITER ;

-- Stored Procedures

-- Excluir fisicamente um usuário
 CALL deletar_usuario_fisicamente(id_do_usuario);

 -- Tornar um usuário fazendeiro
 CALL tornar_fazendeiro(id_do_usuario, 'Resumo do fazendeiro', 'Catálogo inicial');

