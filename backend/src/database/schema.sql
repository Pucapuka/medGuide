CREATE TABLE medicamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    principio_ativo VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50),
    forma_farmaceutica VARCHAR(50),
    dose VARCHAR(20),
    modo_de_uso TEXT,
    contraindicacoes TEXT,
    efeitos_adversos TEXT,
    interacoes_medicamentosas TEXT,
    marcas_disponiveis JSONB
);