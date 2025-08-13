const store = require('../utils/medicamentosStore');

//GET / - Listar todos
exports.getAllMedications = (req, res) => {
    try {
        const medicamentos = store.readAll();
        res.status(200).json(medicamentos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamentos', error: error.message });
    }
}

//Get /:id - Listar por id
exports.getMedicationById = (req, res) => {
    try {
        const medicamentos = store.readAll();
        const id = parseInt(req.params.id);
        const medicamento = medicamentos.find(med => med.id === id);
        if (medicamento) {
            res.status(200).json(medicamento);
        } else {
            res.status(404).json({ message: 'Medicamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamento', error: error.message });
    }
}

//POST / - Cadastrar novo medicamento
exports.createMedication = (req, res) => {
    try {
        const medicamentos = store.readAll();
        const newId = medicamentos.length ? medicamentos[medicamentos.length - 1].id + 1 : 1;
        const newMedication = { id: newId, ...req.body };
        medicamentos.push(newMedication);
        store.writeAll(medicamentos);
        res.status(201).json(newMedication);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar medicamento', error: error.message });
    }
}

//PUT /:id - Atualizar um medicamento já cadastrado
exports.updateMedication = (req, res) => {
    try {
        const medicamentos = store.readAll();
        const id = parseInt(req.params.id);
        const index = medicamentos.findIndex(med => med.id === id);
        if (index !== -1) {
            medicamentos[index] = { id, ...req.body };
            store.writeAll(medicamentos);
            res.status(200).json(medicamentos[index]);
        } else {
            res.status(404).json({ message: 'Medicamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar medicamento', error: error.message });
    }
}

//DELETE /:id - Excluir um medicamento
exports.deleteMedication = (req, res) => {
    try {
        const medicamentos = store.readAll();
        const id = parseInt(req.params.id);
        const index = medicamentos.findIndex(med => med.id === id);
        if (index !== -1) {
            medicamentos.splice(index, 1);
            store.writeAll(medicamentos);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Medicamento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir medicamento', error: error.message });
    }   
}


exports.searchMedications = (req, res) => {
    const { nome } = req.query;
    
    // Helper function to normalize strings for comparison
    const normalizeString = (str) => {
        return str.toString()
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .trim();
    };

    try {
        const medicamentos = store.readAll();
        
        if (!nome || nome.trim() === '') {
            this.getAllMedications;
            return res.status(200); // Retorna todos se não houver termo de busca
        }
        
        const termoBusca = normalizeString(nome);
        const resultados = medicamentos.filter(med => {
            return med.nome && normalizeString(med.nome).includes(termoBusca);
        });
        
        if (resultados.length === 0) {
            return res.status(404).json({ 
                message: 'Nenhum medicamento encontrado',
                searchTerm: nome,
                suggestion: 'Verifique a ortografia ou tente um termo mais geral'
            });
        }
        
        return res.status(200).json(resultados);
    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({
            message: 'Erro ao buscar medicamentos',
            error: error.message,
            details: 'Verifique os logs do servidor para mais informações'
        });
    }
};

//GET /categories - Listar todas as categorias de medicamentos
exports.getMedicationCategories = (req, res) => {
    try {
        const medicamentos = store.readAll();
        const categorias = [...new Set(medicamentos.map(med => med.categoria))];
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar categorias', error: error.message });
    }
}

//GET /categories/:categoria - Listar medicamentos por categoria
exports.getMedicationsByCategory = (req, res) => {
    const categoria = req.params.categoria;
    try {
        const medicamentos = store.readAll();
        const medicamentosPorCategoria = medicamentos.filter(med =>
            med.categoria.toLowerCase() === categoria.toLowerCase()
        );
        if (medicamentosPorCategoria.length > 0) {
            res.status(200).json(medicamentosPorCategoria);
        } else {
            res.status(404).json({ message: 'Nenhum medicamento encontrado nessa categoria' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar medicamentos por categoria', error: error.message });
    }
}

//GET /interactions - Listar interações medicamentosas
exports.getMedicationInteractions = (req, res) => {
    try {
        const medicamentos = store.readAll();
        const medicationsWithInteractions = medicamentos.filter(med => med.interacoesMedicamentosas);
        res.status(200).json(medicationsWithInteractions);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar interações medicamentosas', error: error.message });
    }
}