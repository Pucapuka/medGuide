INSERT INTO medicamentos (
    nome, principio_ativo, descricao, categoria, forma_farmaceutica, dose, 
    modo_de_uso, contraindicacoes, efeitos_adversos, interacoes_medicamentosas, marcas_disponiveis
) VALUES 
(
    'Tylenol', 
    'Paracetamol', 
    'Analgésico e antipirético utilizado para aliviar dores leves a moderadas e reduzir febre.',
    'Analgésicos',
    'Comprimidos',
    '500mg',
    'Tomar 1 comprimido a cada 6 horas, não excedendo 4 comprimidos por dia.',
    'Hipersensibilidade ao paracetamol, doença hepática grave.',
    'Náuseas, vômitos, reações alérgicas.',
    'Pode interagir com anticoagulantes orais e outros medicamentos que afetam o fígado.',
    '["Tylenol","Tyflen", "Tylemax", "Paramol"]'
),
(
    'Alivium', 
    'Ibuprofeno', 
    'Anti-inflamatório não esteroidal (AINE) utilizado para aliviar dores, reduzir inflamações e febre.',
    'Anti-inflamatórios',
    'Comprimidos',
    '400mg',
    'Tomar 1 comprimido a cada 8 horas, não excedendo 3 comprimidos por dia.',
    'Hipersensibilidade ao ibuprofeno, úlcera gástrica ativa, insuficiência renal grave.',
    'Dor abdominal, náuseas, tontura.',
    'Pode interagir com anticoagulantes, outros AINEs e corticosteroides.',
    '["Alivium", "Ibuflex", "Ibupril", "Pralivio", "Buscofem"]'
);