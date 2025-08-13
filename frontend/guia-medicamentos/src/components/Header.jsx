import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar 
      position="static"
      sx={{
        width: '100vw',
        boxShadow: 'none',
        color: 'white', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // Adiciona uma borda inferior
        backgroundColor: '#4CAF50',
        margin: 0,
        padding: 0,
        left: 0,
        right: 0
      }}
    >
      <Toolbar sx={{ 
        maxWidth: 'lg', 
        margin: '0 auto', 
        width: '100%',
        padding: '0 16px' // Adiciona padding lateral em telas pequenas
      }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MedGuide
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/buscar">Buscar Medicamentos</Button>
        <Button color="inherit" component={Link} to="/dicas">Dicas</Button>
        <Button color="inherit" component={Link} to="/sobre">Sobre</Button>
      </Toolbar>
    </AppBar>
  );
}