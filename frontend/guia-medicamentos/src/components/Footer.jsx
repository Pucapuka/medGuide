import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 'auto', // Para fixar no rodapé quando há pouco conteúdo
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} display="flex" justifyContent="space-between">
          {/* Seção Contato */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography>Email: solucoes.magic.ti@gmail.com</Typography>
            <Typography>Telefone: (99) 98408-0173</Typography>
            <Typography>Endereço: Av. Getúlio Vargas, Centro. Imperatriz-MA</Typography>
          </Grid>

          {/* Seção Redes Sociais */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Redes Sociais
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="https://www.facebook.com/paulo.goncalvesdelima" color="inherit">
                <Facebook />
              </Link>
              <Link href="https://github.com/Pucapuka" color="inherit">
                <GitHub />
              </Link>
              <Link href="https://www.instagram.com/paulo.lima1/" color="inherit">
                <Instagram />
              </Link>
              <Link href="https://br.linkedin.com/in/dev-pauloandersonlima" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>

          {/* Seção Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography>
              Assine para receber dicas de saúde
            </Typography>
            {/* Aqui você pode adicionar um formulário de newsletter */}
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} MedGuide - Todos os direitos reservados
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}