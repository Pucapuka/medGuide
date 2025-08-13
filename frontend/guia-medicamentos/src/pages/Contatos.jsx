import { Container, Typography, Box, Link, List, ListItem, ListItemIcon } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

export default function Contatos() {
  return (
    <Container sx={{ 
        width: '100%',
        py: 7, // Padding responsivo
        px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Contatos e Pontos de Coleta
      </Typography>
      
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Typography variant="h6" gutterBottom>
            Entre em Contato
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><Email /></ListItemIcon>
              <Link href="mailto:contato@medguide.com">contato@medguide.com</Link>
            </ListItem>
            <ListItem>
              <ListItemIcon><Phone /></ListItemIcon>
              <Typography>(XX) XXXX-XXXX</Typography>
            </ListItem>
          </List>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 4}}>
          <Typography variant="h6" sx={{ marginTop: 4 }} gutterBottom>
            Pontos de Coleta Próximos
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><LocationOn /></ListItemIcon>
              <Typography>Farmácia Central - Rua Principal, 123</Typography>
            </ListItem>
            <ListItem>
              <ListItemIcon><LocationOn /></ListItemIcon>
              <Typography>Posto de Saúde - Avenida Secundária, 456</Typography>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Container>
  );
}