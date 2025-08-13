import { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Container, 
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  Alert,
  Snackbar,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import api from '../services/api';

export default function BuscarMedicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tipoBusca, setTipoBusca] = useState('nome');

  // Carrega categorias ao iniciar
  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const response = await api.get('/categories');
        setCategorias(response.data);
      } catch (err) {
        handleError('Erro ao carregar categorias', err);
      }
    };
    carregarCategorias();
  }, []);

   // Busca medicamentos
  const buscarMedicamentos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      let params = {};

      // Define o parâmetro de busca conforme o tipo selecionado
      if (searchTerm) {
        if (tipoBusca === 'nome') {
          params = { nome: searchTerm };
          response = await api.get('/medicamentos/search', { params });
        } else if (tipoBusca === 'principioAtivo') {
          params = { principioAtivo: searchTerm };
          response = await api.get('/medicamentos/searchByActivePrinciple', { params });
        }
      } else if (categoriaSelecionada) {
        response = await api.get(`/categories/${categoriaSelecionada}`);
      } else {
        // Busca todos se não houver critério
        response = await api.get('/medicamentos');
      }

      // Trata a resposta
      if (response.status === 404) {
        setMedicamentos([]);
      } else if (Array.isArray(response.data)) {
        setMedicamentos(response.data);
      } else if (response.data) {
        setMedicamentos([response.data]);
      } else {
        setMedicamentos([]);
      }
    } catch (err) {
      handleError('Erro ao buscar medicamentos', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoriaSelecionada, tipoBusca]);

  // Busca automática com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm || categoriaSelecionada) {
        buscarMedicamentos();
      } else {
        // Se não há termo nem categoria, carrega todos
        buscarMedicamentos();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, categoriaSelecionada, buscarMedicamentos]);

  const handleError = (message, error) => {
    console.error(message, error);
    setError(error.response?.data?.message || message);
    setSnackbarOpen(true);
    setMedicamentos([]);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCategoriaSelecionada('');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderDetalhesMedicamento = (medicamento) => (
    <Box sx={{ width: '100%' }}>
      {medicamento.principioAtivo && (
        <>
          <Typography variant="subtitle1" fontWeight="bold">Princípio Ativo</Typography>
          <Typography paragraph>{medicamento.principioAtivo}</Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      
      {medicamento.descricao && (
        <>
          <Typography variant="subtitle1" fontWeight="bold">Descrição</Typography>
          <Typography paragraph>{medicamento.descricao}</Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      
      {medicamento.formaFarmaceutica && (
        <>
          <Typography variant="subtitle1" fontWeight="bold">Forma Farmacêutica</Typography>
          <Typography paragraph>{medicamento.formaFarmaceutica}</Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      
      {medicamento.interacoesMedicamentosas && (
        <>
          <Typography variant="subtitle1" fontWeight="bold">Interações Medicamentosas</Typography>
          <Typography paragraph>{medicamento.interacoesMedicamentosas}</Typography>
        </>
      )}
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Busca de Medicamentos
      </Typography>

      {/* Barra de busca */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite o nome do medicamento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            endAdornment: searchTerm && (
              <IconButton onClick={handleClearSearch} size="small">
                <ClearIcon fontSize="small" />
              </IconButton>
            )
          }}
        />
        <Button 
          variant="contained" 
          onClick={buscarMedicamentos}
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Buscar'}
        </Button>
      </Box>

      {/* Filtros por categoria */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Filtrar por categoria:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="Todos"
            onClick={() => setCategoriaSelecionada('')}
            color={!categoriaSelecionada ? 'primary' : 'default'}
            variant={!categoriaSelecionada ? 'filled' : 'outlined'}
          />
          {categorias.map((categoria) => (
            <Chip
              key={categoria}
              label={categoria}
              onClick={() => {
                setCategoriaSelecionada(categoria);
                setSearchTerm('');
              }}
              color={categoriaSelecionada === categoria ? 'primary' : 'default'}
              variant={categoriaSelecionada === categoria ? 'filled' : 'outlined'}
            />
          ))}
        </Box>
      </Box>

      {/* Resultados */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : medicamentos.length > 0 ? (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {medicamentos.length} resultado{medicamentos.length !== 1 ? 's' : ''} encontrado{medicamentos.length !== 1 ? 's' : ''}
          </Typography>

          {medicamentos.map((medicamento) => (
            <Accordion key={medicamento.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ flex: 1 }}>{medicamento.nome}</Typography>
                {medicamento.categoria && (
                  <Chip label={medicamento.categoria} size="small" sx={{ ml: 1 }} />
                )}
              </AccordionSummary>
              <AccordionDetails>
                {renderDetalhesMedicamento(medicamento)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          Nenhum medicamento encontrado
          {searchTerm && ` para "${searchTerm}"`}
          {categoriaSelecionada && ` na categoria "${categoriaSelecionada}"`}
        </Alert>
      )}

      {/* Snackbar para erros
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar> */}
    </Container>
  );
}