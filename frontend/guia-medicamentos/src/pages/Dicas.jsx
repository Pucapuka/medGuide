import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Dicas() {
  const dicas = [
    {
      titulo: 'Armazenamento Correto',
      conteudo: `Mantenha os medicamentos em locais secos e arejados, longe de umidade e calor excessivo.
                Evite deixá-los em banheiros ou cozinhas, onde a temperatura pode variar muito.
                Verifique na embalagem do medicamento a temperatura ideal de armazenamento (alguns são refrigerados, entre 2 e 8º C).`
    },
    {
      titulo: 'Prazo de Validade',
      conteudo: 'Nunca use medicamentos vencidos. Verifique sempre a data antes de consumir.'
    },
    {
      titulo: 'Descarte Seguro',
      conteudo: 'Leve medicamentos vencidos ou não utilizados a postos de coleta em farmácias ou Unidades Básicas de Saúde.'
    }
  ];

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden'
    }}>
      <Container maxWidth="lg" sx={{ 
        width: '100%',
        py: 5,
        px: { xs: 2, md: 4 } // Padding responsivo
      }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Dicas e Sugestões
        </Typography>
        
        <Box sx={{ 
          width: '100%',
          '& .MuiAccordion-root': {
            mb: 2,
            boxShadow: 3,
            borderRadius: '8px !important',
            '&:before': {
              display: 'none' // Remove a linha padrão
            }
          }
        }}>
          {dicas.map((dica, index) => (
            <Accordion key={index}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px 8px 0 0',
                  '&.Mui-expanded': {
                    minHeight: '48px',
                    margin: 0
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {dica.titulo}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ 
                backgroundColor: '#fff',
                borderRadius: '0 0 8px 8px',
                padding: 3
              }}>
                <Typography>{dica.conteudo}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}