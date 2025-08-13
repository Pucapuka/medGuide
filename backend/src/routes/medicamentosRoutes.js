const express = require('express');
const router = express.Router();
const { getAllMedications, getMedicationById,createMedication, updateMedication, deleteMedication, searchMedications } = require('../controllers/medicamentosController');

router.get('/', getAllMedications);
router.get('/search', searchMedications);
router.get('/:id', getMedicationById);

router.post('/', createMedication);
router.put('/:id', updateMedication);
router.delete('/:id', deleteMedication);

// Add to medicamentosRoutes.js
router.get('/debug-data', (req, res) => {
    try {
        const data = store.readAll();
        res.json({
            success: true,
            count: data.length,
            sample: data.slice(0, 3),
            hasTylenol: data.some(m => m.nome && m.nome.includes('Tylenol'))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;