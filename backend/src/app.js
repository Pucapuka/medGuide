const express = require('express');
const cors = require('cors');
const routes = require('./routes/medicamentosRoutes');

const app = express();

app.use(cors({
    origin: '*', // Permite requisições de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
})); 
app.use(express.json());
app.use('/medicamentos', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 