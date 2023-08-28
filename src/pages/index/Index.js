import * as React from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import AOS from 'aos';
import ResponsiveCards from '../../components/ResponsiveCards';
import Whatsapp from '../../components/WhatsAppButton';
import imageAdv from '../../images/adv.jpg';
import { tiers, footers } from '../../components/Constants';
import Copyright from '../theme/Copyright';
import Navbar from '../theme/Navbar'
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const tamanhoTelaAcesso = window.screen.width;

function TelaInicial() {

  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);

  return (

    <React.Fragment>

      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      {/* Botão flutuante do Whatsapp */}
      <Whatsapp />

      {/* Menu do sistema */}
      <div id='id0'>
        <Navbar />
      </div>

      {/* Início do site */}
      <Grid
        container
        style={{
          backgroundColor: '#111736',
          color: '#BC953D',
          height: tamanhoTelaAcesso >= 600 ? '93vh' : '85vh'
        }}
        data-aos='zoom-in'
        component="main"
        justifyContent="center">
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: tamanhoTelaAcesso >= 600 ? '75%' : '200%',
            backgroundPosition: 'center',
            backgroundColor: '#111736'
          }}
          className={tamanhoTelaAcesso >= '600' ? 'BackgroundImageIndex' : 'BackgroundImageUsers'}
        />

        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ padding: '0 10px' }}
        >
          <Typography variant="h5" color="#FFFFFF" component="p" style={{ textAlign: tamanhoTelaAcesso >= 600 ? false : 'center' }}>
            {'Profissionalismo liberal, graduado em direito e autorizado pelas instituições competentes de cada país a exercer o jus postulandi, ou'}
            {' seja, a representação dos legítimos interesses das pessoas físicas ou jurídicas em juízo ou fora dele, quer entre si, quer ante o Estado.'}
          </Typography>

        </Grid>
      </Grid>

      {/* Slides */}
      {/* <div data-aos="fade-up">
        <ResponsiveCarousel />
      </div> */}

      {/* Cards */}
      <div id='id1'>
        <div data-aos="fade-up" >
          <div>
            <ResponsiveCards
              props={tiers}
            />
          </div>
        </div>
      </div>

      {/* Quem sou eu */}
      <div id='id2'>
        <Grid
          container
          style={{
            marginTop: '30px',
            backgroundColor: '#111736',
            color: '#BC953D',
            height: tamanhoTelaAcesso >= 600 ? '65vh' : '105vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          data-aos='fade-up'
          component="main"
        >
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            style={{
              padding: '0 20px',
            }}
          >
            <Typography
              variant="h5"
              color="#FFFFFF"
              component="p"
              style={{
              }}
            >
              {'Meu nome é Kleber Alves Bezerra, e sou apaixonado pelo direito e por fazer a diferença na vida das pessoas.'}
              {'Minha trajetória é marcada por uma determinação inabalável e uma busca incansável pelos meus sonhos.'}
            </Typography>

            <Typography
              variant="h5"
              color="#FFFFFF"
              component="p"
              style={{
                marginTop: '10px'
              }}
            >
              {'Sou formado pela Universidade Católica de Brasília - UCB e atuo como advogado por volta de 5 anos.'}
              {'Tenho experiência em diversas áreas do direito, incluindo Civil, Trabalhista, Comercial, Tributário, Família e Administrativo.'}
            </Typography>
          </Grid>

          <Grid
            sm={2}
            md={2}
          />

          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '25px',
              overflow: 'hidden',
              justifyContent: 'center',
            }}
          >
            <img
              src={imageAdv}
              alt="Imagem arredondada"
              style={{
                width: '70%',
                // height: '70%',
                objectFit: 'cover',
                borderRadius: '25px',
                border: '5px solid #BC953D'
              }}
            />
          </Grid>
        </Grid>
      </div>

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
          position: 'relative',
          mb: tamanhoTelaAcesso >= 600 ? '' : '50px',
        }}
      >

        <IconButton
          className="floating-button"
          sx={{
            position: 'absolute',
            bottom: tamanhoTelaAcesso >= 600 ? '30px' : '70px',
            right: '30px',
            zIndex: '999',
            backgroundColor: '#111736',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#252e5c',
            },
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => smoothScrollTo('id0')}
        >
          <ArrowUpwardIcon />
        </IconButton>

        <Grid
          container
          data-aos="fade-down"
          spacing={4}
          justifyContent="space-evenly"
        >
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>

    </React.Fragment >
  );
}

export default function Index() {
  return <TelaInicial />;
}