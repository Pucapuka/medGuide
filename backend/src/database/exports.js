exports.searchMedications = (req, res) => {
    const { nome } = req.query;
    try {
        const medicamentos = store.readAll();
        if (!nome || nome.trim() === '') {
            return res.status(200).json(medicamentos);
        }
        const termoBusca = nome.toLowerCase().trim();
        const resultados = medicamentos.filter(med =>
            med.nome && med.nome.toLowerCase().includes(termoBusca)
        );
        return res.status(200).json(resultados); // Sempre retorna array
    } catch (error) {
        return res.status(500).json({
            message: 'Erro ao buscar medicamentos',
            error: error.message
        });
    }
};