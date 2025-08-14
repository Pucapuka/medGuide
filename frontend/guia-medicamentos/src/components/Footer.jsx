import { Box, Container, Grid, Link, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Facebook, Instagram, LinkedIn, GitHub } from '@mui/icons-material';

export default function Footer() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={20}
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: isSmallScreen ? 'center' : 'flex-start',
            textAlign: isSmallScreen ? 'center' : 'left'
          }}
        >
          {/* Seção Contato */}
          <Grid 
            item 
            xs={12} 
            md={4}
            sx={{
              flex: 1,
              minWidth: 0 // Evita quebra de linha
            }}
          >
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography><strong>Email:</strong> solucoes.magic.ti@gmail.com</Typography>
            <Typography><strong>Telefone:</strong> (99) 98408-0173</Typography>
            <Typography><strong>Endereço:</strong> Av. Getúlio Vargas, Centro. Imperatriz-MA</Typography>
          </Grid>

          {/* Seção Redes Sociais */}
          <Grid 
            item 
            xs={12} 
            md={4}
            sx={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: isSmallScreen ? 'center' : 'flex-start'
            }}
          >
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
          <Grid 
            item 
            xs={12} 
            md={4}
            sx={{
              flex: 1,
              minWidth: 0
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sugestões
            </Typography>
            <Typography>
              Entre em contato conosco para sugestões, dúvidas ou feedback sobre o MedGuide.
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright - mantido abaixo */}
        <Box sx={{ pt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} MedGuide - Todos os direitos reservados
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}