import { Grid, Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      title: 'Buscar Medicamentos',
      description: 'Encontre informações sobre uso, armazenamento e descarte',
      path: '/buscar',
      color: '#0CAF50'
    },
    {
      title: 'Dicas Importantes',
      description: 'Dicas e orientações sobre cuidados com medicamentos',
      path: '/dicas',
      color: '#1936FF'
    },
    {
      title: 'Sobre o Autor',
      description: 'Conheça o desenvolvedor deste projeto',
      path: '/sobre',
      color: '#9C27B0'
    }
  ];

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ padding: 4 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: feature.color }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2" color="white">
                {feature.title}
              </Typography>
              <Typography color="white">
                {feature.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                component={Link} 
                to={feature.path}
                sx={{ color: 'white' }}
              >
                Acessar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}