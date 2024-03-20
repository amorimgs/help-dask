CREATE DATABASE helpDask;
USE helpDask;

SET
  NAMES utf8mb4;
DROP TABLE IF EXISTS chamados;
DROP TABLE IF EXISTS tecnicos;

CREATE TABLE tecnicos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  ativo BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE chamados (
  id INT PRIMARY KEY AUTO_INCREMENT,
  solicitante VARCHAR(255) NOT NULL,
  setor VARCHAR(100) NOT NULL,
  motivo VARCHAR(255) NOT NULL,
  urgencia INT NOT NULL,
  data_abertura DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_fechamento DATETIME,
  observacoes VARCHAR(500),
  observacoes_tecnico VARCHAR(500),
  concluido BOOLEAN NOT NULL DEFAULT false,
  tecnico_id INT,
  FOREIGN KEY (tecnico_id) REFERENCES tecnicos (id)
);

SELECT * FROM chamados