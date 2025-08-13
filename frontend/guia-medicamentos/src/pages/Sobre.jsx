import { Container, Typography, Avatar, Box } from '@mui/material';
import avatarImage from '../assets/card.jpg';

export default function Sobre() {
  return (
    <Container sx={{ padding: 1, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Sobre o Autor
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          alt="Autor" 
          src={avatarImage} 
          sx={{ width: 150, height: 150, marginBottom: 3 }}
        />
        
        <Typography variant="h5" gutterBottom>
          Paulo Anderson Gonçalves de Lima
        </Typography>
        <div style={{ maxWidth: 1500, textAlign: 'justify' }}>
          <Typography variant="body1" paragraph>
              Farmacêutico desde 2010, estudante de Ciência da Computação desde 2022. Está em transição de carreira para a área de tecnologia. Desenvolveu este projeto como parte do trabalho final do curso. O sistema objetiva promover saúde e bem-estar através da informação correta sobre o uso, armazenamento e descarte de medicamentos.
          </Typography>
        </div>
      </Box>
    </Container>
  );
}