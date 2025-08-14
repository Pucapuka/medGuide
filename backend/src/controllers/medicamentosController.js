const { Pool } = require('pg');

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: 'paulo',
  host: 'localhost',
  database: 'medguide_db',
  password: 'paulodb',
  port: 5432,
});

// GET / - Listar todos os medicamentos
exports.getAllMedications = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM medicamentos ORDER BY id');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar medicamentos', 
            error: error.message 
        });
    }
}

// GET /:id - Listar por id
exports.getMedicationById = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM medicamentos WHERE id = $1', [req.params.id]);
        
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Medicamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar medicamento', 
            error: error.message 
        });
    }
}

// POST / - Cadastrar novo medicamento
exports.createMedication = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO medicamentos (
                nome, principio_ativo, descricao, categoria, forma_farmaceutica, 
                dose, modo_de_uso, contraindicacoes, efeitos_adversos, 
                interacoes_medicamentosas, marcas_disponiveis
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [
                req.body.nome,
                req.body.principioAtivo,
                req.body.descricao,
                req.body.categoria,
                req.body.formaFarmaceutica,
                req.body.dose,
                req.body.modoDeUso,
                req.body.contraindicacoes,
                req.body.efeitosAdversos,
                req.body.interacoesMedicamentosas,
                req.body.marcasDisponiveis
            ]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao cadastrar medicamento', 
            error: error.message 
        });
    }
}

// PUT /:id - Atualizar um medicamento
exports.updateMedication = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `UPDATE medicamentos SET
                nome = $1,
                principio_ativo = $2,
                descricao = $3,
                categoria = $4,
                forma_farmaceutica = $5,
                dose = $6,
                modo_de_uso = $7,
                contraindicacoes = $8,
                efeitos_adversos = $9,
                interacoes_medicamentosas = $10,
                marcas_disponiveis = $11
             WHERE id = $12 RETURNING *`,
            [
                req.body.nome,
                req.body.principioAtivo,
                req.body.descricao,
                req.body.categoria,
                req.body.formaFarmaceutica,
                req.body.dose,
                req.body.modoDeUso,
                req.body.contraindicacoes,
                req.body.efeitosAdversos,
                req.body.interacoesMedicamentosas,
                req.body.marcasDisponiveis,
                req.params.id
            ]
        );

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Medicamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao atualizar medicamento', 
            error: error.message 
        });
    }
}

// DELETE /:id - Excluir um medicamento
exports.deleteMedication = async (req, res) => {
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM medicamentos WHERE id = $1', 
            [req.params.id]
        );

        if (rowCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Medicamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao excluir medicamento', 
            error: error.message 
        });
    }
}

// GET /search - Busca avançada
exports.searchMedications = async (req, res) => {
    const { termo, categoria } = req.query;
    
    try {
        let query = 'SELECT * FROM medicamentos';
        const values = [];
        let whereClauses = [];
        
        if (termo) {
            whereClauses.push(`
                (nome ILIKE $${values.length + 1} OR 
                principio_ativo ILIKE $${values.length + 1} OR
                descricao ILIKE $${values.length + 1})
            `);
            values.push(`%${termo}%`);
        }
        
        if (categoria) {
            whereClauses.push(`categoria = $${values.length + 1}`);
            values.push(categoria);
        }
        
        if (whereClauses.length > 0) {
            query += ' WHERE ' + whereClauses.join(' AND ');
        }
        
        query += ' ORDER BY nome';
        
        const { rows } = await pool.query(query, values);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao buscar medicamentos',
            error: error.message
        });
    }
};

// GET /categories - Listar todas as categorias
exports.getMedicationCategories = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT DISTINCT categoria FROM medicamentos ORDER BY categoria'
        );
        const categorias = rows.map(row => row.categoria);
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar categorias', 
            error: error.message 
        });
    }
}

// GET /categories/:categoria - Listar por categoria
exports.getMedicationsByCategory = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM medicamentos WHERE categoria ILIKE $1 ORDER BY nome',
            [req.params.categoria]
        );
        
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ 
                message: 'Nenhum medicamento encontrado nessa categoria' 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar medicamentos por categoria', 
            error: error.message 
        });
    }
}

// GET /interactions - Listar interações medicamentosas
exports.getMedicationInteractions = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT id, nome, interacoes_medicamentosas 
             FROM medicamentos 
             WHERE interacoes_medicamentosas IS NOT NULL 
             AND interacoes_medicamentosas != ''
             ORDER BY nome`
        );
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar interações medicamentosas', 
            error: error.message 
        });
    }
}