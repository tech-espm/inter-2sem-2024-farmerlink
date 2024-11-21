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



-- promover o usuário a fazendeiro
DELIMITER //

CREATE PROCEDURE tornar_fazendeiro(IN usuario_id INT, IN resumo_fazendeiro VARCHAR(150), IN catalogo_fazendeiro MEDIUMTEXT)
BEGIN
    DECLARE usuario_existe INT;
    
    SELECT COUNT(*) INTO usuario_existe
    FROM usuario
    WHERE id = usuario_id;

    IF usuario_existe > 0 THEN
        INSERT INTO fazendeiro (id, resumo, catalogo)
        VALUES (usuario_id, resumo_fazendeiro, catalogo_fazendeiro);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuário não encontrado';
    END IF;
END //

DELIMITER ;

 -- Stored procedure; tornar um usuário fazendeiro
 CALL tornar_fazendeiro(id_do_usuario, 'Resumo do fazendeiro', 'Catálogo inicial');




 -- burrice
 SELECT u.id, u.nome, u.email, u.telefone, u.cpf, u.nascimento, u.cep, f.resumo, f.catalogo
FROM usuario u
INNER JOIN fazendeiro f ON u.id = f.id;


-- burrice pt2
DELIMITER //

CREATE PROCEDURE tornar_fazendeiro(
    IN usuario_id INT,
    IN resumo_fazendeiro VARCHAR(150),
    IN catalogo_fazendeiro MEDIUMTEXT
)
BEGIN
    DECLARE usuario_existe INT;

    -- Pra verificar se o usuário existe e ainda não é fazendeiro
    SELECT COUNT(*) INTO usuario_existe
    FROM usuario u
    LEFT JOIN fazendeiro f ON u.id = f.id
    WHERE u.id = usuario_id AND f.id IS NULL;

    IF usuario_existe > 0 AND CHAR_LENGTH(resumo_fazendeiro) > 0 THEN -- CHAR_LENGTH -> para verificar o comprimento de uma string em termos de quantidade de caracteres
        INSERT INTO fazendeiro (id, resumo, catalogo)
        VALUES (usuario_id, resumo_fazendeiro, catalogo_fazendeiro);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuário não encontrado, já é fazendeiro, ou resumo inválido';
    END IF;
END //

DELIMITER ;


--<% for (let i = 0; i < fazendeiros.length; i = i + 1) { %>
--<div>
--	<h1><%= fazendeiros[i].nome %></h1>
--	<p><%= fazendeiros[i].resumo %></p>
--</div>
--<% } %>

--tenho que ver com o rafa

INSERT INTO fazendeiro (id, resumo, catalogo)
SELECT u.id, 'Resumo do fazendeiro', 'Catálogo inicial'
FROM usuario u
LEFT JOIN fazendeiro f ON u.id = f.id
WHERE u.id = 1 AND f.id IS NULL;


DELIMITER //

CREATE TRIGGER promover_para_fazendeiro
AFTER INSERT ON usuario
FOR EACH ROW
BEGIN
    IF NEW.email LIKE '%fazendeiro%' THEN
        INSERT INTO fazendeiro (id, resumo, catalogo)
        VALUES (NEW.id, 'Resumo automático', 'Catálogo gerado automaticamente');
    END IF;
END //

DELIMITER ;


CREATE VIEW fazendeiro_view AS
SELECT u.id, u.nome, u.email, f.resumo, f.catalogo
FROM usuario u
LEFT JOIN fazendeiro f ON u.id = f.id
WHERE f.id IS NOT NULL;

WITH usuario_para_promover AS (
    SELECT u.id
    FROM usuario u
    LEFT JOIN fazendeiro f ON u.id = f.id
    WHERE u.id = 1 AND f.id IS NULL
)