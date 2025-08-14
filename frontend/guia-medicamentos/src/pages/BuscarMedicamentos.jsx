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
  Alert
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

  // Carrega categorias ao iniciar
  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const response = await api.get('/categories');
        setCategorias(response.data);
      } catch (err) {
        console.error('Erro ao carregar categorias', err);
      }
    };
    carregarCategorias();
  }, []);

  // Busca medicamentos
  const buscarMedicamentos = useCallback(async () => {
    try {
      setLoading(true);
      
      let response;
      const params = {};

      if (searchTerm) {
        params.termo = searchTerm;
      }

      if (categoriaSelecionada) {
        params.categoria = categoriaSelecionada;
      }

      response = await api.get('/medicamentos/search', { params });

      setMedicamentos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Erro ao buscar medicamentos', err);
      setMedicamentos([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoriaSelecionada]);

  // Busca automática com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      buscarMedicamentos();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, categoriaSelecionada, buscarMedicamentos]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setCategoriaSelecionada('');
  };

  const renderDetalhesMedicamento = (medicamento) => (
    <Box sx={{ width: '100%' }}>
      {medicamento.principio_ativo && (
        <>
          <Typography variant="subtitle1" fontWeight="bold">Princípio Ativo</Typography>
          <Typography paragraph>{medicamento.principio_ativo}</Typography>
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
      
      {medicamento.forma_farmaceutica && (
        <>
          <Typography variant="subtitle1" fontWeight="bold">Forma Farmacêutica</Typography>
          <Typography paragraph>{medicamento.forma_farmaceutica}</Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      
      {medicamento.interacoes_medicamentosas && (
        <>
          <Typography variant="subtitle1" fontWeight="bold">Interações Medicamentosas</Typography>
          <Typography paragraph>{medicamento.interacoes_medicamentosas}</Typography>
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
          placeholder="Digite o nome ou princípio ativo"
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
    </Container>
  );
}